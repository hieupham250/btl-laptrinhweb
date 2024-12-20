import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { LocationState, ResultCardProps } from "../../interfaces";

const ResultUser: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md border border-indigo-100">
          <h1 className="text-3xl font-bold text-indigo-800 mb-6 text-center">
            Kết Quả Bài Thi
          </h1>
          <div className="grid grid-cols-2 gap-4">
            <ResultCard title="Câu Đúng" value={state.correct} icon="✅" />
            <ResultCard title="Câu Sai" value={state.incorrect} icon="❌" />
            <ResultCard
              title="Thời Gian"
              value={formatTime(state.time)}
              icon="⏱️"
            />
            <ResultCard
              title="Điểm Số"
              value={state.score}
              icon="🏆"
              highlight
            />
          </div>
          <div className="mt-8 text-center">
            <button className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-full shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out">
              Xem Chi Tiết
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const ResultCard: React.FC<ResultCardProps> = ({
  title,
  value,
  icon,
  highlight = false,
}) => {
  return (
    <div
      className={`bg-white p-4 rounded-lg shadow-sm border ${
        highlight ? "border-indigo-300 bg-indigo-50" : "border-gray-200"
      }`}
    >
      <div className="flex items-center mb-1">
        <span className="text-xl mr-2">{icon}</span>
        <h2 className="text-sm font-semibold text-gray-700">{title}</h2>
      </div>
      <p
        className={`text-2xl font-bold ${
          highlight ? "text-indigo-600" : "text-gray-800"
        }`}
      >
        {value}
      </p>
    </div>
  );
};

export default ResultUser;
