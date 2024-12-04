import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePlayers } from "../hooks/usePlayers";
import { getAuthUserId } from "../hooks/getAuthUserId";
import ButtonGroup from "./components/ButtonGroup";

function Stats() {
  const [player, setPlayer] = useState(null);
  const { fetchPlayerById, loading, error } = usePlayers();
  const navigate = useNavigate();
  useEffect(() => {
    const userId = getAuthUserId();
    if (userId) {
      fetchPlayerById(userId)
        .then((data) => setPlayer(data.value))
        .catch((err) => console.error("Error fetching player data:", err));
    }
  }, []);

  const formatTime = (totalTime) => {
    const days = new Date(totalTime).getDate();
    const minutes = new Date(totalTime).getMinutes();
    const hours = new Date(totalTime).getHours();

    return `${hours + (days - 1) * 24} hours ${minutes} minutes`;
  };

  const goToMainMenu = () => {
    navigate("/");
  };

  return (
    <div
      className="flex flex-row w-screen h-screen border-2 bg-cover bg-center align-middle justify-center items-center"
      style={{
        backgroundImage: `url('/background-elements/stats-bg.png')`,
        backgroundPosition: "center",
      }}
    >
      <div className="w-[75%] h-[75%] bg-[#ffffffe2] p-10">
        <h1 className="metrophobic-regular text-4xl text-center text-[#776300] ">
          Banana Game
        </h1>
        <div className="flex flex-row h-full justify-between p-8 rounded-lg">
          <div className="flex-2 flex-grow">
            {(() => {
              if (loading) {
                return <p>Loading player data...</p>;
              } else if (error) {
                return <p>Error loading player data.</p>;
              } else if (player) {
                return (
                  <div className="text-left space-y-3 text-black life-savers-regular text-3xl">
                    <p>Username: {player.userName}</p>
                    <p>Email: {player.email}</p>
                    <p>Farthest Level: {player.farthestLevel}</p>
                    <p>Highest Score: {player.highestScore}</p>
                    <p>
                      Total Time Played: {formatTime(player.totalTimePlayed)}
                    </p>
                    <p>Total Levels Played: {player.levelsPlayed}</p>
                  </div>
                );
              } else {
                return <p>No player data available.</p>;
              }
            })()}
          </div>
          <div
            className="flex-1 flex-grow justify-center w-full border-l-2 p-5 border-black"
            style={{
              backgroundImage: `url('/icons/settings-bg.png')`,
              backgroundPosition: "cover",
            }}
          >
            <button
              className="p-3 bg-black justify-center w-full text-white rounded-full life-savers-regular flex h-fit text-2xl hover:scale-110 transition-transform duration-500"
              onClick={goToMainMenu}
            >
              <img
                src="/icons/image.png"
                className="w-8 h-8"
                alt="Back to Game"
              />{" "}
              Back to Game
            </button>

            <div className="flex items-center justify-center space-x-6">
              <ButtonGroup />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
