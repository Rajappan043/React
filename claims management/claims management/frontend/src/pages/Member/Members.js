import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Member.css"
const Members = () => {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    if (role === 'user') {
      alert('unauthorized access');
      navigate('/newRequest');
    }
  }, [role, navigate]);

  const [members, setMembers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/users");
        if (response.data.status) {
          setMembers(response.data.users);
        } else {
          setError("Error fetching members: " + response.data.message);
        }
      } catch (error) {
        setError("Error fetching members: " + error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      {error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        <div className="all-members">
          <h4>All Members List</h4>
          <section className="py-3 px-2">
            <table className="table table -striped shadow text-center">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Member Id</th>
                  <th scope="col">Member Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Insurance Plan</th>
                  <th scope="col">Insurance Amount</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.id}>
                    <td>{member.id}</td>
                    <td>{member.firstName}</td>
                    <td>{member.email}</td>
                    <td>{member.phoneNo}</td>
                    <td>{member.insurancePlan}</td>
                    <td>{member.insuranceamount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      )}
    </div>
  );
};

export default Members;
