import { useState } from "react";
import baseUrl from "../utils/axios";

const useSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const signUp = async (body) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await baseUrl.post("/auth/register", body);
      setSuccess({ message: response.data.message });
    } catch (err) {
      setSuccess(null);
      setError({ message: err.message });
      console.log("register Error ===>", err);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, signUp, success };
};

export default useSignUp;
