import { useNavigate } from "react-router-dom";

const GoHome = () => {
  const navigation = useNavigate();
  return navigation("/");
};

export default GoHome;
