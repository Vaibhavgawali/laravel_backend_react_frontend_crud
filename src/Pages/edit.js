import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import http from "../http";

const Edit = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});

  const { id } = useParams();
  useEffect(() => {
    fetchUser(id);
  }, []);

  const token = localStorage.getItem("token");

  const fetchUser = (id) => {
    http
      .get("/users/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setInputs({
          name: res.data.user.name,
          email: res.data.user.email,
        });
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (validateForm()) {
      http
        .patch("/users/" + id, inputs, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          navigate("/list");
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
    // set errors if errors
    setErrors(validationErrors);
    // returns true if not errors
    return Object.keys(validationErrors).length === 0;
  };

  return (
    <div>
      <h1>Edit User</h1>
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
            <button
              type="submit"
              className="btn btn-info mt-2"
              onClick={submitForm}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
