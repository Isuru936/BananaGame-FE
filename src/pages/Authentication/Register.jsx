import Banner from "../components/Banner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);

      const res = await fetch("https://bananagame-be-cqaffchrgjegajda.centralus-01.azurewebsites.net/authentication/authentication/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.error.description) {
        toast.error(data.error.description);
        return;
      }

      if (data.isSuccess) {
        console.log("Success:", data.value);
        toast.success(data.value || "Signed up successfully!");
        navigate("/login");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="p-10 h-screen flex lg:align-bottom justify-center sm:overflow-hidden overflow-scroll">
      <div className="flex flex-col sm:flex-row align-middle justify-center">
        <div className="flex flex-col align-middle justify-center">
          <Banner />
          <div>
            <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
              <div className="flex items-center border border-blue-800 rounded-md max-w-xs p-1">
                <img
                  src="/icons/marketeq--user.png"
                  alt=""
                  className="w-8 h-8 ml-2"
                />
                <input
                  type="text"
                  placeholder="Username"
                  onChange={handleChange}
                  name="username"
                  id="username"
                  className="p-2 pl-8 w-full rounded-md outline-none"
                />
              </div>

              <div className="flex items-center border border-blue-800 rounded-md max-w-xs p-1">
                <img
                  src="/icons/login-email.png"
                  alt=""
                  className="w-8 h-8 ml-2"
                />
                <input
                  type="email"
                  placeholder="Email"
                  onChange={handleChange}
                  name="email"
                  id="email"
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
                  placeholder="Password"
                  onChange={handleChange}
                  name="password"
                  id="password"
                  className="p-2 pl-8 w-full rounded-md outline-none"
                />
              </div>

              <div className="text-sm font-medium text-gray-500 ">
                Already registered?{" "}
                <span
                  className="text-blue-700 hover:underline dark:text-blue-500 cursor-pointer"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login here
                </span>
              </div>

              <button
                type="submit"
                className="text-white p-2 rounded-full mogra-regular border border-black border-3"
                style={{
                  backgroundImage: "url('/icons/fxemoji--banana.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                Register
              </button>
            </form>
          </div>
        </div>
        <div>
          <img
            src="/images/The_Minions_Language_Translator_Game-removebg-preview.png"
            alt=""
            className="w-[500px]"
          />
        </div>
      </div>
    </div>
  );
}

export default Register;
