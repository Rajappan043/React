import React, { useReducer } from "react";
import './SignUp.css';
const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirmpassword: "",
  errors:{}
};

const reducer = (state, action) => {
  switch (action.type) {
    case "Update":
      return { ...state, [action.name]: action.value };
    case "validate":
      let errors = {};
      if (!/^[a-zA-Z]{1,50}$/.test(state.firstname)) {
        errors.firstname = "Invalid Firstname given";
      }
      if (!/^[a-zA-Z.{1}+\s{1}]{1,4}$/.test(state.lastname)) {
        errors.lastname = "Invalid lastname given";
      }
      if (
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(state.email)
      ) {
        errors.email = "Invalid email format";
      }
      if (!state.password) {
        errors.password = "Password is required";
      } else if (state.password.length < 8) {
        errors.password = "Password must be at least 8 characters long";
      }
      if (state.password !== state.confirmpassword) {
        errors.confirmpassword = "Passwords do not match";
      }
      return {
        ...state,
        errors,
      };
    default:
      return state;
  }
};

function SignUp() {
  const [state, dispatch] = useReducer(reducer,initialState);

  const handleChange = (e) => {
    dispatch({
      type: "Update",
      name: e.target.name,
      value: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = reducer(state, { type: "validate" }).errors;
    if (Object.keys(errors).length === 0) {
      console.log(JSON.stringify(state));
    }
    dispatch({
      type: "validate",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <p>Create your account </p>
        <input
          id="firstname"
          name="firstname"
          type="text"
          value={state.firstname}
          placeholder="Firstname"
          autoComplete="off"
          onChange={handleChange}
          required
        />
        {state.errors.firstname && <p>{state.errors.firstname}</p>}
        <br />
        <input
          id="lastname"
          name="lastname"
          type="text"
          value={state.lastname}
          placeholder="Lastname"
          autoComplete="off"
          onChange={handleChange}
          required
        />
        {state.errors.lastname && <p>{state.errors.lastname}</p>}
        <br />
        <input
          id="email-id"
          name="email"
          type="email"
          value={state.email}
          autoComplete="off"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        {state.errors.email && <p>{state.errors.email}</p>}
        <br />
        <input
          id="Password-id"
          name="password"
          type="password"
          value={state.password}
          autoComplete="off"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <br />
        {state.errors.password && <p>{state.errors.password}</p>}
        <input
          id="confirm-password"
          name="confirmpassword"
          type="password"
          value={state.confirmpassword}
          autoComplete="off"
          placeholder="Confirm Password"
          onChange={handleChange}
          required
        />
        {state.errors.confirmpassword && <p>{state.errors.confirmpassword}</p>}
        <br />
        <button>Register</button>
      </form>
    </div>
  );
}

export default SignUp;
