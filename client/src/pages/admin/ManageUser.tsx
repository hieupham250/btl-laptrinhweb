import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserAd,
  toggleUserLock,
  deleteUser,
  searchUsers,
  sortUsers,
  updateUserRole,
} from "../../store/reducers/admin/getUsers";
import NewUserForm from "../../components/admin/FormNewUser";
import { Users } from "../../interfaces";
import { Select } from "antd";

export default function ManageUser() {
  const dispatch = useDispatch();
  const allUsers: Users[] = useSelector((state: any) => state.user.user);
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const { Option } = Select;

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);

  useEffect(() => {
    dispatch(getUserAd());
  }, [dispatch]);

  useEffect(() => {
    dispatch(searchUsers(searchQuery));
  }, [searchQuery, dispatch]);

  useEffect(() => {
    dispatch(
      sortUsers({ order: sortOrder === "asc" ? "asc" : "desc", field: "name" })
    );
  }, [sortOrder, dispatch]);

  // Pagination logic
  const indexOfLastUser = currentPage * perPage;
  const indexOfFirstUser = indexOfLastUser - perPage;
  const currentUsers = allUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(allUsers.length / perPage);

  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
  };

  const handleToggleLock = (id: number) => {
    dispatch(toggleUserLock(id));
  };

  const handleDeleteUser = (id: number) => {
    dispatch(deleteUser(id));
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

  // phân quyền
  const handleRoleChange = (userId: number, newRole: number) => {
    dispatch(updateUserRole({ userId, newRole }));
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Quản Lý người dùng</h1>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={toggleModalVisibility}
          className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Thêm mới
        </button>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            className="py-2 px-4 bg-white border rounded-lg shadow-sm focus:outline-none"
            placeholder="Tìm kiếm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="py-2 px-4 bg-white border rounded-lg shadow-sm focus:outline-none"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Tăng dần</option>
            <option value="desc">Giảm dần</option>
          </select>
        </div>
      </div>
      {isModalVisible && <NewUserForm setModalVisible={setModalVisible} />}
      <table className="min-w-full bg-white rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-center">STT</th>
            <th className="py-3 px-6 text-center">Họ và tên</th>
            <th className="py-3 px-6 text-center">Hình đại diện</th>
            <th className="py-3 px-6 text-center">Email</th>
            <th className="py-3 px-6 text-center">Vai trò</th>
            <th className="py-3 px-6 text-center">Trạng thái</th>
            <th className="py-3 px-6 text-center">Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user: Users, index: number) => (
            <tr
              className="hover:bg-gray-100 border-b border-gray-200 py-10"
              key={user.id}
            >
              <td className="py-3 px-6 text-center whitespace-nowrap">
                {indexOfFirstUser + index + 1}
              </td>
              <td className="py-3 px-6 text-center">{user.name}</td>
              <td className="py-3 px-6 text-center">
                <img
                  src={user.profilePicture}
                  alt={user.name}
                  className="rounded-full w-10 h-10 object-cover mx-auto"
                />
              </td>
              <td className="py-3 px-6 text-center">{user.email}</td>
              <td className="py-3 px-6 text-center">
                <Select
                  value={user.role}
                  onChange={(value) => handleRoleChange(user.id, value)}
                  style={{ width: 140 }}
                >
                  <Option value={0}>Người dùng</Option>
                  <Option value={1}>Quản trị viên</Option>
                </Select>
              </td>
              <td className="py-3 px-6 text-center">
                <button
                  onClick={() => handleToggleLock(user.id)}
                  className={`${
                    user.status
                      ? "text-red-500 hover:text-red-600"
                      : "text-green-500 hover:text-green-600"
                  }`}
                >
                  {user.status ? "Khóa" : "Mở khóa"}
                </button>
              </td>
              <td className="py-3 px-6 text-center">
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="text-red-600 hover:text-red-700 ml-2"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Phân trang */}
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
    </>
  );
}
