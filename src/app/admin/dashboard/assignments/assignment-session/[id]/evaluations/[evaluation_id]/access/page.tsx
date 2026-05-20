"use client";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import { Card } from "@/components/ui/card";
import { fetchAssignmentById, generateUrl } from "@/lib/action/exam_action";
import { Assignment } from "@/types/adminTypes/assignments/assignExamTypes";
import { Button, Col, Input, message, Modal, Row, Tabs } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { FaCopy, FaFileExport, FaPlus } from "react-icons/fa";
import { FiGlobe, FiLink } from "react-icons/fi";
import { IoArrowBackSharp } from "react-icons/io5";
import { MdLink, MdPassword, MdVpnKey } from "react-icons/md";
import { toast } from "sonner";

import { useFetchWithId } from "@/hooks/useFetch";
import {
  exportAccessCodes,
  fetchAccessCodes,
  generateGroupPassword,
} from "@/lib/action/assignment_action";
import { PrivateAccessCodeType } from "@/types/adminTypes/assignments/examTypes";

import AddStudentForm from "@/components/assignments/AddStudentFormModal";
import PrivateAccessCodeTable from "@/components/assignments/StudentsAccessCodesTable";
import { Select } from "antd";
import { Info } from "lucide-react";
import { fetchEvaluationById } from "@/lib/action/evaluation_action";
const { Option } = Select;

const { TabPane } = Tabs;
const { Search } = Input;
const { TextArea } = Input;

