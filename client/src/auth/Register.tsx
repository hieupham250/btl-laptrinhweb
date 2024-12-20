import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs-react";
import { Form, Input, Button, notification } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import baseUrl from "../api/api";

export default function Register() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const checkUser = await baseUrl.get(`users?email=${values.email}`);
      if (checkUser.data.length > 0) {
        notification.error({
          message: "Đăng ký thất bại",
          description: "Email đã được sử dụng. Vui lòng chọn email khác.",
        });
        setLoading(false);
        return;
      }

      const hashedPassword = await bcrypt.hash(values.password, 10);

      const userData = {
        name: values.name,
        email: values.email,
        password: hashedPassword,
        role: 0,
        status: true,
        profilePicture:
          "https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg",
      };

      await baseUrl.post("users", userData);

      notification.success({
        message: "Đăng ký thành công",
        description: "Tài khoản của bạn đã được tạo. Vui lòng đăng nhập.",
      });

      navigate("/login");
    } catch (error) {
      console.error("Có lỗi xảy ra khi đăng ký:", error);
      notification.error({
        message: "Đăng ký thất bại",
        description: "Có lỗi xảy ra. Vui lòng thử lại sau.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gradient-custom flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="flex shadow-lg rounded-lg overflow-hidden w-full max-w-xl mx-auto">
        <div className="hidden md:block md:w-1/3">
          <img
            src="https://img.lovepik.com/original_origin_pic/18/11/27/137f9dc94ac924466aa154bcbc13531e.jpg_wh860.jpg"
            alt="Canyon"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="w-full md:w-2/3 p-6 bg-white">
          <h2 className="text-2xl font-bold mb-4">Đăng ký</h2>
          <Form
            form={form}
            name="register"
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="name"
              label="Họ và tên"
              rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Họ và tên"
              />
            </Form.Item>
            <Form.Item
              name="email"
              label="Địa chỉ email"
              rules={[
                { required: true, message: "Vui lòng nhập địa chỉ email!" },
                { type: "email", message: "Email không đúng định dạng!" },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Địa chỉ email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu!" },
                { min: 8, message: "Mật khẩu không được quá ngắn!" },
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Nhập mật khẩu"
              />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="Xác nhận mật khẩu"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Vui lòng xác nhận mật khẩu!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Mật khẩu xác nhận không khớp!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Xác nhận mật khẩu"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                loading={loading}
              >
                Đăng ký
              </Button>
            </Form.Item>
          </Form>
          <p className="mt-6 text-center text-gray-600">
            Đã có tài khoản?{" "}
            <Link to="/login" className="text-purple-500 hover:underline">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
