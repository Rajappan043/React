import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const registerUser = async (e) => {
    e.preventDefault();
    const newUser = { name, email, password, role: "patient" };

    try {
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (data.status) {
        alert("Registration successful. Please log in.");
        navigate("/");
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="register">
      <section className="align-center">
        <div className="row">
          <div className="col-md-10 mx-auto rounded shadow bg-white">
            <div className="row">
              <div className="col-mid-6">
                <div className="m-5">
                  <h3 className="text-center">Register Page</h3>
                </div>

                <form className="m-5">
                  <div className="mb-3">
                    <label className="form-label" htmlFor="name">
                      Name
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="form-control"
                      type="email"
                      id="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                    <div className="input-group">
                      <input
                        className="form-control"
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        className="pass-button"
                        type="button"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="form-control btn btn-success mt-3 shadow"
                      onClick={registerUser}
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>

              <h6 className="text-center"style={{marginTop:"-10px",paddingBottom:"20px"}}>
                Already have an account?{" "}
                <Link to="/" className="text-primary signUp px-2">
                  Log In
                </Link>
              </h6>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
