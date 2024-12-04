function TimesUpModal({ score, onRetry }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-none bg-opacity-70 z-50">
      <div className=" p-8 rounded-xl shadow-xl text-center w-96 animate-scale-up bg-white">
        <h2 className="text-3xl mogra-regular text-gray-700 mb-4">
          ⏳ Times Up!
        </h2>
        <p className="text-lg text-gray-700 mb-6 font-medium">
          You ran out of time, but don’t give up!
        </p>
        <div className="bg-white p-4 rounded-lg mb-6 shadow-inner">
          <p className="text-xl font-bold text-gray-800">
            Your Score: <span className="text-red-600">{score}</span>
          </p>
        </div>
        <button
          className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-500 transition duration-300 ease-in-out transform hover:scale-105 focus:ring-4 focus:ring-yellow-400"
          onClick={onRetry}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

export default TimesUpModal;
