import { useNavigate } from "react-router-dom";
import { usePlayers } from "../hooks/usePlayers";
import { useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

function Leaderboard() {
  const { players, loading, error, fetchPlayers } = usePlayers();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  const goToStart = () => {
    navigate("/");
  };

  if (error) {
    return <div className="text-red-600">Error: {error}</div>;
  }

  const playerList = (players?.value || []).sort(
    (a, b) => b.highestScore - a.highestScore
  );

  return (
    <div
      className="flex flex-row w-screen h-screen border-2 justify-center items-center align-middle bg-cover bg-center"
      style={{
        backgroundImage: `url('/background-elements/leaderboard-bg.png')`,
      }}
    >
      <div className="w-[75%] h-[75%] bg-[#ffffffa4] rounded-lg shadow-lg p-8 flex flex-col items-center space-y-4">
        <h1 className="text-8xl font-bold mb-4 monofett-regular">
          Leaderboard
        </h1>
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Icon icon="line-md:loading-loop" className="text-white" />
          </div>
        ) : (
          <div className="w-full">
            <div className="flex justify-between border-b-2 border-gray-300 pb-2 mb-4 text-lg font-semibold life-savers-regular">
              <span className="w-1/6 text-center">Rank</span>
              <span className="w-2/3 text-left">Player</span>
              <span className="w-1/6 text-right">Score</span>
            </div>
            {playerList.map((player, index) => (
              <div
                key={player.id || index}
                className="flex justify-between items-center py-2 px-4 rounded-md mb-2 text-black hover:bg-[#ffc24949] transition-colors life-savers-regular"
              >
                <span className="w-1/6 text-center font-bold text-lg text-[#8A732E]">
                  {index + 1}
                </span>
                <span className="w-2/3 text-left font-semibold">
                  {player.userName}
                </span>
                <span className="w-1/6 text-right font-semibold">
                  {player.highestScore}
                </span>
              </div>
            ))}
          </div>
        )}
        <button
          className="p-3 bg-black justify-center w-[90%] text-white rounded-full life-savers-regular flex h-fit text-2xl hover:scale-110 transition-transform duration-500"
          onClick={goToStart}
        >
          <img
            src="/icons/image.png"
            className="w-8 h-8"
            alt="Back to Game Icon"
          />{" "}
          Back to Game
        </button>
      </div>
    </div>
  );
}

export default Leaderboard;
