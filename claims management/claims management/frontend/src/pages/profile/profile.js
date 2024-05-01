import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./profile.css";

const UserProfile = () => {
  const id = localStorage.getItem("userId");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [insuranceTypes, setInsuranceTypes] = useState([
    "",
    "Health Insurance Premium for Self, Spouse, Children",
    "Preventive Health Check-up for Self, Children, Spouse",
    "Total Expense for Self, Children, and Spouse",
    "Health Insurance Premium for Senior Citizen Parents",
    "Preventive Health Check Up for Parents (Senior Citizens)",
    "Total For Parents (Senior Citizens)",
  ]);
  const [insuranceAmounts, setInsuranceAmounts] = useState([
    "",
    30000,
    15000,
    45000,
    52000,
    10000,
    62000,
  ]);
  const [maxClaimAmounts, setMaxClaimAmounts] = useState([
    "",
    25000,
    5000,
    25000,
    50000,
    5000,
    5000,
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/user/${id}`);
        if (response.status === 200) {
          setUserData(response.data.user);
          setEditedData(response.data.user);
          setLoading(false);
        } else {
          throw new Error("Failed to fetch user profile");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
        setError(error.message);
      }
    };

    fetchUserProfile();
  }, [id]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setEditedData(userData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(`http://localhost:3001/user/${id}`, {
        DOB: editedData.DOB,
        firstName: editedData.firstName,
        lastName: editedData.lastName,
        address: editedData.address,
        phoneNo: editedData.phoneNo,
        insurancePlan: editedData.insurancePlan,
        insuranceamount: editedData.insuranceamount, // Correct the case here to match backend
        maxClaimableAmount: editedData.maxClaimableAmount, // Correct the case here to match backend
      });
      if (response.status === 200) {
        setLoading(false);
        setUserData(editedData);
        setEditing(false);
      } else {
        throw new Error("Failed to update user profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setLoading(false);
      setError(error.message);
    }
  };

  const handleInsuranceTypeChange = (e) => {
    const index = e.target.selectedIndex;
    setEditedData({
      ...editedData,
      insurancePlan: insuranceTypes[index],
      insuranceamount: insuranceAmounts[index],
      maxClaimableAmount: maxClaimAmounts[index],
    });
  };

  return (
    <div className="container">
      <section className="profile-section">
        <h2 style={{textAlign:"center"}}>User Profile</h2>
        {loading ? (
          <p>Loading profile...</p>
        ) : userData ? (
          <div className="profile-box">
            <div
              style={{
                maxHeight: "600px",
                overflowY: "scroll",
                overflowStyle: "none",
                scrollbarWidth: "none",
              }}
            >
              {editing ? (
                <form
                  onSubmit={handleSubmit}
                  className={editing ? "editing" : ""}
                >
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={editedData.firstName}
                      onChange={handleChange}
                      className="form-control"
                      onClick={() => setEditing(true)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={editedData.lastName}
                      onChange={handleChange}
                      className="form-control"
                      onClick={() => setEditing(true)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={editedData.email}
                      onChange={handleChange}
                      className="form-control"
                      onClick={() => setEditing(true)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="dob" className="form-label">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      value={editedData.DOB}
                      onChange={handleChange}
                      className="form-control"
                      onClick={() => setEditing(true)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phoneNo" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      id="phoneNo"
                      name="phoneNo"
                      value={editedData.phoneNo}
                      onChange={handleChange}
                      className="form-control"
                      onClick={() => setEditing(true)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={editedData.address}
                      onChange={handleChange}
                      className="form-control"
                      onClick={() => setEditing(true)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="insuranceType" className="form-label">
                      Insurance Type
                    </label>
                    <select
                      id="insuranceType"
                      name="insuranceType"
                      value={editedData.insurancePlan}
                      onChange={handleInsuranceTypeChange}
                      className="form-control"
                      onClick={() => setEditing(true)}
                    >
                      {insuranceTypes.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Display insurance amount and maximum claim amount */}
                  <p>
                    <strong>Insurance Amount:</strong>{" "}
                    {editedData.insuranceamount}
                  </p>
                  <p>
                    <strong>Maximum Claim Amount:</strong>{" "}
                    {editedData.maxClaimableAmount}
                  </p>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary ms-2 "
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <div className="user-info">
                  <p>
                    <strong>First Name:</strong> {userData.firstName}
                  </p>
                  <p>
                    <strong>Last Name:</strong> {userData.lastName}
                  </p>
                  <p>
                    <strong>Email:</strong> {userData.email}
                  </p>
                  <p>
                    <strong>Date of Birth:</strong> {userData.DOB}
                  </p>
                  <p>
                    <strong>Phone Number:</strong> {userData.phoneNo}
                  </p>
                  <p>
                    <strong>Address:</strong> {userData.address}
                  </p>
                  <p>
                    <strong>Insurance Type:</strong> {userData.insurancePlan}
                  </p>
                  <p>
                    <strong>Insurance Amount:</strong>{" "}
                    {userData.insuranceamount}
                  </p>
                  <p>
                    <strong>Maximum Claim Amount:</strong>{" "}
                    {userData.maxClaimableAmount}
                  </p>
                  <button className="btn btn-primary" onClick={handleEdit} style={{width:"200px"}}>
                    Edit Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <p>{error ? error : "Failed to fetch user profile."}</p>
        )}
      </section>
    </div>
  );
};

export default UserProfile;
