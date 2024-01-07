import React, { useState } from "react";
import http from "../http";

const Forgot = () => {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const resendLink = (e) => {
    e.preventDefault();
    if (validateForm()) {
      http.post("/forgot-password", inputs).then((res) => {
        console.log(res);
      });
    }
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!inputs.email || !inputs.email.trim()) {
      validationErrors.email = "Email is required";
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  return (
    <div className="row">
      <div className="col-sm-6">
        <div className="card p-4">
          <label>Email : </label>
          <input
            type="email"
            name="email"
            className="form-control mb-2"
            value={inputs.email}
            onChange={handleChange}
          />
          {errors.email && <span className="text-danger">{errors.email}</span>}
          <button
            type="submit"
            className="btn btn-info mt-2"
            onClick={resendLink}
          >
            Send link
          </button>
        </div>
      </div>
    </div>
  );
};
export default Forgot;
