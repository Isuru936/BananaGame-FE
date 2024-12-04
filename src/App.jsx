import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Index.jsx";
import Login from "./pages/Authentication/Login.jsx";
import Register from "./pages/Authentication/Register.jsx";
import Stats from "./pages/Stats.jsx";
import LeaderBoard from "./pages/LeaderBoard.jsx";
import Game from "./pages/GameArea/Game.jsx";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/game" element={<Game />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
