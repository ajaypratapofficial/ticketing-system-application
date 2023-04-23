import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "antd";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [employeNameArr, setEmployeNameArr] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [auth, setAuth] = useAuth();

  const [selected, setSelected] = useState(null);
  const [updatedEmployee, setUpdatedEmployee] = useState("");
  const [title, setTitle] = useState("All Requests");

  const getAllRequests = async () => {
    try {
      const { data } = await axios.get("/api/v1/request/get-request"); // match this
      if (data.success) {
        setRequests(data.requests);
        console.log(data.requests.length);
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("F Something went wrong in getting requests");
    }
  };

  const getAllEmployeeName = async () => {
    try {
      // with data error gone ? why?
      const { data } = await axios.get("/api/v1/request/get-employee"); // match this
      if (data.success) {
        setEmployeNameArr(data.employees);
        console.log(data.employees.length);
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("F Something went wrong in getting employees names");
    }
  };

  const assignEmployee = async (updatedEmployee, invoiceNumber) => {
    try {
      console.log(updatedEmployee, invoiceNumber);
      const { data } = await axios.put("/api/v1/request/assign-employee", {
        updatedEmployee,
        invoiceNumber,
      });
      if (data.success) {
        toast.success(data.message);
        setVisibleModal(false);
        getAllRequests(); // update the requests list after assigning the employee
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in assigning the employee");
    }
  };

  const handleAllRequest = async () => {
    try {
      getAllRequests();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in fetching all request");
    }
  };
  const handleAllocatedRequest = async () => {
    try {
      const { data } = await axios.get("/api/v1/request/allocated-request"); // match this
      if (data.success) {
        setRequests(data.requests);
        toast.success(data.message);
        setTitle("Allocated Tasks");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in fetching all Allocated request ");
    }
  };
  const handleUnallocatedRequest = async () => {
    try {
      const { data } = await axios.get("/api/v1/request/unallocated-request"); // match this
      if (data.success) {
        setRequests(data.requests);
        toast.success(data.message);
        setTitle("Unallocated Tasks");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in fetching all Unallocated request ");
    }
  };
  const handleMyTask = async (req, res) => {
    try {
      const { data } = await axios.get("/api/v1/request/mytaks", {
        params: {
          employeeName: auth.user.username, // Include the authenticated user's username as the `employeeName` query parameter
        },
      }); // match this
      if (data.success) {
        console.log(auth.user.username);
        setRequests(data.requests);
        toast.success(data.message);
        setTitle("My Tasks");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in fetching all Unallocated request ");
    }
  };

  useEffect(() => {
    getAllRequests();
    getAllEmployeeName();
  }, []);
  return (
    <>
      <Layout title={"Admin Dashboard - Ticket Sysytem"}>
        <div className="row w-100">
          {/* col-md-2 */}
          <nav className="col-md-2 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <NavLink
                    onClick={handleAllRequest}
                    style={{ boxShadow: " 0px 0px " }}
                    to="#"
                    className="nav-link"
                    href="#"
                  >
                    Dashboard-All Request
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    onClick={handleAllocatedRequest}
                    style={{ boxShadow: " 0px 0px " }}
                    className="nav-link"
                    href="#"
                  >
                    Allocated tasks
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    onClick={handleUnallocatedRequest}
                    style={{ boxShadow: " 0px 0px " }}
                    className="nav-link"
                    href="#"
                  >
                    Unallocated tasks
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    onClick={handleMyTask}
                    style={{ boxShadow: " 0px 0px " }}
                    className="nav-link"
                    href="#"
                  >
                    My Tasks
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
          {/* col-md-10 */}
          <div className="col-md-10">
            {/* <div>{title}</div> */}
            <div class="bg-info">{title}</div>

            <div style={{ overflow: "auto", maxHeight: "530px" }}>
              <table className="table table-hover table-wrapper">
                <thead>
                  <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Invoice Number</th>
                    <th scope="col">Current State</th>
                    <th scope="col">Customer Name</th>
                    <th scope="col">Employee Name</th>
                    <th scope="col">Product Type</th>
                    <th scope="col">Issue Type</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody style={{ overflowY: "scroll" }}>
                  {requests?.map((r, index) => (
                    <tr key={r._id}>
                      {/* {r.invoiceNumber} */}
                      <td>{index + 1}</td>
                      <td>{r.invoiceNumber}</td>
                      <td>{r.currentState}</td>
                      <td>{r.customerName}</td>
                      <td>{r.employeeName}</td>
                      <td>{r.productType}</td>
                      <td>{r.issueType}</td>
                      <td>
                        <button
                          className="btn btn-primary ms-2"
                          onClick={() => {
                            setVisibleModal(true);
                            setUpdatedEmployee(r.employeeName);
                            setSelected(r);
                          }}
                        >
                          Assign
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              title="Assign the Request"
              // open={isModalOpen}
              // onOk={handleOk}
              onCancel={() => setVisibleModal(false)}
              footer={null}
              open={visibleModal}
            >
              <div>
                {employeNameArr.map((e, index) => (
                  <div className="form-check" key={e.username}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="employeeName" // so that only one can be selected
                      id={e.username}
                      value={e.username}
                      checked={index === 0 ? false : undefined}
                      onChange={() => setUpdatedEmployee(e.username)}
                    />
                    <label className="form-check-label" htmlFor={e.username}>
                      {e.username}
                    </label>
                  </div>
                ))}
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    assignEmployee(updatedEmployee, selected.invoiceNumber);
                  }}
                >
                  OK
                </button>
              </div>
            </Modal>
          </div>
        </div>
      </Layout>
      ;
    </>
  );
};

export default AdminDashboard;
