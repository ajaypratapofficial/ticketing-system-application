import express from "express";
import formidable from "express-formidable";
import {
  isAdmin,
  isCustomer,
  isEmployee,
  requireSignIn,
} from "../middlewares/authMiddlewares.js";

import {
  assignEmployeeController,
  getEmployeeController,
  getMyEmployeeTaskController,
  getMyTaskController,
  getRequestAllocatedController,
  getRequestController,
  getRequestUnallocatedController,
  requestController,
  assignRequestStateController,
} from "../controllers/requestControllers.js";

const router = express.Router();

router.post("/create-request", requireSignIn, isCustomer, requestController);

//getALl requests
router.get("/get-request", requireSignIn, isAdmin, getRequestController);

router.get("/get-employee", requireSignIn, isAdmin, getEmployeeController);


router.put(
  "/assign-employee",
  requireSignIn,
  isAdmin,
  assignEmployeeController
);

router.get("/get-request", requireSignIn, isAdmin, getRequestController);

router.get(
  "/allocated-request",
  requireSignIn,
  isAdmin,
  getRequestAllocatedController
);

router.get(
  "/unallocated-request",
  requireSignIn,
  isAdmin,
  getRequestUnallocatedController
);

router.get(
  "/mytaks",
  requireSignIn,
  isAdmin,
  getMyTaskController
);



router.get(
  "/employeetasks",
  requireSignIn,
  isEmployee,
  getMyEmployeeTaskController
);

router.put(
  "/assign-request-state",
  requireSignIn,
  isEmployee,
  assignRequestStateController
);



export default router;

// {
//     "productType":"Mobile",
//     "issueType":["Mobile","sdvdsvsf"],
//     "issueDescription": "MobileMobile",
//     "policyUpload":"Mobile",
//     "invoiceNumber":"002"
// }
