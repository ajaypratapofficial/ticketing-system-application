import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  productType: {
    type: String,
    required: true,
  },
  issueType: {
    type: [String],
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  issueDescription: {
    type: String,
    required: true,
  },
  // policyUpload: {
  //   type: Buffer,
  //   contentType:String,
  // },
  invoiceNumber: {
    type: String,
    required: true,
  },
  employeeName: {
    type: String,
    default: "",
  },
  currentState: {
    type: String,
    enum: ["Pending", "Assigned", "Resolved"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Request = mongoose.model("requests", requestSchema);

export default Request;

// {
//     "productType":"Mobile",
//     "issueType":["Mobile","sdvdsvsf"],
//     "issueDescription": "MobileMobile",
//     "policyUpload":"Mobile",
//     "invoiceNumber":"002"
// }
