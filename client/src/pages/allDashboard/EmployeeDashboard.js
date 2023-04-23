import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { NavLink } from "react-router-dom";
import { Modal } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";

const EmployeeDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [auth, setAuth] = useAuth();
  const [selected, setSelected] = useState(null);
  const [currentState, setCurrentState] = useState("");
  const [selectedAction, setSelectedAction] = useState("noAction");
  const [visibleModal, setVisibleModal] = useState(false);

  const getEmployeeRequests = async () => {
    try {
      console.log(auth.user.username);
      const { data } = await axios.get("/api/v1/request/employeetasks", {
        params: {
          employeeName: auth.user.username, // Include the authenticated user's username as the `employeeName` query parameter
        },
      }); // match this
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

  //see also in admin dashboard
  const handleModalOkClick = async () => {
    // do something with selectedAction

    try {
      const invoiceNumber = selected.invoiceNumber;
      const currentState = selectedAction;
      const { data } = await axios.put("/api/v1/request/assign-request-state", {
        currentState,
        invoiceNumber,
      });

      // console.log(selectedAction);
      setSelectedAction("noAction"); // reset to default value
      setVisibleModal(false);
      getEmployeeRequests();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in updating request state ");
    }
  };

  useEffect(() => {
    getEmployeeRequests();
  }, []);
  return (
    <Layout title={"Employee Dashboard - Ticket Sysytem"}>
      <div className="row w-100">
        {/* col-md-2 */}
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <NavLink
                  // onClick={handleMyTask}
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
          <div className="bg-info">{/* {title} */}</div>

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
                          setCurrentState(r.currentState);
                          setSelected(r);
                        }}
                      >
                        Action
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Modal
            title="Select the Action"
            onCancel={() => setVisibleModal(false)}
            footer={null}
            open={visibleModal}
          >
            <div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="actionName"
                  id="Assigned"
                  value="Assigned"
                  checked={selectedAction === "Assigned"}
                  onChange={(e) => setSelectedAction(e.target.value)}
                />
                <label className="form-check-label" htmlFor="Assigned">
                  No Action
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="actionName"
                  id="actionResolved"
                  value="Resolved"
                  checked={selectedAction === "actionResolved"}
                  onChange={(e) => setSelectedAction(e.target.value)}
                />
                <label className="form-check-label" htmlFor="actionResolved">
                  Resolved
                </label>
              </div>
              <button className="btn btn-primary" onClick={handleModalOkClick}>
                OK
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default EmployeeDashboard;
