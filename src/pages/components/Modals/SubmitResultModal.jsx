import PropTypes from 'prop-types';

function SubmitResultModal({ isCorrect, onNextLevel, onRetry }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-80">
        {isCorrect ? (
          <>
            <h2 className="text-2xl mogra-regular text-[#A4A7C2] mb-4">Great Job!</h2>
            <p className="text-lg text-gray-700 mb-6">You got the correct answer!</p>
            <button
              className="px-4 py-2 bg-[#4CAF50] text-white font-semibold rounded-lg shadow-md hover:bg-[#388E3C] transition duration-300 ease-in-out transform hover:scale-105"
              onClick={onNextLevel}
            >
              Next Level
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl mogra-regular text-[#A4A7C2] mb-4">Oops!</h2>
            <p className="text-lg text-gray-700 mb-6">That was incorrect.</p>
            <button
              className="px-4 py-2 bg-[#ff0000] text-white font-semibold rounded-lg shadow-md hover:bg-[#b71c1c] transition duration-300 ease-in-out transform hover:scale-105"
              onClick={onRetry}
            >
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  );
}
SubmitResultModal.propTypes = {
  isCorrect: PropTypes.bool.isRequired,
  onNextLevel: PropTypes.func.isRequired,
  onRetry: PropTypes.func.isRequired,
};

export default SubmitResultModal;
