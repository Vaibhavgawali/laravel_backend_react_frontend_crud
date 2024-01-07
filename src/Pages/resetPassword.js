import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = () => {
    if (validateForm()) {
    }
  };

  const validateForm = () => {
    const validationErrors = {};

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

    if (inputs.confirm_password !== inputs.password) {
      validationErrors.confirm_password = "Confirm password does not match";
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  return (
    <div className="row">
      <div className="col-sm-6">
        <div className="card p-4">
          <label>New Password :</label>
          <input
            type="password"
            name="password"
            className="form-control mb-2"
            value={inputs.email}
            onChange={handleChange}
          />
          {errors.password && (
            <span className="text-danger">{errors.password}</span>
          )}
          <label>Confirm Password :</label>
          <input
            type="password"
            name="confirm_password"
            value={inputs.confirm_password}
            onChange={handleChange}
            className="form-control mb-2"
          />
          {errors.confirm_password && (
            <span className="text-danger">{errors.confirm_password}</span>
          )}
          <button
            type="submit"
            className="btn btn-info mt-2"
            onClick={handleSubmit}
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
};
export default ResetPassword;
