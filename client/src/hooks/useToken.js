import { useSelector } from "react-redux";
const useToken = () => {
  return useSelector((state) => state.token);
};

export default useToken;
