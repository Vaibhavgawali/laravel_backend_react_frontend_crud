import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./Pages/home";
import UserList from "./Pages/userList";
import Register from "./Pages/register";
import Edit from "./Pages/edit";
import View from "./Pages/view";
import Login from "./Pages/login";
import Forgot from "./Pages/forgot";
import PrivateRoutes from "./utils/PrivateRoutes";
import http from "./http";
import ResetPasswordEmail from "./Pages/resetPasswordEmail";
import ResetPassword from "./Pages/resetPassword";

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
            <Link to={"/register"} className="nav-link">
              Register
            </Link>
          </li>

          {isLogged && (
            <li className="nav-item">
              <Link to={"/list"} className="nav-link">
                Users List
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
            <>
              <li className="nav-item">
                <Link onClick={logoutUser} className="nav-link">
                  Logout
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/reset-password/"} className="nav-link">
                  Reset Password
                </Link>
              </li>
            </>
          )}
        </div>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<Forgot />} />
          <Route path="/password-reset/:id" element={<ResetPasswordEmail />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/list" element={<UserList />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/view/:id" element={<View />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
