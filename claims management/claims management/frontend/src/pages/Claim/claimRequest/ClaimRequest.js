import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Claim.css";

const ClaimRequest = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [claimDate, setClaimDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [claimAmount, setClaimAmount] = useState("");
  const [memberId, setMemberId] = useState(userId);
  const [firstName, setFirstName] = useState("");
  const [insurancePlan, setInsurancePlan] = useState("");
  const [insuranceAmount, setInsuranceAmount] = useState("");
  const [maxClaimAmount, setMaxClaimAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (memberId) {
      fetchData();
    } else {
      clearData();
    }
  }, [memberId]);

  const clearData = () => {
    setFirstName("");
    setInsurancePlan("");
    setInsuranceAmount("");
    setMaxClaimAmount("");
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/user/${memberId}`
      );

      if (response.data.status) {
        const userData = response.data.user;

        setFirstName(userData.firstName);
        setInsurancePlan(userData.insurancePlan);
        setInsuranceAmount(userData.insuranceamount);
        setMaxClaimAmount(userData.maxClaimableAmount);
      } else {
        alert("unauthenticated");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setErrorMessage(
        "Error fetching user data. Please enter a valid member ID."
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const claimAmountInt = parseInt(claimAmount);
      const insuranceAmountInt = parseInt(insuranceAmount);
      const maxClaimAmountInt = parseInt(maxClaimAmount);
      if (claimAmountInt > maxClaimAmountInt) {
        setErrorMessage("Claim amount exceeds maximum claimable amount.");
        return;
      }
      const remainingClaimAmount = insuranceAmountInt - claimAmountInt;
      const maxclaimamount = claimAmountInt * (80 / 100);
      if (remainingClaimAmount < 0) {
        setErrorMessage("insufficient claim amount.");
        return;
      }
      const response = await axios.post("http://localhost:3001/claim/create", {
        claimDate,
        claimAmount,
        memberId,
        firstName,
        insurancePlan,
        insuranceAmount,
        maxClaimAmount,
      });

      if (response.data.status) {
        const respons = await axios.put(
          `http://localhost:3001/user/${userId}`,
          {
            insuranceamount: remainingClaimAmount,
            maxClaimableAmount: maxclaimamount,
          }
        );
        if (respons.data.status) {
          alert("Claim submitted successfully");
          navigate("/claim");
        }
      } else {
        alert(response.message);
        navigate("/profile");
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      alert(error);
      console.error("Error creating claim:", error);
      setErrorMessage("Error creating claim. Please try again later.");
    }
  };

  return (
    <div className="container">
      <div className="process-claim">
        <h4>New Claim Request</h4>
        {/* <hr className="bg-success border-2 border-top border-success" /> */}
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}
        <form onSubmit={handleSubmit} className="claim-form">
          <label htmlFor="claimDate" className="form-label">
            Claim Date
          </label>
          <input
            type="date"
            className="form-input"
            id="claimDate"
            value={claimDate}
            onChange={(e) => setClaimDate(e.target.value)}
          />
          <label htmlFor="claimAmount" className="form-label">
            Claim Amount
          </label>
          <input
            type="number"
            className="form-input"
            id="claimAmount"
            value={claimAmount}
            onChange={(e) => setClaimAmount(e.target.value)}
          />

          <label htmlFor="memberId" className="form-label">
            Member ID
          </label>
          <input
            type="text"
            className="form-input"
            id="memberId"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            disabled
          />

          <label htmlFor="firstName" className="form-label">
            Member Name
          </label>
          <input
            type="text"
            className="form-input"
            id="firstName"
            value={firstName}
            disabled
          />

          <label htmlFor="insurancePlan" className="form-label">
            Insurance Plan
          </label>
          <input
            type="text"
            className="form-input"
            id="insurancePlan"
            value={insurancePlan}
            disabled
          />

          <label htmlFor="insuranceAmount" className="form-label">
            Insured Amount
          </label>
          <input
            type="text"
            className="form-input"
            id="insuranceAmount"
            value={insuranceAmount}
            disabled
          />

          <label htmlFor="maxClaimAmount" className="form-label">
            Max Claimable Amount
          </label>
          <input
            type="text"
            className="form-input"
            id="maxClaimAmount"
            value={maxClaimAmount}
            disabled
          />

          <button type="submit" className="btn btn-success btn-lg px-4 shadow" style={{marginBottom:"15px",marginTop:"15px"}}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClaimRequest;
