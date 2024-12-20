import React, { useEffect } from "react";
import { Form, Input, Button, Modal } from "antd";

interface ExamModalProps {
  isOpen: boolean;
  closeModal: () => void;
  exam: {
    id?: number | null;
    title: string;
    description: string;
    duration: string;
  };
  setExam: (exam: {
    id?: number | null;
    title: string;
    description: string;
    duration: string;
  }) => void;
  handleSave: () => void;
  isEditing: boolean;
}

const ExamModal: React.FC<ExamModalProps> = ({
  isOpen,
  closeModal,
  exam,
  setExam,
  handleSave,
  isEditing,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (isOpen) {
      form.setFieldsValue(exam);
    } else {
      form.resetFields();
    }
  }, [isOpen, exam, form]);

  const onFinish = (values: {
    title: string;
    description: string;
    duration: string;
  }) => {
    setExam(values);
    handleSave();
    form.resetFields();
  };

  return (
    <Modal
      visible={isOpen}
      title={
        isEditing ? (
          <h1 className="text-2xl">Chỉnh Sửa Đề Thi</h1>
        ) : (
          <h1 className="text-2xl">Thêm Đề Thi Mới</h1>
        )
      }
      onCancel={closeModal}
      footer={null}
    >
      <Form
        form={form}
        initialValues={exam}
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
            onChange={(e) => setExam({ ...exam, title: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          name="description"
          label="Mô Tả"
          rules={[{ required: true, message: "Mô tả không được để trống" }]}
        >
          <Input.TextArea
            placeholder="Mô Tả"
            onChange={(e) => setExam({ ...exam, description: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          name="duration"
          label="Thời Gian Thi (phút)"
          rules={[
            { required: true, message: "Thời gian thi không được để trống" },
          ]}
        >
          <Input
            type="number"
            placeholder="Thời Gian Thi (phút)"
            onChange={(e) => setExam({ ...exam, duration: e.target.value })}
          />
        </Form.Item>
        <Form.Item>
          <div className="flex justify-end space-x-4">
            <Button htmlType="submit" className="bg-violet-600 text-white">
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

export default ExamModal;
