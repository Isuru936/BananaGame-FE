import { useEffect, useRef, useState } from "react";
import Banner from "../components/Banner";
import EndSessionModal from "../components/Modals/EndSessionModal";
import SubmitResultModal from "../components/Modals/SubmitResultModal";
import TimesUpModal from "../components/Modals/TimesUpModal";
import { useNavigate } from "react-router-dom";
import { useTimer } from "react-timer-hook";
import { useGameSessions } from "../../hooks/useGameSessions";
import { getAuthUserId } from "../../hooks/getAuthUserId";
import useGlobalAudio from "../../lib/useGlobalAudio";
import { toast } from "react-toastify";

import "../styles/Game.css";

function Game() {
  const navigate = useNavigate();
  const { endSession, getQuestion } = useGameSessions();
  const { isPlaying, togglePlay } = useGlobalAudio();
  const inputRef = useRef(null);

  const [gameState, setGameState] = useState({
    level: 1,
    score: 0,
    answer: "",
    questionData: null,
    isCorrectAnswer: false,
    isTimeUp: false,
    isLoading: false,
  });

  const [modalState, setModalState] = useState({
    isEndModalVisible: false,
    isSubmitModalVisible: false,
  });

  const time = new Date();
  time.setSeconds(time.getSeconds() + 60);

  const { seconds, minutes, start, restart } = useTimer({
    expiryTimestamp: time,
    onExpire: () => setGameState((prev) => ({ ...prev, isTimeUp: true })),
  });

  useEffect(() => {
    inputRef.current?.focus();
    fetchQuestion();
  }, [gameState.level]);

  const fetchQuestion = async () => {
    try {
      setGameState((prev) => ({ ...prev, isLoading: true }));
      const question = await getQuestion();
      setGameState((prev) => ({ ...prev, questionData: question, isLoading: false }));
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  const handleEndGame = async () => {
    try {
      await endSession({
        PlayerId: getAuthUserId(),
        Level: gameState.level,
        SessionScore: gameState.score,
      });
    } catch (error) {
      toast.error("Unexpected error:", error);
    }
  };

  const handleSubmit = async () => {
    if (!gameState.answer.trim()) {
      toast.error("Answer cannot be empty!");
      return;
    }

    const isCorrect =
      parseInt(gameState.answer) === gameState.questionData?.solution;
    if (isCorrect) {
      const newScore = Math.max(0, minutes * 60 + seconds);
      setGameState((prev) => ({
        ...prev,
        score: prev.score + newScore,
        level: prev.level + 1,
        answer: "",
        isCorrectAnswer: true,
      }));
      restart(time);
      toast.info(`Correct! You scored ${newScore} points.`);
    } else {
      renderModal();
      setModalState({ isSubmitModalVisible: true });
      await handleEndGame();
    }

    setModalState({ isSubmitModalVisible: true });
  };

  const resetGame = () => {
    setGameState({
      level: 1,
      score: 0,
      answer: "",
      questionData: null,
      isCorrectAnswer: false,
      isTimeUp: false,
    });
    navigate("/");
  };
  const renderModal = () => {
    if (modalState.isEndModalVisible) {
      return (
        <EndSessionModal
          onCancel={() => setModalState({ isEndModalVisible: false })}
          onConfirm={handleEndGame}
        />
      );
    }
    console.log(modalState.isSubmitModalVisible);

    if (modalState.isSubmitModalVisible) {
      return (
        <SubmitResultModal
          isCorrect={gameState.isCorrectAnswer}
          onNextLevel={() =>
            setModalState({ isSubmitModalVisible: false }) || start()
          }
          onRetry={resetGame}
        />
      );
    }

    if (gameState.isTimeUp) {
      return <TimesUpModal score={gameState.score} onRetry={resetGame} />;
    }
    return null;
  };

  return (
    <div
      className="flex flex-col border-2 justify-evenly bg-cover bg-center"
      style={{
        backgroundImage: `url('/background-elements/game-bg.png')`,
      }}
    >
      <nav className="flex justify-end gap-6 p-5">
        <button onClick={togglePlay} className="">
          {isPlaying ? (
            <img
              className="w-16 h-16 transition-transform duration-300 transform hover:scale-110 hover:brightness-125 hover:sepia hover:hue-rotate-30 hover:saturate-150"
              src="/icons/akar-icons--sound-on.png"
              alt="Sound Icon"
            />
          ) : (
            <img
              className="w-16 h-16 transition-transform duration-300 transform hover:scale-110 hover:brightness-125 hover:sepia hover:hue-rotate-30 hover:saturate-150"
              src="/icons/akar-icons--sound-off.png"
              alt="Sound Icon"
            />
          )}
        </button>
      </nav>
      
      <div className="flex justify-evenly w-screen">
        <div className="divide-y-8">
          <h1 className="mogra-regular text-6xl text-[#A4A7C2]">
            Level {gameState.level}
          </h1>

          {gameState.questionData && !gameState.isTimeUp && (
            <div className="relative">
              {gameState.isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 w-full h-64">
                  <img
                    src="icons/codicon--loading.png"
                    alt="loading"
                    className="animate-spin w-16 h-26"
                  />
                  <span className="text-3xl text-gray-500">
                    Loading Question...
                  </span>
                </div>
              )}
              <img
                src={gameState.questionData?.question}
                alt="Question"
                className="border-[#10358a31]"
                style={{
                  borderWidth: "14px",
                  opacity: gameState.isLoading ? 0.5 : 1,
                }}
              />
            </div>
          )}

          <div className="flex justify-between text-2xl mogra-regular text-[#082790]">
            <ScoreBox label="Current Score" value={gameState.score} />
            <div
              className={`border-4 border-[#082790] rounded-lg w-52 h-32 p-3 ${
                seconds <= 10 && minutes === 0 ? "blink" : ""
              }`}
            >
              <h3>Time</h3>
              <p className="text-5xl">
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </p>
            </div>

            <div
              className={`first-letter:border-4 bg-[#0700008a] rounded-lg w-52 h-32 p-3 flex flex-col items-center`}
            >
              <h3 className="text-white text-4xl mb-2">Answer</h3>
              <div className="flex flex-row items-center text-6xl text-white space-x-2">
                <img
                  src="/icons/banana-answer.png"
                  className="w-12 h-12"
                  alt=""
                />
                <span>=</span>
                <input
                  type="number"
                  min="0"
                  ref={inputRef}
                  max="9"
                  value={gameState.answer}
                  className="w-12 text-2xl bg-transparent text-center border-none outline-none text-white"
                  onChange={(e) =>
                    setGameState((prev) => ({
                      ...prev,
                      answer: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </div>
          {!gameState.isTimeUp && (
            <>
              <button
                className="px-4 py-2 bg-[#ff9800] text-white font-semibold rounded-lg shadow-md hover:bg-[#e68900] transition duration-300 ease-in-out transform hover:scale-105"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button
                className="px-4 py-2 bg-[#ff0000] ml-4 text-white font-semibold rounded-lg shadow-md hover:bg-[#852a2a] transition duration-300 ease-in-out transform hover:scale-105"
                onClick={() => setModalState({ isEndModalVisible: true })}
              >
                End Game
              </button>
            </>
          )}
        </div>
        <div className="h-screen flex align-middle items-center">
          <Banner />
        </div>
      </div>

      {renderModal()}
    </div>
  );
}

import PropTypes from 'prop-types';

const ScoreBox = ({ label, value }) => (
  <div className="border-4 rounded-lg w-52 h-32 p-3 border-[#082790]">
    <h3>{label}</h3>
    <p className="text-6xl">{value}</p>
  </div>
);

ScoreBox.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Game;



// LOST LOADING AND SHAKE FEATURE