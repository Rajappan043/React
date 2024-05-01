// ProcessClaim.js

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./viewClaims/ProcessClaim.css";
const ProcessClaim = () => {
  const [memberName, setMemberName] = useState("");
  const [insurancePlan, setInsurancePlan] = useState("");
  const [claimDate, setClaimDate] = useState("");
  const [claimAmount, setClaimAmount] = useState("");
  const [insuranceAmount, setInsuranceAmount] = useState("");
  const [status, setStatus] = useState("");
  const [claimId, setClaimId] = useState("");
  const [userID, setuserId] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  // const role = localStorage.getItem("role");

  useEffect(() => {
    if (search !== "") {
      fetchData();
    }
  }, [search]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/claims/${search}`
      );
      const data = response.data;
      setuserId(data.claims.memberId);
      setMemberName(data.claims.name);
      setInsurancePlan(data.claims.insurancePlan);
      setClaimDate(data.claims.claimDate);
      setClaimAmount(data.claims.claimAmount);
      setInsuranceAmount(data.claims.insuranceamount);
      setClaimId(data.claims.id);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error fetching data. Please try again later.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (search === "") {
      alert("Please enter a member ID");
      return;
    }

    try {
      await axios.put(`http://localhost:3001/claim/update/${claimId}`, {
        status: status,
        id: userID,
        date: claimDate,
      });

      navigate("/allClaim");
    } catch (error) {
      console.error("Error updating claim:", error);
      alert(error);
    }
  };

  // if (role === "patient" || role === "admin") {
  //   alert("Unauthorized access");
  //   navigate("/");
  //   return null;
  // }

  return (
    <div className="container">
      <div className="process-claim">
        <h4>Process Claim</h4>

        <section className="search-bar">
          <form
            className="d-flex justify-content-center col-md-3 mx-auto mt-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSearch(e.target.elements.search.value);
            }}
          >
            <input
              className="search"
              type="number"
              placeholder="Enter claim ID... 🔍"
              name="search"
            />
          </form>
        </section>

        <section className="row g-3 p-4 mt-2">
          <div className="col-md-6 mb-2">
            <label htmlFor="name" className="form-label">
              Member Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={memberName}
              disabled
            />
          </div>

          <div className="col-md-6 mb-2">
            <label htmlFor="planType" className="form-label">
              Insurance Type
            </label>
            <input
              type="text"
              className="form-control"
              id="planType"
              value={insurancePlan}
              disabled
            />
          </div>

          <div className="col-md-6 mb-2">
            <label htmlFor="date" className="form-label">
              Request Date
            </label>
            <input
              type="text"
              className="form-control"
              id="date"
              value={claimDate}
              disabled
            />
          </div>

          <div className="col-md-6 mb-2">
            <label htmlFor="amount" className="form-label">
              Claim Amount
            </label>
            <input
              type="number"
              className="form-control"
              id="amount"
              value={claimAmount}
              disabled
            />
          </div>

          <div className="col-md-6 mb-2">
            <label htmlFor="insuredAmount" className="form-label">
              Insured Amount
            </label>
            <input
              type="number"
              className="form-control"
              id="insuredAmount"
              value={insuranceAmount}
              disabled
            />
          </div>

          <form className="col-md-6 mb-2" onSubmit={handleSubmit}>
            <label htmlFor="status" className="form-label">
              Process Response
            </label>
            <select
              id="status"
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="approved">Approve</option>
              <option value="rejected">Reject</option>
            </select>
            <div className="btn-submit">
              <button type="submit" className="btn btn-success mt-4">
                Submit
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ProcessClaim;
