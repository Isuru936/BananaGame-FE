import { useState } from "react";
import { setupAxiosInstance } from "../api/setupAxiosInstance"; // Your custom axios instance setup
import { useLogout } from "../hooks/useLogout"; // Your custom logout hook
import { toast } from "react-toastify";

export const useGameSessions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const logout = useLogout();
  const axiosInstance = setupAxiosInstance(logout);

  const startSession = async (sessionData) => {
    try {
      console.log("Session Data:", sessionData);

      const response = await axiosInstance.post("/start-session", sessionData);

      console.log("New Session Created:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };

  const endSession = async (sessionData) => {
    try {
      const response = await axiosInstance.put("/end-session", sessionData);

      if (response.data.isFailure) {
        console.log(response.data.error.description);
        toast.error(response.data.error.description);
        return;
      }

      console.log("Session ended:", sessionData);
    } catch (error) {
      setError(error);
    }
  };

  const getQuestion = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/question");
      console.log(response);
      return response.data;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, startSession, endSession, getQuestion };
};
