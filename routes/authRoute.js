import express from "express";
import {
  registerController,
  loginController,
  testController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn, isCustomer, isEmployee } from "../middlewares/authMiddlewares.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);


//test routes
router.get("/test", requireSignIn, testController);
// isAdmin // isEmployee // isCustomer

//protected User route auth
router.get("/user-auth", requireSignIn, isCustomer, (req, res) => {
  res.status(200).send({ ok: true });
});
router.get("/employee-auth", requireSignIn, isEmployee, (req, res) => {
  res.status(200).send({ ok: true });
});
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});


export default router;


// http://localhost:8080/api/v1/auth/register
// post-body-json
// {
//     "firstName":"ajay",
//     "lastName":"singh",
//     "username":"employee2",
//     "password":"ajay",
//     "phoneNumber":"1234567890",
//     "answer":"bgmi",
//     "address":"qwertyuiop1234567890",
//     "userType":"customer"
// }
//  customer "0" employee1 "2" employee2 "1"

// http://localhost:8080/api/v1/auth/login
// post-body-json
// {
//     "username":"employee2",
//     "password":"ajay"
// }
// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDNhZjkyY2I4MjIxMjE1MDMzMzA2MjYiLCJpYXQiOjE2ODE2MDEwNDgsImV4cCI6MTY4MjIwNTg0OH0.Us6_aPREBoFpaRdv22OHfHYkphMNysMdU537wPQi4Rg"



