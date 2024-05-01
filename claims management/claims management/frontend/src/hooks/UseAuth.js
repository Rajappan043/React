import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();
  const navigateAfterLogin = () => {
    const userRole = localStorage.getItem("role");
    const token = localStorage.getItem("token");
    if (token && userRole) {
      if (userRole === "admin") {
        navigate("/admin");
      } else if (userRole === "agent") {
        navigate("/agent");
      } else if (userRole === "patient") {
        navigate("/patient");
      } else {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  };

  return {
    navigateAfterLogin,
  };
};
