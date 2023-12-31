import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../http";

const Login = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const authenticateUser = (e) => {
    e.preventDefault();
    if (validateForm()) {
      http.post("/login", inputs).then((res) => {
        const token = res.data.token;
        localStorage.setItem("token", token);
        navigate("/list");
      });
    }
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!inputs.email || !inputs.email.trim()) {
      validationErrors.email = "Email is required";
    }
    if (!inputs.password || !inputs.password.trim()) {
      validationErrors.password = "Password is required";
    }
    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  return (
    <div>
      <h1>Login User</h1>
      <div className="row">
        <div className="col-sm-6">
          <div className="card p-4">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control mb-2"
              value={inputs.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control mb-2"
              value={inputs.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}
            <button
              type="submit"
              className="btn btn-info mt-2"
              onClick={authenticateUser}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
