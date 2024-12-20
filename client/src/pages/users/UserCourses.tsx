import { useDispatch, useSelector } from "react-redux";
import {
  getCoursesUser,
  searchCourses,
} from "../../store/reducers/users/courses";
import { Courses } from "../../interfaces";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/user/Modal";

export default function UserCourses() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const courses: Courses[] = useSelector(
    (state: any) => state.userCourse.userCourse
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getCoursesUser());
  }, [dispatch]);

  const indexOfLastCourse = currentPage * perPage;
  const indexOfFirstCourse = indexOfLastCourse - perPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(courses.length / perPage);

  const handleCourseClick = (id: number) => {
    const isLoggedIn = localStorage.getItem("user"); // lấy dữ liệu local kiểm tra trạng thái đăng nhập
    if (!isLoggedIn) {
      setIsModalOpen(true);
    } else {
      navigate(`courseUser/userSubject/${id}`);
    }
  };

  const navigateToPage = (page: number) => {
    setCurrentPage(page);
  };

  const changePage = (direction: "prev" | "next") => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    dispatch(searchCourses(query));
    setCurrentPage(1);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="w-full lg:w-3/4">
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onLogin={handleLogin}
      />
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-3xl font-bold text-blue-800">Các khóa học</h3>
        <div className="w-full max-w-md">
          <input
            type="text"
            placeholder="Tìm kiếm khóa học"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border border-blue-300 rounded-xl focus:outline-none focus:border-blue-500 shadow-md"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white shadow-lg rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105"
            onClick={() => handleCourseClick(course.id)}
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h4 className="font-bold text-xl mb-2 text-blue-800">
                {course.title}
              </h4>
              <p className="text-gray-700">{course.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={() => changePage("prev")}
          disabled={currentPage === 1}
          className={`px-3 py-1 text-sm rounded-full ${
            currentPage === 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          ‹
        </button>
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page + 1}
            onClick={() => navigateToPage(page + 1)}
            className={`px-3 py-1 text-sm rounded-full ${
              currentPage === page + 1
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500 border border-blue-500 hover:bg-blue-100"
            }`}
          >
            {page + 1}
          </button>
        ))}
        <button
          onClick={() => changePage("next")}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 text-sm rounded-full ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          ›
        </button>
      </div>
    </div>
  );
}
