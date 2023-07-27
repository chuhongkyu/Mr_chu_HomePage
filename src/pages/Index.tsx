import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/home")
  }, []);

  return (
      <div></div>
  );
};

export default Index;
