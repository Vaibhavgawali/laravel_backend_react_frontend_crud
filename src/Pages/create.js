import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../http";

const Create = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (validateForm()) {
      http
        .post("/register", inputs)
        .then((res) => {
          navigate("/login");
        })
        .catch((error) => {
          const errors = error.response.data.errors;
          setErrors(errors);
        });
    }
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!inputs.name || !inputs.name.trim()) {
      validationErrors.name = "Name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!inputs.email || !inputs.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!emailRegex.test(inputs.email)) {
      validationErrors.email = "Valid Email is required";
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!inputs.password || !inputs.password.trim()) {
      validationErrors.password = "Password is required";
    } else if (inputs.password.length < 8) {
      validationErrors.password = "Password must be at least 8 characters";
    } else if (!passwordRegex.test(inputs.password)) {
      validationErrors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.";
    }

    if (!inputs.password_confirmation || !inputs.password_confirmation.trim()) {
      validationErrors.password_confirmation = "Confirm Password is required";
    } else if (inputs.password_confirmation !== inputs.password) {
      validationErrors.password_confirmation = "Confirm password do not match";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };
  return (
    <div>
      <h1>New User</h1>
      <div className="row">
        <div className="col-sm-6">
          <div className="card p-4">
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="form-control mb-2"
              value={inputs.name}
              onChange={handleChange}
            />
            {errors.name && <span className="text-danger">{errors.name}</span>}
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

            <label>Confirm Password</label>
            <input
              type="password"
              name="password_confirmation"
              className="form-control mb-2"
              value={inputs.password_confirmation}
              onChange={handleChange}
            />
            {errors.password_confirmation && (
              <span className="text-danger">
                {errors.password_confirmation}
              </span>
            )}

            <button
              type="submit"
              className="btn btn-info mt-2"
              onClick={submitForm}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
