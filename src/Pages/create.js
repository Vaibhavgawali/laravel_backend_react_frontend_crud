import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../http";

const Create = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const submitForm = () => {
    http.post("/users", inputs).then((res) => {
      navigate("/");
    });
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

            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control mb-2"
              value={inputs.email}
              onChange={handleChange}
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control mb-2"
              value={inputs.password}
              onChange={handleChange}
            />

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
