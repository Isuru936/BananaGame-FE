import axios from "axios";
import { toast } from "react-toastify";

// Function to retrieve the auth token from localStorage
const getAuthToken = () => {
  const storedData = localStorage.getItem("token");
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    return parsedData.token;
  }
  return null;
};

export const setupAxiosInstance = (logoutHandler) => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:5189/api",
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
      "Content-Type": "application/json",
    },
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      console.log("Response received:", response);
      return response;
    },
    (error) => {
      console.log("Error occurredasda:", error);

      if (error.code === "ERR_NETWORK") {
        console.log("Token expired or invalid. Logging out user.");
        toast.info("Session Expired. Logging you out")
        if (logoutHandler) {
          logoutHandler(); 
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
