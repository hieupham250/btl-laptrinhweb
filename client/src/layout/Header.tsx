import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Menu } from "antd";

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user") || sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const menu = (
    <Menu>
      <Menu.Item key="profile">
        <Link to="/userHome">Hồ sơ</Link>
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="bg-gradient-to-r from-orange-500 to-red-600 shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-6">
        <div className="flex items-center">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/project-df4f0.appspot.com/o/%E1%BA%A2nh_ch%E1%BB%A5p_m%C3%A0n_h%C3%ACnh_2024-07-10_152831-removebg-preview.png?alt=media&token=5b582e5e-2635-4bee-9427-0eab5511dc79"
            alt="Logo"
            className="h-14 w-20 filter drop-shadow-md"
          />
          <span className="ml-3 text-2xl font-extrabold text-sky-300 tracking-wide">
            VinaStudy
          </span>
        </div>

        <nav className="hidden md:flex space-x-7">
          <Link
            to="/"
            className="text-white hover:text-orange-200 text-xl transition duration-300"
          >
            Trang chủ
          </Link>
          <Link
            to="/courses"
            className="text-white hover:text-orange-200 text-xl transition duration-300"
          >
            Khóa học
          </Link>
          <Link
            to="/about"
            className="text-white hover:text-orange-200 text-xl transition duration-300"
          >
            Về chúng tôi
          </Link>
          <Link
            to="/contact"
            className="text-white hover:text-orange-200 text-xl transition duration-300"
          >
            Liên hệ
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          {user ? (
            <Dropdown overlay={menu} trigger={["click"]}>
              <div className="flex items-center cursor-pointer">
                <span className="text-white text-xl">{user.name}</span>
                <img
                  src={user.profilePicture}
                  alt="User Avatar"
                  className="h-10 w-10 rounded-full ml-2"
                />
              </div>
            </Dropdown>
          ) : (
            <>
              <Link to="/login">
                <button className="bg-white text-orange-600 px-6 py-2 rounded-full font-semibold hover:bg-orange-100 transition duration-300 ease-in-out transform hover:scale-105 shadow-md">
                  Đăng nhập
                </button>
              </Link>
              <Link to="/register">
                <button className="bg-orange-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-md">
                  Đăng ký
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
