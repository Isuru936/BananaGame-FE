import Banner from "../components/Banner.jsx";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} from "../../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const [loginData, setLoginData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      dispatch(loginStart());

      const res = await axios.post(
        "https://bananagame-be-cqaffchrgjegajda.centralus-01.azurewebsites.net/authentication/signin",
        loginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.isSuccess) {
        dispatch(logout());
        dispatch(
          loginSuccess({
            token: res.data.value.token,
            userName: res.data.value.Id,
          })
        );

        localStorage.setItem("token", res.data.value);
        navigate("/");
      } else {
        const failureMessage =
          res.data.error.description || "Login failed. Please try again.";
        dispatch(loginFailure(failureMessage));
        toast.error(failureMessage);
      }
    } catch (err) {
      toast.error("Failed to connect to the server. Please try again later.");
      dispatch(loginFailure(err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 h-screen flex lg:align-bottom justify-center sm:overflow-hidden overflow-scroll">
      <div className="flex flex-col sm:flex-row align-middle justify-center">
        <div className="flex flex-col align-middle justify-center">
          <Banner />

          <div>
            <form className="flex flex-col space-y-4" onSubmit={handleLogin}>
              <div className="flex items-center border border-blue-800 rounded-md max-w-xs p-1">
                <img
                  src="/icons/marketeq--user.png"
                  alt=""
                  className="w-8 h-8 ml-2"
                />
                <input
                  type="text"
                  placeholder="username"
                  onChange={handleLoginChange}
                  name="username"
                  id="username"
                  className="p-2 pl-8 w-full rounded-md outline-none"
                />
              </div>

              <div className="flex items-center border border-blue-800 rounded-md max-w-xs p-1">
                <img
                  src="/icons/login-password.png"
                  alt=""
                  className="w-8 h-8 ml-2"
                />
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  onChange={handleLoginChange}
                  className="p-2 pl-8 w-full rounded-md outline-none"
                />
              </div>

              <div className="text-sm font-medium text-gray-500 ">
                No Signed In yet?{" "}
                <span
                  className="text-blue-700 hover:underline dark:text-blue-500 cursor-pointer"
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  Create an Account
                </span>
              </div>
              <button
                type="submit"
                className="text-white p-2 rounded-full mogra-regular border border-black border-3 flex justify-center"
                style={{
                  backgroundImage: "url('/icons/fxemoji--banana.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                {loading ? <img src="/icons/line-md--loading-loop-white.png" className="animate-spin" style={{width: "24px"}}/> : "Login"}
              </button>
            </form>
          </div>
        </div>
        <div className="">
          <img src="/images/login-overlay.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Login;
