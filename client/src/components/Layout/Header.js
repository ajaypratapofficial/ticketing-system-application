import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [userType, setUserType] = useState("");

  const handleLogout = () => {
    setAuth({
      // spreading bcoz sometime we could have more than user and token
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };



  // const handleDashboardClick = () => {
  //   console.log(auth?.user?.role);
  //   if (auth.user?.role == 0) {
  //     setUserType("customer");
  //   }
  //   if (auth?.user?.role == 1) {
  //     setUserType("employee");
  //   }
  //   if (auth?.user?.role == 2) {
  //     setUserType("admin");
  //   }
  //   console.log(userType);
  // };

  // useEffect(() => {
  //   console.log(auth.user.role);
    // if (auth.user.role == 0) {
    //   setUserType("customer");
    // }
    // if (auth.user.role == 1) {
    //   setUserType("employee");
    // }
    // if (auth.user.role == 2) {
    //   setUserType("admin");
    // }
  //   console.log(userType);
  // }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <NavLink to="/" className="navbar-brand" href="#">
              Ticket System
            </NavLink>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item ">
                <NavLink
                  className="nav-link"
                  style={{ boxShadow: " 0px 0px " }}
                  aria-current="page"
                  href="#"
                >
                  hi !{auth?.user?.firstName}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/homepage"
                  className="nav-link"
                  aria-current="page"
                  href="#"
                >
                  Home
                </NavLink>
              </li>
              {/* {auth?.user?.role == 2 ? <><li className="nav-item">
                <NavLink
                  to="/homepage"
                  className="nav-link"
                  aria-current="page"
                  href="#"
                >
                  All Requests
                </NavLink>
              </li></>
              :
              <></>} */}

              {
                // !auth.user ? (<></>) : (<></>)
                auth.user ? (
                  <>
                    <li className="nav-item dropdown">
                      <NavLink
                        className="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {auth?.user?.username}
                      </NavLink>
                      <ul className="dropdown-menu">
                        <li>
                          <NavLink
                            to={`/dashboard/${
                              auth?.user?.role ==0 ? ("customer") : (auth?.user?.role ==1 ? "employee" : "admin")
                              // userType state is not working
                            }`}
                            className="dropdown-item"
                            // onClick={handleDashboardClick}
                            
                          >
                            Dashboard
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            onClick={handleLogout}
                            to="/login"
                            className="dropdown-item"
                          >
                            Logout
                          </NavLink>
                        </li>
                      </ul>
                    </li>
                  </>
                ) : (
                  <>
                  <li className="nav-item">
                      <NavLink to="/register" className="nav-link" href="#">
                        Register
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/login" className="nav-link" href="#">
                        Login
                      </NavLink>
                    </li>
                  </>
                )
              }
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
