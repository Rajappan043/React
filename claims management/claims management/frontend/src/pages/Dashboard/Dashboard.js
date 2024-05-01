import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const [totalMembers, setTotalMembers] = useState(0);
  const [totalClaims, setTotalClaims] = useState(0);
  const [totalPendingClaims, setTotalPendingClaims] = useState(0);
  const [totalApprovedClaims, setTotalApprovedClaims] = useState(0);
  const [totalRejectedClaims, setTotalRejectedClaims] = useState(0);

  useEffect(() => {
    loadTotalMembers();
  }, []);
  // const role = localStorage.getItem("role");
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (role === "admin") {
  //     alert("unauthorized access");
  //     navigate("/");
  //   }
  // }, [role, navigate]);
  const loadTotalMembers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/count");
      const { member, total, pending, approved, reject } = response.data;
      setTotalMembers(member);
      setTotalClaims(total);
      setTotalPendingClaims(pending);
      setTotalApprovedClaims(approved);
      setTotalRejectedClaims(reject);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="container">
      <div className="info">
        <div className="box box-1">
          <h5>Total Members</h5>
          <h5 className="data">{totalMembers}</h5>
        </div>

        <div className="box box-2">
          <h5>Total Claims</h5>
          <h5 className="data">{totalClaims}</h5>
        </div>

        <div className="box box-3">
          <h5>Rejected Claims</h5>
          <h5 className="data">{totalRejectedClaims}</h5>
        </div>

        <div className="box box-4">
          <h5>Approved Claims</h5>
          <h5 className="data">{totalApprovedClaims}</h5>
        </div>

        <div className="box box-1">
          <h5>Pending Claims</h5>
          <h5 className="data">{totalPendingClaims}</h5>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
