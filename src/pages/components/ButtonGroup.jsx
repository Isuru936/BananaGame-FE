import { useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";

function ButtonGroup() {
  const navigate = useNavigate();
  const logout = useLogout();

  const goToLeaderboard = () => {
    navigate("/leaderboard");
  }

  const goToStats = () => {
    navigate("/stats");
  }

  return (
    <div className="flex items-center justify-center space-x-6">
      <img
        className="w-16 h-16 transition-transform duration-300 transform hover:scale-110 hover:brightness-125 hover:sepia hover:hue-rotate-30 hover:saturate-150"
        src="/icons/guidance--user-1.png"
        alt="Guidance Icon"
        onClick={goToStats}
      />
      <img
        className="w-24 h-24 transition-transform duration-300 transform hover:scale-110 hover:brightness-125 hover:sepia hover:hue-rotate-30 hover:saturate-150"
        src="/icons/material-symbols-light--social-leaderboard-outline-rounded.png"
        alt="Leaderboard Icon"
        onClick={goToLeaderboard}
      />
      <img
        className="w-16 h-16 transition-transform duration-300 transform hover:scale-110 hover:brightness-125 hover:sepia hover:hue-rotate-30 hover:saturate-150"
        src="/icons/hugeicons--logout-circle-01.png"
        alt="Settings Icon"
        onClick={logout}
      />
    </div>
  );
}

export default ButtonGroup;
