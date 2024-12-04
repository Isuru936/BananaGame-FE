import { useNavigate } from "react-router-dom";
import { useGameSessions } from "../hooks/useGameSessions";
import { getAuthUserId } from "../hooks/getAuthUserId";
import Banner from "./components/Banner";
import ButtonGroup from "./components/ButtonGroup";
import { toast } from "react-toastify";

export default function Index() {
  const navigate = useNavigate();
  const { startSession } = useGameSessions(); // Get startSession function from the custom hook

  const startGame = async () => {
    try {
      const PlayerId = getAuthUserId();

      if (!PlayerId) {
        toast.error("Player ID is missing. Please log in again.");
        return;
      }

      const sessionData = { PlayerId }; // Data for starting the session
      console.log("Creating game session with data:", sessionData);

      const response = await startSession(sessionData); // Call the custom hook
      if (response) {
        toast.success("Good Luck!!!");
        navigate("/game");
      } else {
        toast.error("Failed to create a game session.");
        return;
      }
    } catch (error) {
      console.error("Error starting game session:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div
      className="flex flex-row w-screen h-screen border-2 justify-evenly bg-cover bg-center"
      style={{
        backgroundImage: `url('/background-elements/index-bg.png')`,
      }}
    >
      <div className="flex flex-col items-center align-middle justify-start pt-32 space-y-16">
        <Banner />

        <div className="space-y-12">
          <button
            className="text-3xl p-5 border-2 border-black rounded-full transition-all duration-300 nosifer-regular hover:bg-black hover:text-white hover:border-yellow-200"
            onClick={startGame}
          >
            Start Game
          </button>

          <ButtonGroup /> 
        </div>
      </div>
    </div>
  );
}
