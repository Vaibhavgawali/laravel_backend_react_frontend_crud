import React from "react";
import http from "../http";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = () => {
    http.get("/users").then((res) => {
      setUsers(res.data.users);
    });
  };

  const deleteUser = (id) => {
    http.delete("/users/" + id).then((res) => {
      fetchAllUsers();
    });
  };

  return (
    <div>
      <h1>Users Listing...</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Sno.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => {
            return (
              <tr key={i}>
                <td>{++i}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Link
                    to={{ pathname: "/edit/" + user.id }}
                    className="btn btn-info"
                  >
                    Edit
                  </Link>
                  <Link
                    className="btn btn-secondary"
                    to={{ pathname: "/view/" + user.id }}
                  >
                    View
                  </Link>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      deleteUser(user.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default Home;
