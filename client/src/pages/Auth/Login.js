import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { Helmet } from "react-helmet";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [role, setRole] = useState(3);
  const [selectedUser, setSelectedUser] = useState("");

  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (role == 3) {
        // return new Error("select user-type")
        toast.error("Select the user type");
      } else {
        const res = await axios.post("/api/v1/auth/login", {
          username,
          password,
          role,
        });
        console.log(res.data.user);

        toast.error(!res.data.success && res.data.message);

        console.log(role);

        if (
          // not for admin
          (role == 0 && res.data.user.role == 0) ||
          (role == 1 && res.data.user.role == 1) ||
          res.data.user.role == 2
        ) {
          console.log(res);
          if (res && res.data.success) {
            setAuth({
              ...auth,
              user: res.data.user,
              token: res.data.token,
              role: res.data.user.role,
              name: res.data.user.firstName,
              username: res.data.user.username,
            });
            localStorage.setItem("auth", JSON.stringify(res.data));
            setTimeout(function () {
              navigate("/homepage");
            }, 1000);
            console.log(auth.role);
            toast.success(res.data && res.data.message);
          }
        } else {
          toast.error("Please select the correct User Type");
        }

        console.log("backend " + res.data.user.username, res.data.user.role);
        console.log("frontend " + username, role);
      }
    } catch (error) {
      console.log(error);
      // toast.error(error.message);
    }
  };

  return (
    <div>

<Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content="" />
        <meta name="keywords" content="" />
        <meta name="author" content="" />
        <title>Login - Ticket System </title>
        </Helmet>
      <ToastContainer />
      <div className="wrapper">
        <div className="container main">
          <div className="row">
            <div className="col-md-6 side-image">
              {/*-----Image------*/}
              {/* <img src="images/white.png" alt /> */}
              <div className="text">
                <p>
                  Ticket System <i> AJAY_PRATAP_SINGH</i>
                </p>
              </div>
            </div>
            {/* input fields  */}
            <div className="col-md-6 right">
              <div className="input-box">
                <form onSubmit={handleSubmit}>
                  <header>LOG IN</header>
                  <div className="input-field">
                    <input
                      type="text"
                      className="input"
                      id="username"
                      required
                      autoComplete="off"
                      value={username}
                      placeholder="Username"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="input-field">
                    <input
                      type="password"
                      className="input"
                      id="password"
                      required
                      value={password}
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {/* drop-down  */}
                  <div className="input-field">
                    <label>
                      User-Type :
                      <select
                        className="px-1"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option value={3}>Select</option>
                        <option value={0}>Customer</option>
                        <option value={1}>Employee</option>
                      </select>
                    </label>
                  </div>
                  {/* submit button */}
                  <div className="input-field">
                    <button type="submit" className="submit-btn">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
