import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Questions } from "../../interfaces";
import {
  addQuestion,
  deleteQuestion,
  editQuestion,
  fetchQuestions,
} from "../../store/reducers/admin/getQuestions";
import { useParams } from "react-router-dom";
import QuestionModal from "../../components/admin/FormQuestuon";

export default function ManageQuestions() {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const questions: Questions[] = useSelector(
    (state: any) => state.question.question
  );

  const [questionData, setQuestionData] = useState<Questions>({
    id: 0,
    question: "",
    examId: Number(id),
    options: ["", "", "", ""],
    answer: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 10;

  useEffect(() => {
    dispatch(fetchQuestions(id));
  }, [dispatch, id]);

  // Pagination logic
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );
  console.log(indexOfFirstQuestion);

  const totalPages = Math.ceil(questions.length / questionsPerPage);

  const handleInputChange = (name: string, value: string) => {
    setQuestionData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleOptionChange = (index: number, value: string) => {
    setQuestionData((prevData) => {
      const newOptions = [...prevData.options];
      newOptions[index] = value;
      return { ...prevData, options: newOptions };
    });
  };

  const handleAnswerChange = (value: string) => {
    setQuestionData((prevData) => ({ ...prevData, answer: value }));
  };

  const handleAddQuestion = () => {
    dispatch(addQuestion(questionData));
    resetQuestionData();
    setIsModalOpen(false);
  };

  const handleEditQuestion = () => {
    dispatch(editQuestion(questionData));
    resetQuestionData();
    setIsModalOpen(false);
  };

  const handleDeleteQuestion = (questionId: number) => {
    dispatch(deleteQuestion(questionId));
  };

  const openEditModal = (question: Questions) => {
    setQuestionData({
      ...question,
      examId: Number(id),
    });
    setIsModalOpen(true);
    setIsEditMode(true);
  };

  const resetQuestionData = () => {
    setQuestionData({
      id: 0,
      question: "",
      examId: Number(id),
      options: ["", "", "", ""],
      answer: "",
    });
    setIsEditMode(false);
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quản Lý Câu Hỏi</h1>
      <button
        className="bg-pink-600 text-white px-4 py-2 rounded mb-4"
        onClick={() => {
          resetQuestionData();
          setIsModalOpen(true);
        }}
      >
        Thêm Mới
      </button>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">STT</th>
            <th className="py-2 px-4 border-b">Câu Hỏi</th>
            <th className="py-2 px-4 border-b">Đáp Án</th>
            <th className="py-2 px-4 border-b">Đáp Án Đúng</th>
            <th className="py-2 px-4 border-b">Chức Năng</th>
          </tr>
        </thead>
        <tbody>
          {currentQuestions.map((question, index) => (
            <tr key={question.id}>
              <td className="py-2 px-4 border-b text-center">
                {indexOfFirstQuestion + index + 1}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {question.question}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {question.options.join("; ")}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {question.answer}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  className="bg-yellow-400 text-white px-4 py-2 rounded mr-2"
                  onClick={() => openEditModal(question)}
                >
                  Sửa
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <nav className="inline-flex">
          <button
            onClick={() => changePage("prev")}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-l-lg ${
              currentPage === 1
                ? "bg-gray-300 text-gray-600"
                : "bg-white text-blue-500 hover:bg-blue-100"
            } border border-gray-300`}
          >
            ‹
          </button>
          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page + 1}
              onClick={() => navigateToPage(page + 1)}
              className={`px-3 py-1 ${
                currentPage === page + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500 hover:bg-blue-100"
              } border-t border-b border-gray-300`}
            >
              {page + 1}
            </button>
          ))}
          <button
            onClick={() => changePage("next")}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-r-lg ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-600"
                : "bg-white text-blue-500 hover:bg-blue-100"
            } border border-gray-300`}
          >
            ›
          </button>
        </nav>
      </div>

      <QuestionModal
        isOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        questionData={questionData}
        handleInputChange={handleInputChange}
        handleOptionChange={handleOptionChange}
        handleAnswerChange={handleAnswerChange}
        handleAddQuestion={handleAddQuestion}
        handleEditQuestion={handleEditQuestion}
        isEditMode={isEditMode}
      />
    </div>
  );
}
