import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./Pages/home";
import Create from "./Pages/create";
import Edit from "./Pages/edit";
import View from "./Pages/view";
import Login from "./Pages/login";
import PrivateRoutes from "./utils/PrivateRoutes";
import http from "./http";

function App() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const isLogged = !!token; //token is converted to boolean value

  const logoutUser = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      http
        .post("/logout", null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          localStorage.removeItem("token");
          navigate("/login");
        });
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/"} className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/create"} className="nav-link">
              Create
            </Link>
          </li>

          {isLogged && (
            <li className="nav-item">
              <Link to={"/list"} className="nav-link">
                List
              </Link>
            </li>
          )}

          {!isLogged ? (
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
          ) : (
            <li className="nav-item">
              <Link onClick={logoutUser} className="nav-link">
                Logout
              </Link>
            </li>
          )}
        </div>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<Create />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/list" element={<Home />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/view/:id" element={<View />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
