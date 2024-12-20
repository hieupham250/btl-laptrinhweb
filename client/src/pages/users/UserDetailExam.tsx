import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getExamUserId } from "../../store/reducers/users/exam";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import {
  createComment,
  getCommentsById,
} from "../../store/reducers/users/commentUser";
import baseUrl from "../../api/api";
import { Comment } from "../../interfaces";
import dayjs from "dayjs";

const UserDetailExam = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { id } = useParams();

  const [users, setUsers] = useState<any[]>([]);
  const [userLogin, setUserLogin] = useState<any>(null);
  const [addComment, setAddComment] = useState<Comment>({
    userId: 0,
    examId: 0,
    content: "",
    create_at: "",
  });

  const currentExam = useSelector((state: any) => state.userExam.userExam);
  const comments = useSelector((state: any) => state.userComment.comment);

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user") || sessionStorage.getItem("user");
    if (storedUser) {
      setUserLogin(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await baseUrl.get("users");
      setUsers(response.data); // Lưu dữ liệu vào state
    };

    fetchUsers();

    dispatch(getExamUserId(id));
    dispatch(getCommentsById(id));
  }, [dispatch, id]);

  const handleStartExam = () => {
    navigate(`/userQuestion/${id}`);
  };

  const getUserName = (userId: number) => {
    const user = users.find((user: any) => user.id == userId);
    return user ? user.name : "";
  };

  const setValueComment = (value: string) => {
    setAddComment({ ...addComment, content: value });
  };

  // Hàm xử lý khi nhấn nút gửi
  const handleSendComment = () => {
    const newComment = {
      ...addComment,
      userId: Number(userLogin.id),
      examId: Number(id),
      create_at: new Date().toISOString(),
    };
    dispatch(createComment(newComment));
  };

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto p-4">
        {/* Header Section */}
        <div className="border-b mb-4 grid grid-cols-[200px,1fr] gap-4">
          <div>
            <img
              src={currentExam.image}
              alt={currentExam.title}
              className="w-full h-40 object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-2">{currentExam.title}</h1>
            <div className="flex items-center text-sm text-gray-500 space-x-4">
              <span>
                Thời gian làm bài: {currentExam.duration} phút |{" "}
                {comments ? comments.length : "0"} bình luận
              </span>
            </div>
            <p className="text-sm my-2">Mô tả: {currentExam.description}</p>
            <button
              className="bg-blue-500 py-1 px-2 text-white"
              onClick={handleStartExam}
            >
              luyện tập bài thi
            </button>
          </div>
        </div>

        {/* Comment Section */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Bình luận</h2>
          <div className="flex gap-3">
            <textarea
              placeholder="Chia sẻ cảm nghĩ của bạn ..."
              className="w-full h-[63px] p-3 border rounded"
              value={addComment.content}
              onChange={(e) => setValueComment(e.target.value)}
            ></textarea>
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded"
              onClick={handleSendComment}
            >
              Gửi
            </button>
          </div>
          <div className="mt-6 space-y-4">
            {comments.map((comment: any) => (
              <div key={comment.id} className="bg-gray-100 p-4 rounded shadow">
                <p className="text-sm text-gray-600 mb-2">
                  {getUserName(comment.userId)}{" "}
                  {dayjs(comment.create_at).format("HH:mm DD/MM/YYYY")}
                </p>
                <p>{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserDetailExam;
