import Footer from "../../layout/Footer";
import Header from "../../layout/Header";

export default function UserPage() {
  const getUser = JSON.parse(String(localStorage.getItem("user")));
  return (
    <>
      <Header></Header>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
        <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl p-8 m-4 max-w-xl w-full text-white">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 mb-4 md:mb-0">
              <img
                src={getUser.profilePicture}
                alt="Ảnh đại diện"
                className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-white shadow-lg"
              />
            </div>
            <div className="md:w-2/3 md:pl-6">
              <h2 className="text-3xl font-bold mb-2">{getUser.name}</h2>
              <p className="mb-4">{getUser.email}</p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white border-opacity-50">
            <h3 className="text-xl font-bold mb-4">Giới thiệu</h3>
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <div className="mt-6 flex justify-center">
            <button className="bg-white text-purple-600 px-4 py-2 rounded-full font-bold hover:bg-purple-100 transition duration-300">
              Chỉnh sửa hồ sơ
            </button>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
