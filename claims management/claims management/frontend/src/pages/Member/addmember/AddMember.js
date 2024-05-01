import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddMember.css";

const AddMember = () => {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  if (role === "user") {
    alert("Unauthorized access");
    navigate("/newrequest");
  }

  const [memberData, setMemberData] = useState({
    name: "",
    dob: "",
    city: "",
    state: "",
    emailId: "",
    contactNo: "",
    username: "",
    password: "",
    planId: "", // Store plan name instead of index
    insuredAmount: "",
  });

  const insuranceTypes = [
    "",
    "Health Insurance Premium for Self, Spouse, Children",
    "Preventive Health Check-up for Self, Children, Spouse",
    "Total Expense for Self, Children, and Spouse",
    "Health Insurance Premium for Senior Citizen Parents",
    "Preventive Health Check Up for Parents (Senior Citizens)",
    "Total For Parents (Senior Citizens)",
  ];

  const insuranceAmounts = ["", 30000, 15000, 45000, 52000, 10000, 62000];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "planId") {
      const planIndex = parseInt(value);
      setMemberData({
        ...memberData,
        [name]: insuranceTypes[planIndex],
        insuredAmount: insuranceAmounts[planIndex],
      });
    } else {
      setMemberData({ ...memberData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/create", {
        name: memberData.name,
        email: memberData.emailId,
        password: memberData.password,
        DOB: memberData.dob,
        address: `${memberData.city}, ${memberData.state}`,
        gender: "Male",
        insuranceplan: memberData.planId,
        insuranceamount: memberData.insuredAmount,
        phoneNo: memberData.contactNo,
        role: "patient",
      });

      if (response.data.status) {
        alert("Member added successfully");
        navigate("/members");
      } else {
        alert("Error adding member: " + response.data.message);
      }
    } catch (error) {
      alert("Error adding member: " + error.message);
    }
  };

  return (
    <div className="container">
      <form className="addmember-form" onSubmit={handleSubmit}>
        <h4>New Member Registration</h4>
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={memberData.name}
          onChange={handleChange}
        />

        <label htmlFor="dob" className="form-label">
          Date of Birth
        </label>
        <input
          type="date"
          className="form-control"
          id="dob"
          name="dob"
          value={memberData.dob}
          onChange={handleChange}
        />

        <label htmlFor="city" className="form-label">
          City
        </label>
        <input
          type="text"
          className="form-control"
          id="city"
          name="city"
          value={memberData.city}
          onChange={handleChange}
        />

        <label htmlFor="state" className="form-label">
          State
        </label>
        <input
          type="text"
          className="form-control"
          id="state"
          name="state"
          value={memberData.state}
          onChange={handleChange}
        />

        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="emailId"
          value={memberData.emailId}
          onChange={handleChange}
        />

        <label htmlFor="contact" className="form-label">
          Contact
        </label>
        <input
          type="number"
          className="form-control"
          id="contact"
          name="contactNo"
          value={memberData.contactNo}
          onChange={handleChange}
        />

        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          id="username"
          name="username"
          value={memberData.username}
          onChange={handleChange}
        />

        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={memberData.password}
          onChange={handleChange}
        />

        <label htmlFor="plan" className="form-label">
          Plan Type
        </label>
        <select
          id="plan"
          className="form-select"
          name="planId"
          value={memberData.planId}
          onChange={handleChange}
        >
          {insuranceTypes.map((type, index) => (
            <option key={index} value={index}>
              {type}
            </option>
          ))}
        </select>

        <label htmlFor="insuredAmount" className="form-label">
          Insured Amount
        </label>

        {/* <span className="input-group-text" id="inputGroupPrepend">
          ₹
        </span> */}
        <select
          className="form-select"
          name="insuredAmount"
          value={memberData.insuredAmount}
          onChange={handleChange}
        >
          {insuranceAmounts.map((amount, index) => (
            <option key={index} value={amount}>
              {amount}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="btn btn-success btn-lg shadow px-4 mt-20  "
          style={{ marginTop: "20px" }}
        >
          Add Member
        </button>
      </form>
    </div>
  );
};

export default AddMember;