const ExamAccessPage = () => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const { id, evaluation_id } = useParams();
  const [loading, setLoading] = useState(false);
  const [assignmentData, setAssignmentData] = useState<Assignment | null>(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const router = useRouter();

  // State for Group Password
  const [groupPassword, setGroupPassword] = useState("");

  // export :

  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const [exportFormData, setExportFormData] = useState({
    file_name: "",
    type: "pdf",
  });

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        if (!id) {
          throw new Error("Missing session ID in URL");
        }

        console.log("try to fetch data");
        const data = await fetchEvaluationById(Number(evaluation_id));
        console.log(data);
        if (!data) {
          throw new Error("no data");
        }
        setAssignmentData(data?.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const {
    data: accessCodesData,
    isLoading: accessCodeLoading,
    error,
    refetch,
  } = useFetchWithId<PrivateAccessCodeType[]>(
    fetchAccessCodes,
    Number(assignmentData?.forms[0].id)
  );

  const generatePublicLink = async () => {
    const toastId = toast.loading("generating url ...");
    try {
      const response = await generateUrl(Number(evaluation_id));
      console.log("API Response:", response);

      toast.success("URL has been created  successfully", {
        duration: 300,
        id: toastId,
      });
    } catch (error: any) {
      console.error("Submission Error:", error);
      toast.error("Oops! Something went wrong", {
        description: error.message,
        duration: 5000,
        id: toastId,
      });
    } finally {
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleExportCancel = () => {
    setIsExportModalOpen(false);
    setExportFormData({
      file_name: "",
      type: "pdf",
    });
  };

  const handleExportFormChange = (field: string, value: string) => {
    setExportFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleExportSubmit = async () => {
    if (!exportFormData.file_name.trim()) {
      message.error("Please enter a file name");
      return;
    }

    if (!assignmentData?.forms[0].id) {
      message.error("No form ID available");
      return;
    }

    setExportLoading(true);
    try {
      await exportAccessCodes({
        form_id: Number(assignmentData.forms[0].id),
        type: exportFormData.type,
        file_name: exportFormData.file_name,
      });
      toast.success("Export started successfully");
      setIsExportModalOpen(false);
    } catch (error: any) {
      console.error("Export error:", error);
      message.error(error.message || "Failed to export");
    } finally {
      setExportLoading(false);
    }
  };

  const saveGroupPassword = async () => {
    if (!assignmentData?.forms[0].id) {
      message.error("No form ID available");
      return;
    }

    if (groupPassword.length < 8) {
      message.error("Password must be at least 8 characters");
      return;
    }

    const toastId = toast.loading("Saving group password...");
    try {
      await generateGroupPassword(
        Number(assignmentData.forms[0].id),
        groupPassword
      );
      toast.success("Group password saved successfully", {
        id: toastId,
      });
    } catch (error: any) {
      console.error("Error saving group password:", error);
      toast.error(error.message || "Failed to save group password", {
        id: toastId,
      });
    }
  };
  return (
    <div
      className={`relative px-1 sm:p-4 min-h-screen ${
        mode === "dark" ? "text-white" : "text-dark"
      }`}
    >
      <div className="flex justify-between items-start mb-5 pt-2">
        <div className="flex justify-start items-center gap-2 max-sm:pt-1 max-sm:px-3 text-[var(--primary-color1)] hover:text-[var(--primary-color2)]">
          <IoArrowBackSharp
            className="text-primary-color1 text-xl sm:text-xl cursor-pointer"
            onClick={() => router.back()}
          />
          <h3 className="text-[21px] sm:text-2xl font-semibold tracking-wider">
            Exam Access Settings
          </h3>
        </div>
      </div>

      <Tabs defaultActiveKey="publicLink">
        <TabPane
          tab={
            <span className="flex items-center gap-2 dark:text-white">
              <MdLink className="text-lg" />
              <span className="font-medium">Public Link</span>
            </span>
          }
          key="publicLink"
        >
          {!assignmentData?.url ? (
            <div className="text-center py-8 dark:bg-gray-800 rounded-lg p-6">
              <div className="flex justify-center mb-4">
                <MdLink className="text-4xl text-gray-400 dark:text-gray-500" />
              </div>
              <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
                No access code generated yet
              </p>
              <Button
                type="primary"
                onClick={generatePublicLink}
                className="bg-[var(--primary-color1)] hover:bg-[var(--primary-color2)]  h-10 px-6 rounded-lg font-medium transition-all"
              >
                Generate Access Code
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-5 shadow-sm">
                <h4 className="font-bold mb-3 text-gray-800 dark:text-gray-200 flex items-center gap-2">
                  <FiLink className="text-lg" />
                  Exam Link:
                </h4>
                <div className="my-5 flex items-center p-3  gap-2 dark:bg-gray-600 border-primary-color1 bg-gray-200 rounded-md">
                  <Info className="text-primary-color1" />
                  <p className="text-primary-color1 dark:text-white">
                    Anyone who has a link will be able to take the test
                  </p>
                </div>
                {assignmentData?.url && (
                  <div className="flex gap-3">
                    <Input
                      value={`https://york-web-wheat.vercel.app/evaluations/trainer/${assignmentData?.url}`}
                      className="dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-400"
                      addonBefore={
                        <span className="text-gray-500 dark:text-gray-300">
                          <FiGlobe className="inline mr-1" />
                          URL
                        </span>
                      }
                    />
                    <Button
                      type="primary"
                      onClick={() =>
                        copyToClipboard(
                          `https://york-web-wheat.vercel.app/evaluations/trainer/${assignmentData?.url}`
                        )
                      }
                      icon={<FaCopy className="relative -top-px" />}
                      className="flex items-center gap-2 h-10 px-4 rounded-lg font-medium bg-primary-color1 transition-all"
                    >
                      Copy Link
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </TabPane>

        <TabPane
          tab={
            <span className="flex items-center gap-2 dark:text-white">
              <MdVpnKey className="text-lg" />
              <span className="font-medium">Private Codes</span>
            </span>
          }
          key="privateCode"
        >
          <Card className="mt-4">
            <div className="my-5 flex items-center p-3  gap-2 dark:bg-gray-600 border-primary-color1 bg-gray-200 rounded-md">
              <Info className="text-primary-color1" />
              <p className="text-primary-color1 dark:text-white">
                Test access will be possible only with an individual access code
              </p>
            </div>
            <div className="flex justify-end p-4 items-center mb-4">
              <div className="flex gap-2">
                <Button
                  type="primary"
                  onClick={() => setIsAddModalVisible(true)}
                  icon={<FaPlus />}
                >
                  Add Student(s)
                </Button>
                <Button
                  type="default"
                  icon={<FaFileExport />}
                  onClick={() => setIsExportModalOpen(true)}
                >
                  Export
                </Button>
              </div>
            </div>
            {isAddModalVisible && (
              <AddStudentForm
                formId={Number(assignmentData?.forms[0].id)}
                visible={isAddModalVisible}
                onCancel={() => setIsAddModalVisible(false)}
                refetch={refetch}
              />
            )}
            {isExportModalOpen && (
              <Modal
                title="Export Access Codes"
                open={isExportModalOpen}
                onOk={handleExportSubmit}
                onCancel={handleExportCancel}
                confirmLoading={exportLoading}
                footer={[
                  <Button
                    key="back"
                    onClick={handleExportCancel}
                    disabled={exportLoading}
                  >
                    Cancel
                  </Button>,
                  <Button
                    key="submit"
                    type="primary"
                    onClick={handleExportSubmit}
                    className="!bg-primary-color1"
                    loading={exportLoading}
                  >
                    Export
                  </Button>,
                ]}
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                      File Name
                    </label>
                    <Input
                      placeholder="Enter file name"
                      value={exportFormData.file_name}
                      onChange={(e) =>
                        handleExportFormChange("file_name", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                      File Type
                    </label>
                    <Select
                      className="w-full"
                      value={exportFormData.type}
                      onChange={(value) =>
                        handleExportFormChange("type", value)
                      }
                    >
                      <Option value="pdf">PDF</Option>
                      <Option value="word">Word</Option>
                      <Option value="excel">Excel</Option>
                    </Select>
                  </div>
                </div>
              </Modal>
            )}
            {/*@ts-ignore */}
            <PrivateAccessCodeTable data={accessCodesData} refetch={refetch} />
          </Card>
        </TabPane>

        <TabPane
          tab={
            <span className="flex items-center gap-2 dark:text-white">
              <MdPassword className="text-lg" />
              <span className="font-medium">Group Password</span>
            </span>
          }
          key="groupPassword"
        >
          <Card className="mt-4">
            <Row gutter={24}>
              <Col span={12}>
                <div className="space-y-4 p-4">
                  <h4 className="font-bold">Password Settings</h4>

                  <div>
                    <label className="block mb-2">Group Password</label>
                    <Input.Password
                      placeholder="Enter password (min 8 characters)"
                      value={groupPassword}
                      onChange={(e) => setGroupPassword(e.target.value)}
                      status={
                        groupPassword.length > 0 && groupPassword.length < 8
                          ? "error"
                          : ""
                      }
                    />
                    {groupPassword.length > 0 && groupPassword.length < 8 && (
                      <p className="text-red-500 text-sm mt-1">
                        Password must be at least 8 characters
                      </p>
                    )}
                  </div>

                  <Button
                    className="disabled:dark:text-gray-200"
                    type="primary"
                    onClick={saveGroupPassword}
                    disabled={groupPassword.length < 8}
                  >
                    Save Password
                  </Button>
                </div>
              </Col>
            </Row>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ExamAccessPage;
