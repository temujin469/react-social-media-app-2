import { getCurrentUser } from "api/users";
import { useQuery } from "react-query";
import useToken from "./useToken";
const useUser = () => {
  const token = useToken();
  const { data, isLoading, error, isError } = useQuery(["user", token], () =>
    getCurrentUser(token)
  );
  return { isLoading, error, isError, data };
};

export default useUser;
