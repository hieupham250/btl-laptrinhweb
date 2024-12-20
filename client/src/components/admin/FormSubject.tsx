import React, { useEffect } from "react";
import { Form, Input, Button, Modal } from "antd";

interface SubjectModalProps {
  isOpen: boolean;
  closeModal: () => void;
  subject: { id?: number | null; title: string; description: string };
  setSubject: (subject: {
    id?: number | null;
    title: string;
    description: string;
  }) => void;
  handleSave: () => void;
  isEditing: boolean;
}

const SubjectModal: React.FC<SubjectModalProps> = ({
  isOpen,
  closeModal,
  subject,
  setSubject,
  handleSave,
  isEditing,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (isOpen) {
      form.setFieldsValue(subject);
    } else {
      form.resetFields();
    }
  }, [isOpen, subject, form]);

  const onFinish = (values: { title: string; description: string }) => {
    setSubject(values);
    handleSave();
    form.resetFields();
  };

  return (
    <Modal
      visible={isOpen}
      title={
        isEditing ? (
          <h1 className="text-2xl">Chỉnh Sửa Môn Thi</h1>
        ) : (
          <h1 className="text-2xl">Thêm Môn Thi Mới</h1>
        )
      }
      onCancel={closeModal}
      footer={null}
    >
      <Form
        form={form}
        initialValues={subject}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="title"
          label="Tiêu Đề"
          rules={[{ required: true, message: "Tiêu đề không được để trống" }]}
        >
          <Input
            placeholder="Tiêu Đề"
            onChange={(e) => setSubject({ ...subject, title: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          name="description"
          label="Mô Tả"
          rules={[{ required: true, message: "Mô tả không được để trống" }]}
        >
          <Input.TextArea
            placeholder="Mô Tả"
            onChange={(e) =>
              setSubject({ ...subject, description: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item>
          <div className="flex justify-end space-x-4">
            <Button htmlType="submit" className="bg-orange-400 text-white">
              {isEditing ? "Cập Nhật" : "Thêm Mới"}
            </Button>
            <Button onClick={closeModal} className="bg-gray-500 text-white">
              Hủy
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SubjectModal;
