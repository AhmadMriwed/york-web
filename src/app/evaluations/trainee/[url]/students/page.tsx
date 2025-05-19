"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  Table,
  Tag,
  Space,
  Card,
  Typography,
  Spin,
  Divider,
  Tooltip,
} from "antd";
import type { TableProps } from "antd";
import { Evaluation } from "@/types/adminTypes/assignments/assignExamTypes";
import { toast } from "sonner";
import {
  getEvaluationByUrl,
  getTraineeId,
  getTrainees,
  startTraineeEvaluation,
} from "@/lib/action/evaluation_action";
import { useParams, useRouter } from "next/navigation";
import {
  LoadingOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { Eye } from "lucide-react";
import { StudentDataType } from "@/types/adminTypes/evaluation/evaluationTypes";

const { Title, Text } = Typography;

const statusColor = (status?: string) => {
  switch (status?.toLowerCase()) {
    case "completed":
      return "geekblue";
    case "in progress":
      return "orange";
    case "poor":
      return "red";
    case "not started":
      return "default";
    default:
      return "blue";
  }
};

const statusIcon = (status?: string) => {
  switch (status?.toLowerCase()) {
    case "completed":
      return <CheckCircleOutlined />;
    case "in progress":
      return <ClockCircleOutlined />;
    default:
      return <InfoCircleOutlined />;
  }
};

const StudentManagementPage = () => {
  const [studentData, setStudentData] = useState<StudentDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [evaluationData, setEvaluationData] = useState<Evaluation | null>(null);
  const { url } = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchEvaluationData = async () => {
      try {
        const data = await getEvaluationByUrl(String(url));
        if (!data) {
          throw new Error("No evaluation data found");
        }
        setEvaluationData(data.data);
      } catch (error) {
        console.error("Error fetching evaluation data:", error);
        toast.error("Failed to load evaluation data");
      }
    };

    fetchEvaluationData();
  }, [url]);

  const fetchData = useCallback(async () => {
    if (!evaluationData?.exam_section_id) return;

    try {
      setLoading(true);
      const response = await getTrainees(evaluationData.exam_section_id);

      const responseData = response?.data || [];

      if (!Array.isArray(responseData)) {
        throw new Error("Invalid trainees data format");
      }

      const mappedData = responseData.map((trainee) => ({
        key: trainee.id.toString(),
        id: trainee.id,
        first_name: trainee.first_name || "N/A",
        last_name: trainee.last_name || "N/A",
        id_number: trainee.id_number || "N/A",
        email: trainee.email || "N/A",
        submission_time: trainee.assignment_user?.answers?.[0]?.submission_time,
        duration:
          trainee.assignment_user?.answers?.[0]?.time_to_stay_until_the_answer,
        grade: parseFloat(trainee.assignment_user?.grade || "0"),
        correct_answers_count:
          trainee.assignment_user?.correct_answers_count || 0,
        wrong_answers_count: trainee.assignment_user?.wrong_answers_count || 0,
        status: trainee.status || "Not Started",
        answers: trainee.assignment_user?.answers || [],
      }));

      setStudentData(mappedData);
    } catch (error) {
      console.error("Error fetching trainees:", error);
      toast.error("Failed to load student data");
    } finally {
      setLoading(false);
    }
  }, [evaluationData]);

  console.log(studentData);

  useEffect(() => {
    if (evaluationData) {
      fetchData();
    }
  }, [evaluationData, fetchData]);

  const handleEvaluate = async (student: StudentDataType) => {
    try {
      const response = await startTraineeEvaluation(
        evaluationData?.id!,
        student?.id
      );
      router.push(
        `/evaluations/trainee/${url}/questions?user_id=${response?.data?.id}`
      );
    } catch (error) {
      console.log(error);
    }
    toast.info(
      `Starting evaluation for ${student.first_name} ${student.last_name}`
    );
  };

  const handleViewEvaluation = async (student: StudentDataType) => {
    try {
      const response = await getTraineeId(student?.id);
      router.push(
        `/evaluations/trainee/${url}/result?user_id=${response?.data?.assignment_user_id}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const columns: TableProps<StudentDataType>["columns"] = [
    {
      title: "Student Name",
      key: "full_name",
      render: (_, record) => (
        <Text strong>
          {`${record.first_name} ${record.last_name}` || "N/A"}
        </Text>
      ),
      width: 180,
      fixed: "left",
    },
    {
      title: "Student ID",
      dataIndex: "id_number",
      key: "id_number",
      width: 120,
      render: (text) => <Text code>{text}</Text>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 220,
      render: (email) => (
        <Tooltip title={email}>
          <Text ellipsis style={{ maxWidth: "200px" }}>
            {email}
          </Text>
        </Tooltip>
      ),
    },
    {
      title: "Submission Time",
      key: "submission_time",
      render: (_, record) => record.answers?.[0]?.submission_time || "N/A",
      width: 180,
    },
    {
      title: "Duration",
      key: "duration",
      render: (_, record) =>
        record.answers?.[0]?.time_to_stay_until_the_answer || "N/A",
      width: 120,
    },
    {
      title: "Score",
      key: "grade",
      render: (_, record) => (
        <Text
          strong
          type={record.grade && record.grade >= 70 ? "success" : "danger"}
        >
          {record.grade ? `${record.grade}%` : "N/A"}
        </Text>
      ),
      width: 100,
    },
    {
      title: "Correct Answers",
      dataIndex: "correct_answers_count",
      key: "correct_answers_count",
      width: 140,
      render: (count) => <Tag color="green">{count}</Tag>,
    },
    {
      title: "Wrong Answers",
      dataIndex: "wrong_answers_count",
      key: "wrong_answers_count",
      width: 140,
      render: (count) => <Tag color="red">{count}</Tag>,
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <Tag
          icon={statusIcon(record.status)}
          color={statusColor(record.status)}
        >
          {record.status || "N/A"}
        </Tag>
      ),
      width: 160,
    },
    {
      title: "Actions",
      key: "action",
      fixed: "right",
      width: 179,
      render: (_, record) => (
        <Space size="middle">
          {record.status?.toLowerCase() === "notstarted" ? (
            <Button
              type="primary"
              onClick={() => handleEvaluate(record)}
              className="bg-primary-color1 hover:!bg-primary-color2"
            >
              Evaluate
            </Button>
          ) : record.status?.toLowerCase() === "completed" ? (
            <Button
              type="default"
              onClick={() => handleViewEvaluation(record)}
              className="text-primary-color1 border-primary-color1 "
              icon={<Eye className="size-4" />}
            >
              View Evaluation
            </Button>
          ) : (
            <Text type="secondary">No action</Text>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Card className="shadow-sm border-0 mt-24">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <Title
                level={3}
                className="!mb-1 !text-2xl font-semibold text-gray-800"
              >
                {" "}
                Evaluation Management
              </Title>
              <Text className="text-gray-500">
                View and manage student evaluations
              </Text>
            </div>
            <div className="mt-4 md:mt-0">
              <Text strong className="mr-2">
                Total Students:
              </Text>
              <Tag color="blue">{studentData.length}</Tag>
            </div>
          </div>

          <Divider className="!my-4" />

          {loading ? (
            <div className="flex justify-center flex-col items-center h-64">
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{ fontSize: 36, color: "#037f85" }}
                    spin
                  />
                }
              />
              <Text className="mt-3">loading students data...</Text>
            </div>
          ) : (
            <Table<StudentDataType>
              columns={columns}
              dataSource={studentData}
              loading={loading}
              scroll={{ x: 1500 }}
              bordered
              size="large"
              className="shadow-xs"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
              }}
            />
          )}
        </Card>
      </div>
    </div>
  );
};

export default StudentManagementPage;
