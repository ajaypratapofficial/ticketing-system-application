import requestModel from "../models/requestModel.js";
import userModel from "../models/userModel.js";

export const requestController = async (req, res) => {
  try {
    const {
      productType,
      issueType,
      issueDescription,
      // policyUpload,
      invoiceNumber,
      customerName,
    } = req.body;
    // validation
    if (!productType) {
      return res.status(401).send({ message: "Product Type is required" });
    }
    if (!issueType || issueType.length === 0) {
      return res.status(401).send({ message: "Issue Type is required" });
    }
    if (!issueDescription) {
      return res.status(401).send({ message: "Issue Description is required" });
    }
    // if (!policyUpload) {
    //   return res.status(401).send({ message: "Policy Upload is required" });
    // }
    if (!invoiceNumber) {
      return res.status(401).send({ message: "Invoice Number is required" });
    }
    if (!customerName) {
      return res.status(401).send({ message: "Customer Name is required" });
    }
    // duplicacy
    const existingCategory = await requestModel.findOne({ invoiceNumber });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Invoice Number Already Exisits",
      });
    }
    // saving request
    const request = await new requestModel({
      productType,
      issueType,
      issueDescription,
      // policyUpload,
      invoiceNumber,
      customerName,
    }).save();
    console.log("1.4");
    res.status(201).send({
      success: true,
      message: "Request Saved Successfuly",
      request,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting saving request",
    });
  }
};

export const getRequestController = async (req, res) => {
  try {
    const requests = await requestModel.find({});
    // console.log(requests);

    res.status(200).send({
      success: true,
      message: "All requests List",
      requests, // sended requests in frontend
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while fetching all request",
    });
  }
};


export const getEmployeeController = async (req, res) => {
  try {
    const employees = await userModel.find({userType: { $in: ["employee", "admin"] } });
    // console.log(employees);
    res.status(200).send({
      success: true,
      message: "All employees List",
      employees, // sended requests in frontend

    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while fetching all employees",
    });
  }
};



export const assignEmployeeController = async (req, res) => {
  try {
    const {
      invoiceNumber,
      updatedEmployee
    } = req.body;
    const updatedRequest  = await requestModel.findOneAndUpdate({ invoiceNumber},
      { employeeName: updatedEmployee, currentState: "Assigned"  },
      { new: true }
      );
    res.status(200).send({
      success: true,
      message: "Request Updated Successfully",
      updatedRequest, // sended requests in frontend
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating Request",
    });
  }
};



export const getRequestAllocatedController = async (req, res) => {
  try {
    const requests = await requestModel.find({ currentState: { $in: ['Assigned', 'Resolved'] }  });
    // console.log(requests);

    res.status(200).send({
      success: true,
      message: "All Allocated Requests List",
      requests, // sended requests in frontend
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while fetching Allocated request",
    });
  }
};



export const getRequestUnallocatedController = async (req, res) => {
  try {
    const requests = await requestModel.find({ currentState: "Pending"  });
    // console.log(requests);

    res.status(200).send({
      success: true,
      message: "All Unallocated Requests List",
      requests, // sended requests in frontend
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while fetching Unallocated request",
    });
  }
};



export const getMyTaskController = async (req, res) => {
  try {
    const {employeeName} = req.query;
    console.log(employeeName);
    const requests = await requestModel.find({ employeeName: employeeName  });
    // console.log(requests);

    res.status(200).send({
      success: true,
      message: "employee1 my task list",
      requests, // sended requests in frontend
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while fetching employee1 my task list",
    });
  }
};



export const getMyEmployeeTaskController = async (req, res) => {
  try {
console.log('employee role 1');

    const {employeeName} = req.query;
    console.log(employeeName);
    const requests = await requestModel.find({ employeeName: employeeName  });
    // console.log(requests);

    res.status(200).send({
      success: true,
      message: "employee1 my task list",
      requests, // sended requests in frontend
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while fetching employee1 my task list",
    });
  }
};

export const assignRequestStateController = async (req, res) => {
  try {
    const {
      currentState,
      invoiceNumber
    } = req.body;
    const updatedRequest  = await requestModel.findOneAndUpdate({ invoiceNumber},
      { currentState: currentState  },
      { new: true }
      );
    res.status(200).send({
      success: true,
      message: "Request Updated Successfully",
      updatedRequest, // sended requests in frontend
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating Request",
    });
  }
};