import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

//register
export const registerController = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      username,
      password,
      phoneNumber,
      answer,
      address,
    } = req.body;
    //validations
    if (!firstName) {
      return res.send({ error: "Name is Required" });
    }
    if (!lastName) {
      return res.send({ message: "Email is Required" });
    }
    if (!username) {
      return res.send({ message: "Password is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phoneNumber) {
      return res.send({ message: "Phone no is Required" });
    }
    if (!answer) {
      return res.send({ message: "Address is Required" });
    }
    if (!address) {
      return res.send({ message: "Answer is Required" });
    }
    //check user
    const exisitingUser = await userModel.findOne({ username });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      firstName,
      lastName,
      username,
      password: hashedPassword,
      phoneNumber,
      answer,
      address,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registeration",
      error,
    });
  }
};

//POST LOGIN
export const loginController = async (req, res) => {
  // console.log("loginController00")
  try {
    const { username, password, role } = req.body;

    //validation
    if (!username || !password) {
      return res.status(200).send({
        success: false,
        message: "L - Invalid username or password",
      });
    }
    //check user
    const user = await userModel.findOne({ username });
    if (!user) {
      console.log(" This username is not registerd");
      return res.status(200).send({
        success: false,
        message: "L - username is not registerd",
      });
    }
    //role
    if (!user.role === 2) {
      const userRole = await userModel.findOne({ username, role });
      console.log(userRole);
      if (!userRole) {
        console.log(" Please select correct user type");
        return res.status(200).send({
          success: false,
          message: "L - Please select correct user type",
        });
      }
    } else {
      if (user.role === 2) {
        if (role == 0 || role == 3) {
          return res.status(200).send({
            success: false,
            message: "L - Please select correct user type",
          });
        }
      }
    }

    //password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "L - Invalid Password",
      });
    }
    // token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        phoneNumber: user.phoneNumber,
        answer: user.answer,
        address: user.address,
        role: user.role,
        date: user.createdAt,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "L - Error in login",
      error,
    });
  }
};

//test controller
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
