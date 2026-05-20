import { useState, useEffect } from "react";
import { GrDuplicate } from "react-icons/gr";
import { Modal, Button, Input, Form } from "antd";

interface DuplicateModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: (title: string) => Promise<void>;
  isDuplicating: boolean;
  title: string;
  note: string;
  defaultTitle?: string;
  defaultCode?: string;
}

const DuplicateModal = ({
  open,
  onCancel,
  onConfirm,
  isDuplicating,
  title,
  note,
  defaultTitle,
}: DuplicateModalProps) => {
  const [form] = Form.useForm();
  const [newTitle, setNewTitle] = useState(defaultTitle || "");

  useEffect(() => {
    if (open) {
      form.setFieldsValue({ title: defaultTitle });
      setNewTitle(defaultTitle || "");
    }
  }, [open, defaultTitle, form]);

  const handleConfirm = async () => {
    try {
      const values = await form.validateFields();
      await onConfirm(values.title);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title={
        <div className="flex items-center gap-2">
          <GrDuplicate className="text-primary-color1" />
          {title}
        </div>
      }
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={isDuplicating}
          onClick={handleConfirm}
          className="bg-primary-color1"
        >
          Duplicate
        </Button>,
      ]}
      centered
      maskClosable={false}
    >
      <p className="mb-4">{note}</p>
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Session Title"
          rules={[{ required: false, message: "Please enter a session title" }]}
        >
          <Input
            placeholder="Enter new session title"
            onChange={(e) => setNewTitle(e.target.value)}
            className="border-primary-color1 focus:border-primary-color1"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DuplicateModal;
