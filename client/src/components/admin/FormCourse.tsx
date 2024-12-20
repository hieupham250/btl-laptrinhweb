import React, { useEffect } from "react";
import { Form, Input, Button, Modal } from "antd";

interface CourseFormModalProps {
  isOpen: boolean;
  closeModal: () => void;
  course: { title: string; description: string };
  setCourse: (course: {
    title: string;
    description: string;
    image?: string;
  }) => void;
  handleSave: () => void;
  isEditing: boolean;
}

const CourseFormModal: React.FC<CourseFormModalProps> = ({
  isOpen,
  closeModal,
  course,
  setCourse,
  handleSave,
  isEditing,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (isOpen) {
      form.setFieldsValue(course);
    } else {
      form.resetFields();
    }
  }, [isOpen, course, form]);

  const onFinish = (values: { title: string; description: string }) => {
    setCourse(values);
    handleSave();
    form.resetFields();
  };

  return (
    <Modal
      visible={isOpen}
      title={
        isEditing ? (
          <h1 className="text-2xl">Cập nhật Khóa thi</h1>
        ) : (
          <h1 className="text-2xl">Thêm mới Khóa thi</h1>
        )
      }
      onCancel={closeModal}
      footer={null}
    >
      <Form
        form={form}
        initialValues={course}
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
            onChange={(e) => setCourse({ ...course, title: e.target.value })}
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
              setCourse({ ...course, description: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item>
          <div className="flex justify-end space-x-4">
            <Button htmlType="submit" className="bg-green-600 text-white">
              {isEditing ? "Cập nhật" : "Thêm Mới"}
            </Button>
            <Button onClick={closeModal} className="bg-gray-600 text-white">
              Hủy
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CourseFormModal;
