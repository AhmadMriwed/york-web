import { Button, Modal, Space, Typography } from "antd";
import { ExclamationCircleFilled, DeleteOutlined } from "@ant-design/icons";

const DeleteModal = ({
  open,
  onCancel,
  onConfirm,
  title,
  note,
}: {
  open: boolean;
  title?: string;
  note?: string;
  onCancel: () => void;
  onConfirm: () => void;
}) => {
  const { Text, Title } = Typography;

  return (
    <Modal
      title={
        <Space>
          <ExclamationCircleFilled style={{ color: "#ff4d4f", fontSize: 20 }} />
          <span>Confirm Deletion</span>
        </Space>
      }
      open={open}
      onCancel={onCancel}
      footer={
        <Space>
          <Button onClick={onCancel}>Cancel</Button>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={onConfirm}
          >
            Delete
          </Button>
        </Space>
      }
      centered
      width={450}
    >
      <div style={{ padding: "16px 0" }}>
        <Title level={5} style={{ marginBottom: 8 }}>
          {title}
        </Title>
        <Text type="secondary">{note}</Text>
      </div>
    </Modal>
  );
};
export default DeleteModal;
