import { useState } from "react";
import baseUrl from "utils/axios";

const useSignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState();

  const signIn = async (body) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await baseUrl.post("/auth/login", body);
      setSuccess({ message: response.data.message });
      return setUser(response.data.data);
    } catch (err) {
      setSuccess(null);
      setError({ message: err.message });
      console.log("signin Error ===>", err);
    } finally {
      return setIsLoading(false);
    }
  };

  return { isLoading, error, signIn, success, user };
};

export default useSignIn;
