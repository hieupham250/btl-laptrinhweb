export default function Modal({ isOpen, onClose, onLogin }: any) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
        <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-lg w-full border border-gray-100 relative">
          <h3 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Bạn chưa đăng nhập
          </h3>
          <p className="mb-16 text-center text-gray-600 text-lg">
            Vui lòng Đăng nhập để trải nghiệm tính năng thú vị.
          </p>
          <div className="absolute bottom-6 right-6 flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-200 transition-all duration-300 shadow-sm hover:shadow"
            >
              Đóng
            </button>
            <button
              onClick={onLogin}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Đăng nhập
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
