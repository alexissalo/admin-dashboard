import Navbar from "../components/Navbar";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

function Introduction() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return (
    <div className="dashboard-layout">
      <h1>aaa</h1>
    </div>
  );
}

export default Introduction;
