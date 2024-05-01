import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/UseAuth";
import "./Login.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { navigateAfterLogin } = useAuth();
  const loginCheck = async (e) => {
    e.preventDefault();
    const obj = { email, password };
    try {
      localStorage.clear();
      const response = await fetch("http://localhost:3001/log/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj),
      });

      const data = await response.json();

      if (data.status) {
        localStorage.setItem("token", true);
        navigateAfterLogin();
        alert("Login successful");

        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("role", data.role);
        localStorage.setItem("userId", data.id);
        setCookie("accessToken", data.accessToken, 10);
        if (data.role === "admin") {
          navigate("/admin/dashboard");
        } else if (data.role === "patient") {
          navigate("patient/profile");
        } else if (data.role === "agent") {
          navigate("/agent/allClaim");
        }
      } else {
        alert("Wrong Email or Password!");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const setCookie = (name, value, minutes) => {
    const date = new Date();
    date.setTime(date.getTime() + minutes * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  };

  return (
    <div className="containerlogin">
      <section className="d-flex flex-column  mt-5 pt-5 align-items-center">
        <div className="row">
          <div className="col-md-10 mx-auto rounded shadow bg-white">
            <div className="row">
              <div className="col-mid-6">
                <div className="m-5">
                  <h3 className="text-center">Login Page</h3>
                </div>

                <form className="m-5">
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
                    <input
                      className="form-control"
                      type="password"
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="form-control btn btn-success mt-3 shadow"
                      onClick={loginCheck}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              <h6
                className="text-center"
                style={{ marginTop: "-10px", paddingBottom: "20px" }}
              >
                Don't have an account?{" "}
                <Link to="/register" className="text-primary signUp ">
                  Sign Up
                </Link>
              </h6>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
