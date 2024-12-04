import { logout } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    console.log("Looeg Out");
    
    navigate("/login");
  };

  return handleLogout;
};
