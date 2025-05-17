"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Button, Table, Tag, Space } from "antd";
import type { TableProps } from "antd";

import { toast } from "sonner";
import { getTrainees } from "@/lib/action/evaluation_action";

interface StudentDataType {
  key: string;
  first_name: string;
  last_name: string;
  id_number: string;
  email: string;
  submission_time?: string;
  duration?: string;
  grade?: number;
  correct_answers_count?: number;
  wrong_answers_count?: number;
  status?: string;
  answers?: Array<{
    submission_time?: string;
    time_to_stay_until_the_answer?: string;
  }>;
}

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

const columns: TableProps<StudentDataType>["columns"] = [
  {
    title: "Student Name",
    key: "full_name",
    render: (_, record) => `${record.first_name} ${record.last_name}` || "N/A",
    width: 160,
  },
  {
    title: "Student ID",
    dataIndex: "id_number",
    key: "id_number",
    width: 110,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: 230,
  },
  {
    title: "Submission Time",
    key: "submission_time",
    render: (_, record) => record.answers?.[0]?.submission_time || "N/A",
    width: 190,
  },
  {
    title: "Duration",
    key: "duration",
    render: (_, record) =>
      record.answers?.[0]?.time_to_stay_until_the_answer || "N/A",
    width: 110,
  },
  {
    title: "Score",
    key: "grade",
    render: (_, record) => (record.grade ? `${record.grade}%` : "N/A"),
    width: 110,
  },
  {
    title: "Correct Answers",
    dataIndex: "correct_answers_count",
    key: "correct_answers_count",
    width: 160,
  },
  {
    title: "Wrong Answers",
    dataIndex: "wrong_answers_count",
    key: "wrong_answers_count",
    width: 160,
  },
  {
    title: "Status",
    key: "status",
    render: (_, record) => (
      <Tag color={statusColor(record.status)}>{record.status || "N/A"}</Tag>
    ),
    width: 160,
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>View {record.first_name}</a>
      </Space>
    ),
  },
];

const StudentManagementPage = () => {
  const [studentData, setStudentData] = useState<StudentDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getTrainees();

      const traineesData = Array.isArray(response)
        ? response
        : response.data || [];

      const mappedData = traineesData.map((trainee: any) => ({
        key: trainee.assignment_user_id.toString(),
        first_name: trainee.first_name,
        last_name: trainee.last_name,
        id_number: trainee.id_number,
        email: trainee.email,
        submission_time: trainee.assignment_user?.answers?.[0]?.submission_time,
        duration:
          trainee.assignment_user?.answers?.[0]?.time_to_stay_until_the_answer,
        grade: parseFloat(trainee.assignment_user?.grade || 0),
        correct_answers_count:
          trainee.assignment_user?.correct_answers_count || 0,
        wrong_answers_count: trainee.assignment_user?.wrong_answers_count || 0,
        status: trainee.assignment_user?.status || "unknown",
        answers: trainee.assignment_user?.answers || [],
      }));

      setStudentData(mappedData);
    } catch (error) {
      console.error("Error fetching trainees:", error);
      toast.error("Failed to load student data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="container mx-auto h-screen relative top-28">
      <Table<StudentDataType>
        columns={columns}
        dataSource={studentData}
        loading={loading}
        scroll={{ x: 1500 }}
        bordered
        className="shadow-sm"
      />
    </div>
  );
};

export default StudentManagementPage;
