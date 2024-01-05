import React from "react";
import http from "../http";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchAllUsers(currentPage, search);
  }, [currentPage, search]);

  const token = localStorage.getItem("token");

  const fetchAllUsers = (page = 1, search) => {
    console.log("Fetching users with page:", page, "and search:", search);
    http
      .get(`/users?page=${page}&search=${search}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsers(res.data.users.data);
        setCurrentPage(res.data.users.current_page);
        setLastPage(res.data.users.last_page);
      });
  };

  const handlePageChange = (page) => {
    console.log("Page changed to:", page);
    fetchAllUsers(page);
  };

  const handleSearch = () => {
    console.log("Page search : " + currentPage);
    setCurrentPage(1);
    fetchAllUsers(1, search);
  };

  const maxVisiblePages = 5;
  const renderPageLinks = () => {
    const startPage = Math.max(1, currentPage - maxVisiblePages);
    const endPage = Math.min(lastPage, currentPage + maxVisiblePages);

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => (
      <li
        key={startPage + index}
        className={`page-item ${
          currentPage === startPage + index ? "active" : ""
        }`}
      >
        <button
          className={`page-link ${
            currentPage === startPage + index ? "active" : ""
          }`}
          onClick={() => handlePageChange(startPage + index)}
        >
          {startPage + index}
        </button>
      </li>
    ));
  };

  const deleteUser = (id) => {
    const confirmDelete = window.confirm("Are sure want to delete user ?");
    if (confirmDelete) {
      http
        .delete("/users/" + id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          fetchAllUsers();
        });
    }
  };

  return (
    <div>
      <h1>Users Listing...</h1>
      <div
        className="d-flex justify-content-end"
        style={{ marginBottom: "2rem", marginLeft: "60%" }}
      >
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {/* <button
        className="btn btn-outline-success my-2 my-sm-0"
        name="search"
        type="button"
        onClick={handleSearch}
      >
        Search
      </button> */}
      </div>

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
          {users.map((user, index) => {
            const currentUserIndex = (currentPage - 1) * 10 + index + 1;
            return (
              <tr key={user.id}>
                <td>{currentUserIndex}</td>
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
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              href="#"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
          </li>
          {renderPageLinks()}
          <li
            className={`page-item ${
              currentPage === lastPage ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              href="#"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default UserList;
