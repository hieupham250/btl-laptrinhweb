import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getExamUser, searchExams } from "../../store/reducers/users/exam";
import { Exams } from "../../interfaces";

export default function UserExam() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { id } = useParams();

  const exams: Exams[] = useSelector((state: any) => state.userExam.userExam);

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(getExamUser(id));
  }, [dispatch, id]);

  // Xử lý thay đổi truy vấn tìm kiếm
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    dispatch(searchExams(query));
    setCurrentPage(1);
  };

  // Logic phân trang
  const indexOfLastExam = currentPage * perPage;
  const indexOfFirstExam = indexOfLastExam - perPage;
  const currentExams = exams.slice(indexOfFirstExam, indexOfLastExam);
  const totalPages = Math.ceil(exams.length / perPage);

  const handleNext = (id: number) => {
    localStorage.removeItem("timeUser");
    navigate(`/examDetail/${id}`);
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
        <h3 className="text-3xl font-bold text-blue-800">Các đề thi</h3>
        <div className="w-full max-w-md">
          <input
            type="text"
            placeholder="Tìm kiếm đề thi"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border border-blue-300 rounded-xl focus:outline-none focus:border-blue-500 shadow-md"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentExams.map((exam) => (
          <div
            key={exam.id}
            className="bg-white shadow-lg rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105"
            onClick={() => handleNext(exam.id)}
          >
            <img
              src={exam.image}
              alt={exam.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h4 className="font-bold text-xl mb-2 text-blue-800">
                {exam.title}
              </h4>
              <p className="text-gray-700">{exam.description}</p>
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
