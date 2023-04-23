import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  // console.log("requireSignIn00");
  try {
    //token is in req headers authorisation
    // JWT.verify() function decodes and verifies the token using the secret key stored in process.env.JWT_SECRET
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode; //  The req.user property is then set to the decoded user information, so that it can be accessed in subsequent middleware functions or route handlers.


    next();
  } catch (error) {
    console.log(error);
  }
};

//customer acceess
export const isCustomer = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);

    if (user.role === 0) {
      // User is a customer
      next();
    } else {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in customer middelware",
    });
  }
};

//employee acceess
export const isEmployee = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);

    if (user.role === 1) {
      // User is an employee
      next();
    } else {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
        
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in Employee middelware",
    });
  }
};

//admin acceess
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);

    if (user.role === 2) {
      // User is an admin
      next();
    } else {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access ",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in Admin middelware",
    });
  }
};
