import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox, notification, Modal } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import baseUrl from "../api/api";
import { Users } from "../interfaces";
import bcrypt from "bcryptjs-react";

export default function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<Users[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await baseUrl.get("users");
        setUsers(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu người dùng:", error);
      }
    };

    fetchUsers();
  }, []);

  const onFinish = async (values: any) => {
    setLoading(true);
    const user = users.find((u) => u.email === values.email);

    if (user) {
      try {
        const passwordMatch = await bcrypt.compare(
          values.password,
          user.password
        );
        if (passwordMatch) {
          if (user.status === false) {
            setIsModalVisible(true);
          } else {
            const userInfo = {
              id: user.id,
              email: user.email,
              name: user.name,
              profilePicture: user.profilePicture,
              role: user.role,
              status: user.status,
            };

            if (values.remember) {
              localStorage.setItem("user", JSON.stringify(userInfo));
            } else {
              sessionStorage.setItem("user", JSON.stringify(userInfo));
            }

            if (user.role === 1) {
              notification.success({
                message: "Đăng nhập thành công",
                description:
                  "Chào mừng bạn đến với trang quản lý Admin của chúng tôi.",
              });
              navigate("/admin");
            } else {
              notification.success({
                message: "Đăng nhập thành công",
                description:
                  "Chào mừng bạn đến với trang web của chúng tôi. Cùng luyện thi nâng cao kiến thức thôi nào!",
              });
              navigate("/");
            }
          }
        } else {
          notification.error({
            message: "Đăng nhập thất bại",
            description: "Email hoặc mật khẩu không chính xác.",
          });
        }
      } catch (error) {
        console.error("Lỗi khi so sánh mật khẩu:", error);
        notification.error({
          message: "Đăng nhập thất bại",
          description: "Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại sau.",
        });
      }
    } else {
      notification.error({
        message: "Đăng nhập thất bại",
        description: "Email hoặc mật khẩu không chính xác.",
      });
    }
    setLoading(false);
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
          <h2 className="text-2xl font-bold mb-4">Đăng nhập</h2>
          <Form
            form={form}
            name="login"
            onFinish={onFinish}
            initialValues={{ remember: true }}
            layout="vertical"
          >
            <Form.Item
              name="email"
              label="Địa chỉ email"
              rules={[
                { required: true, message: "Vui lòng nhập địa chỉ email!" },
                { type: "email", message: "Email không đúng định dạng!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
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
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Nhớ đăng nhập</Checkbox>
              </Form.Item>
              <a
                className="float-right text-sm text-indigo-600 hover:text-indigo-500"
                href="#"
              >
                Quên mật khẩu?
              </a>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                loading={loading}
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
          <div className="text-center mt-3">
            <span className="text-sm text-gray-600">hoặc</span>
          </div>
          <p className="mt-6 text-center text-gray-600">
            Chưa có tài khoản?{" "}
            <Link to="/register" className="text-purple-500 hover:underline">
              Đăng ký
            </Link>
          </p>
        </div>
      </div>
      <Modal
        title="Tài khoản bị khóa"
        visible={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>
          Tài khoản của bạn đã bị khóa. Vui lòng liên hệ admin để biết thêm chi
          tiết.
        </p>
      </Modal>
    </div>
  );
}
