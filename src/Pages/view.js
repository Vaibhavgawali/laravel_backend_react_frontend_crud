import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import http from "../http";

const View = () => {
  const [inputs, setInputs] = useState({});

  const { id } = useParams();
  useEffect(() => {
    fetchUser(id);
  }, []);

  const fetchUser = (id) => {
    const token = localStorage.getItem("token");
    http
      .get("/users/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setInputs({
          name: res.data.user.name,
          email: res.data.user.email,
        });
      });
  };

  return (
    <div>
      <h1>View User</h1>
      <div className="row">
        <div className="col-sm-6">
          <div className="card p-4">
            <h5>Name : {inputs.name}</h5>
            <h5>Email : {inputs.email}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
