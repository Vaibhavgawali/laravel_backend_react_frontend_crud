import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import http from "../http";

const Edit = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});

  const { id } = useParams();
  useEffect(() => {
    http.get("/users/" + id).then((res) => {
      console.log(res.data);
      setInputs({
        name: res.data.user.name,
        email: res.data.user.email,
      });
    });
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const submitForm = () => {
    http.patch("/users/" + id, inputs).then((res) => {
      navigate("/");
    });
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

            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control mb-2"
              value={inputs.email}
              onChange={handleChange}
            />

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
