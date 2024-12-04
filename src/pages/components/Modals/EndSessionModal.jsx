import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function EndSessionModal({ onConfirm, onCancel }) {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-80">
        <h2 className="text-2xl mogra-regular text-[#A4A7C2] mb-4">End Game</h2>
        <p className="text-lg text-gray-700 mb-6">
          Are you sure you want to end the game?
        </p>
        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 bg-[#ff9800] text-white font-semibold rounded-lg shadow-md hover:bg-[#e68900] transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => {
              onConfirm();
              navigate("/");
            }}
          >
            Yes
          </button>
          <button
            className="px-4 py-2 bg-[#ff0000] text-white font-semibold rounded-lg shadow-md hover:bg-[#852a2a] transition duration-300 ease-in-out transform hover:scale-105"
            onClick={onCancel}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
EndSessionModal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EndSessionModal;
