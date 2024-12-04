import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Index.jsx";
import Login from "./pages/Authentication/Login.jsx";
import Register from "./pages/Authentication/Register.jsx";
import Stats from "./pages/Stats.jsx";
// import Settings from "./pages/Settings.jsx";
import LeaderBoard from "./pages/LeaderBoard.jsx";
import Game from "./pages/GameArea/Game.jsx";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  // const { audioRef, volume, setVolume } = useGlobalAudio();

  // const location = useLocation();

  // useEffect(() => {
  //   const restrictedRoutes = ["/login", "/register"];
  //   if (restrictedRoutes.includes(location.pathname)) {
  //     if (audioRef.current) {
  //       audioRef.current.pause();
  //     }
  //   } else if (isPlaying && audioRef.current) {
  //     audioRef.current
  //       .play()
  //       .catch((err) => console.log("Playback error:", err));
  //   }
  // }, [location.pathname, isPlaying, audioRef]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route
          path="/"
          element={<HomePage />}
          // isPlaying={isPlaying}
          // audioRef={audioRef}
          // togglePlay={togglePlay}
        />
        <Route path="/stats" element={<Stats />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route
          path="/game"
          element={<Game 
            // isPlaying={isPlaying} 
            // togglePlay={togglePlay} 
            />}
        />
      </Route>
    </Routes>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;
