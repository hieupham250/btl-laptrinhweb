import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../../layout/Footer";
import Header from "../../layout/Header";
import { Route, Routes } from "react-router-dom";
import UserCourses from "./UserCourses";
import UserSubject from "./UserSubject";
import UserExam from "./UserExam";

export default function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 3000,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="w-full px-4 py-8">
          <Slider {...settings}>
            <div className="px-2">
              <img
                className="w-full h-[60vh] object-cover rounded-lg shadow-lg"
                src="https://hoc247.net/bannernet/881_1681440356.webp?id=1.001?1720604784523"
                alt="Slide 1"
              />
            </div>
            <div className="px-2">
              <img
                className="w-full h-[60vh] object-cover rounded-lg shadow-lg"
                src="https://hoc247.net/bannernet/870_1717746415.jpg?id=1.001?1720604784352"
                alt="Slide 2"
              />
            </div>
            <div className="px-2">
              <img
                className="w-full h-[60vh] object-cover rounded-lg shadow-lg"
                src="https://hoc247.net/bannernet/240_1685674803.png?id=1.001?1720604801755"
                alt="Slide 3"
              />
            </div>
          </Slider>
        </div>
        <main className="flex-grow bg-gradient-to-r from-blue-50 to-blue-100 py-12">
          <div className="container mx-auto px-4 flex flex-col lg:flex-row">
            <aside className="w-full lg:w-1/4 bg-white shadow-2xl rounded-xl p-6 mb-8 lg:mb-0 lg:mr-8 transition-transform transform hover:scale-105">
              <h4 className="text-2xl font-bold mb-4 text-blue-800 border-b-4 border-blue-300 pb-2">
                Tin nổi bật
              </h4>
              <ul className="text-gray-700 space-y-2">
                <li className="hover:text-blue-600 transition-colors">
                  Toán 7 - Số thực
                </li>
                <li className="hover:text-blue-600 transition-colors">
                  Toán 7 - LUYỆN TẬP TỈ LỆ THỨC, DÃY TỈ SỐ BẰNG NHAU
                </li>
                <li className="hover:text-blue-600 transition-colors">
                  Toán 7 - TỈ LỆ THỨC
                </li>
                <li className="hover:text-blue-600 transition-colors">
                  Toán 6 - Xác suất
                </li>
                <li className="hover:text-blue-600 transition-colors">
                  Toán 6 - Hai bài toán về phân số
                </li>
                <li className="hover:text-blue-600 transition-colors">
                  Toán 6 - Lũy thừa với số mũ tự nhiên
                </li>
                <li className="hover:text-blue-600 transition-colors">
                  Toán 5 - Phương pháp tính ngược từ cuối
                </li>
                <li className="hover:text-blue-600 transition-colors">
                  Toán 5 - Bài toán hạt tươi, hạt khô
                </li>
                <li className="hover:text-blue-600 transition-colors">
                  Toán 5 - Bài toán tỉ lệ (Tỉ lệ thuận - tỉ lệ nghịch)
                </li>
                <li className="hover:text-blue-600 transition-colors">
                  Toán 8 - Kết nối tri thức với cuộc sống
                </li>
                <li className="hover:text-blue-600 transition-colors">
                  Toán 8 - Chân trời sáng tạo
                </li>
                <li className="hover:text-blue-600 transition-colors">
                  Toán 8 - Cùng khám phá
                </li>
                <li className="hover:text-blue-600 transition-colors">
                  Toán 9 - Căn thức bậc hai và hằng đẳng thức
                </li>
                <li className="hover:text-blue-600 transition-colors">
                  Toán 9 - Bảng căn bậc hai
                </li>
              </ul>
            </aside>

            <Routes>
              <Route path="/" element={<UserCourses />}></Route>
              <Route
                path="courseUser/userSubject/:id"
                element={<UserSubject />}
              ></Route>
              <Route
                path="courseUser/userSubject/userExam/:id"
                element={<UserExam />}
              ></Route>
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
