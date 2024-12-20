import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ExamSubjects } from "../../interfaces";
import {
  addSubject,
  deleteSubject,
  editSubject,
  fetchSubjects,
} from "../../store/reducers/admin/getSubject";
import SubjectModal from "../../components/admin/FormSubject";
import { useNavigate, useParams } from "react-router-dom";

export default function ManageSubjects() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const navigate = useNavigate();

  const subjects: ExamSubjects[] = useSelector(
    (state: any) => state.subject.subject
  );

  const [newSubject, setNewSubject] = useState<any>({
    title: "",
    description: "",
    image:
      "https://firebasestorage.googleapis.com/v0/b/project-df4f0.appspot.com/o/20.jpg?alt=media&token=a41bd001-b347-4d45-876e-b408f734a36a",
    courseId: Number(id),
  });
  const [editingSubject, setEditingSubject] = useState<null | ExamSubjects>(
    null
  );
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);

  useEffect(() => {
    dispatch(fetchSubjects(id));
  }, [dispatch, id]);

  // Pagination logic
  const indexOfLastSubject = currentPage * perPage;
  const indexOfFirstSubject = indexOfLastSubject - perPage;
  const currentSubjects = subjects.slice(
    indexOfFirstSubject,
    indexOfLastSubject
  );
  const totalPages = Math.ceil(subjects.length / perPage);

  const openModal = () => setModalIsOpen(true);

  const closeModal = () => {
    setModalIsOpen(false);
    setEditingSubject(null);
    setNewSubject({
      title: "",
      description: "",
      image:
        "https://firebasestorage.googleapis.com/v0/b/project-df4f0.appspot.com/o/20.jpg?alt=media&token=a41bd001-b347-4d45-876e-b408f734a36a",
      courseId: Number(id),
    });
  };

  const handleAddSubject = () => {
    dispatch(addSubject(newSubject));
    closeModal();
  };

  const handleEditSubject = (subject: ExamSubjects) => {
    setEditingSubject(subject);
    setNewSubject(subject);
    openModal();
  };

  const handleSaveSubject = () => {
    dispatch(editSubject(newSubject));
    closeModal();
  };

  const handleDeleteSubject = (subjectId: number) => {
    dispatch(deleteSubject(subjectId));
  };

  const handleNext = (id: number) => {
    navigate(`/admin/coursesAd/subjectAd/examAd/${id}`);
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
      <h1 className="text-2xl font-bold mb-4">Quản Lý Môn Thi</h1>
      <button
        onClick={openModal}
        className="bg-orange-400 text-white px-4 py-2 rounded mb-4"
      >
        Thêm Mới
      </button>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">STT</th>
            <th className="py-2 px-4 border-b">Tiêu Đề</th>
            <th className="py-2 px-4 border-b">Hình Ảnh</th>
            <th className="py-2 px-4 border-b">Mô Tả</th>
            <th className="py-2 px-4 border-b">Chức Năng</th>
          </tr>
        </thead>
        <tbody>
          {currentSubjects.map((subject: ExamSubjects, index: number) => (
            <tr key={subject.id}>
              <td className="py-2 px-4 border-b text-center">
                {indexOfFirstSubject + index + 1}
              </td>
              <td
                className="py-2 px-4 border-b text-center cursor-pointer"
                onClick={() => handleNext(subject.id)}
                title="Các đề thi"
              >
                {subject.title}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <img
                  src={subject.image}
                  alt={subject.title}
                  className="rounded-50 w-10 h-10 object-cover mx-auto"
                />
              </td>
              <td className="py-2 px-4 border-b text-center">
                {subject.description}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditSubject(subject);
                  }}
                  className="bg-yellow-400 text-white px-4 py-2 rounded mr-2"
                >
                  Sửa
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteSubject(subject.id);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded"
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

      <SubjectModal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        subject={newSubject}
        setSubject={setNewSubject}
        handleSave={editingSubject ? handleSaveSubject : handleAddSubject}
        isEditing={!!editingSubject}
      />
    </div>
  );
}
