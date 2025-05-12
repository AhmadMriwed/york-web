import { Button, Modal, Space, Typography } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { Loader2 } from "lucide-react";

const DuplicateModal = ({
  open,
  onCancel,
  onConfirm,
  title,
  note,
  isDuplicating = false,
}: {
  open: boolean;
  title?: string;
  note?: string;
  isDuplicating?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) => {
  const { Text, Title } = Typography;

  return (
    <Modal
      title={
        <Space>
          <CopyOutlined style={{ color: "#1890ff", fontSize: 20 }} />
          <span>Confirm Duplication</span>
        </Space>
      }
      open={open}
      onCancel={onCancel}
      footer={
        <Space>
          <Button onClick={onCancel} disabled={isDuplicating}>
            Cancel
          </Button>
          <Button
            type="primary"
            icon={isDuplicating ? null : <CopyOutlined />}
            onClick={onConfirm}
            loading={isDuplicating}
            className="pb-1"
          >
            {isDuplicating ? "Duplicating..." : "Duplicate"}
          </Button>
        </Space>
      }
      centered
      width={450}
    >
      <div style={{ padding: "16px 0" }}>
        <Title level={5} style={{ marginBottom: 8 }}>
          {title || "Are you sure you want to duplicate this item?"}
        </Title>
        <Text type="secondary">
          {note || "This will create an identical copy of the item."}
        </Text>
      </div>
    </Modal>
  );
};

export default DuplicateModal;
