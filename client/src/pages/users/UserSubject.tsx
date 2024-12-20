import { useDispatch, useSelector } from "react-redux";
import { ExamSubjects } from "../../interfaces";
import { useEffect, useState } from "react";
import {
  getSubjectUser,
  searchSubjects,
} from "../../store/reducers/users/subject";
import { useNavigate, useParams } from "react-router-dom";

export default function UserSubject() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const subjects: ExamSubjects[] = useSelector(
    (state: any) => state.userSubject.userSubject
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(getSubjectUser(id));
  }, [dispatch, id]);

  // Xử lý thay đổi truy vấn tìm kiếm
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    dispatch(searchSubjects(query));
    setCurrentPage(1);
  };

  // Logic phân trang
  const indexOfLastSubject = currentPage * perPage;
  const indexOfFirstSubject = indexOfLastSubject - perPage;
  const currentSubjects = subjects.slice(
    indexOfFirstSubject,
    indexOfLastSubject
  );
  const totalPages = Math.ceil(subjects.length / perPage);

  const handleNext = (id: number) => {
    navigate(`/courseUser/userSubject/userExam/${id}`);
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

  return (
    <div className="w-full lg:w-3/4">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-3xl font-bold text-blue-800">Các môn thi</h3>
        <div className="w-full max-w-md">
          <input
            type="text"
            placeholder="Tìm kiếm môn thi"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border border-blue-300 rounded-xl focus:outline-none focus:border-blue-500 shadow-md"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentSubjects.map((subject) => (
          <div
            key={subject.id}
            className="bg-white shadow-lg rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105"
            onClick={() => handleNext(subject.id)}
          >
            <img
              src={subject.image}
              alt={subject.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h4 className="font-bold text-xl mb-2 text-blue-800">
                {subject.title}
              </h4>
              <p className="text-gray-700">{subject.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Phân trang */}
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
