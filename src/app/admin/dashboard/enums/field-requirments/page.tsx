"use client";
import { Button, Table, Modal, Input, Space, message } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";

interface FieldRequirement {
  id: number;
  name: string;
}

const FieldRequirementsPage = () => {
  const router = useRouter();
  const [fields, setFields] = useState<FieldRequirement[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newFieldName, setNewFieldName] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [addingField, setAddingField] = useState(false);

  const fetchFieldRequirements = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/assignment/field-requirements");
      setFields(response.data?.data || []);
    } catch (error) {
      message.error("Failed to fetch field requirements");
      setFields([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFieldRequirements();
  }, []);

  const handleAddField = async () => {
    if (!newFieldName.trim()) {
      message.warning("Please enter a field name");
      return;
    }

    try {
      setAddingField(true);
      await axios.post("/assignment/field-requirements", {
        name: newFieldName.trim(),
      });
      message.success("Field added successfully");
      setIsModalVisible(false);
      setNewFieldName("");
      fetchFieldRequirements();
    } catch (error) {
      message.error("Failed to add field");
    } finally {
      setAddingField(false);
    }
  };

  const handleDeleteField = async (id: number) => {
    Modal.confirm({
      title: "Delete Field",
      content: "Are you sure you want to delete this field?",
      okText: "Delete",
      okButtonProps: { danger: true },
      cancelText: "Cancel",
      async onOk() {
        try {
          setDeletingId(id);
          await axios.delete(`/assignment/field-requirements/${id}`);
          message.success("Field deleted successfully");
          fetchFieldRequirements();
        } catch (error) {
          message.error("Failed to delete field");
        } finally {
          setDeletingId(null);
        }
      },
    });
  };

  const formatFieldName = (name: string) => {
    return name
      ? name.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
      : "";
  };

  const columns = [
    {
      title: "FIELD NAME",
      dataIndex: "name",
      key: "name",
      render: (name: string) => formatFieldName(name),
    },
    {
      title: "ACTION",
      key: "action",
      width: 100,
      render: (_: any, record: FieldRequirement) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDeleteField(record.id)}
          size="small"
        />
      ),
    },
  ];

  return (
    <div className="p-4   rounded-lg shadow">
      <div className="flex sm:w-1/2 justify-between items-center mb-4">
        <div className="flex items-center justify-center gap-3">
          <IoArrowBack
            size={20}
            className="text-primary-color1"
            onClick={() => router.back()}
          />
          <h1 className="text-lg sm:text-[19px] font-semibold text-gray-800 dark:text-gray-300">
            Field Requirments
          </h1>
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          Add custom field
        </Button>
      </div>
      <div className="sm:w-1/2" style={{ height: "70vh" }}>
        <Table
          columns={columns}
          dataSource={fields}
          rowKey="id"
          loading={loading}
          pagination={false}
          className="border rounded [&_.ant-table-body]:[&::-webkit-scrollbar]:hidden
           [&_.ant-table-body]:[-ms-overflow-style:none] [&_.ant-table-body]:[scrollbar-width:none]
            dark:border-gray-700 dark:bg-gray-800"
          size="large"
          scroll={{ y: "calc(70vh - 80px)" }}
        />
      </div>

      <Modal
        title="Add Custom Field"
        open={isModalVisible}
        onOk={handleAddField}
        onCancel={() => {
          setIsModalVisible(false);
          setNewFieldName("");
        }}
        okText="Add Field"
        cancelText="Cancel"
        confirmLoading={addingField}
      >
        <Space direction="vertical" className="w-full">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Field Name
            </label>
            <Input
              value={newFieldName}
              onChange={(e) => setNewFieldName(e.target.value)}
              placeholder="Enter field name"
              onPressEnter={handleAddField}
            />
          </div>
        </Space>
      </Modal>
      <style>
        {`
           
.dark .ant-table {
  background: #1f2937 !important; 
  color: #f3f4f6 !important; 
}

.dark .ant-table-thead > tr > th {
  background: #111827 !important; 
  color: #f9fafb !important; 
  border-bottom: 1px solid #374151 !important; 
}

.dark .ant-table-tbody > tr > td {
  border-bottom: 1px solid #374151 !important; 
}

.dark .ant-table-tbody > tr:hover > td {
  background: #374151 !important; 
}

/* Pagination and other elements */
.dark .ant-pagination-item,
.dark .ant-pagination-prev,
.dark .ant-pagination-next {
  background: #1f2937 !important;
  border-color: #374151 !important;
}

.dark .ant-pagination-item a {
  color: #f3f4f6 !important;
}

.dark .ant-pagination-item-active {
  background: #374151 !important; 
}`}
      </style>
    </div>
  );
};

export default FieldRequirementsPage;
