import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import './CustomerDashboard.css';
import {  toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../context/auth";



const CustomerDashboard = () => {
  const [productType, setProductType] = useState("");
  const [issueType, setIssueType] = useState([]);
  const [issueDescription, setIssueDescription] = useState("");
  const [policyUpload, setPolicyUpload] = useState(null);
  const [invoiceNumber, setInvoiceNumber] = useState("")
  const [customerRequest, setCustomerRequest] = useState(null)
  const [auth, setAuth] = useAuth();


function initialValue(){
  setProductType("");
  setIssueType([]);
  setIssueDescription("");
  setPolicyUpload(null);
  setInvoiceNumber("");
}

  const  handleSubmit = async(e) => {
    e.preventDefault();
    try {
      // retreving response inside the data
      const { data } = await axios.post("/api/v1/request/create-request", {
        // sending these states to server to save in database
      productType,
      issueType,
      issueDescription,
      // policyUpload,
      invoiceNumber,
      customerName: auth.user.username,
      });
      if (data?.success) {
        toast.success(`${invoiceNumber} - Request has been submitted and customer executive will be in touch with you very soon`);
        initialValue()// to set the state at initial to make blank
      } else {
        toast.error(data.message);
      }
  }catch (error) {
    console.log(error);
    toast.error("somthing went wrong in input form");
  }
}

  return (
    <Layout title={"Customer Dashboard - Ticket Sysytem"}>
      {/* Customer Dashboard */}


      <form onSubmit={handleSubmit}>
      <label >
        Product Type:
        <select value={productType} onChange={(e) => setProductType(e.target.value)} required>
          <option value="">Select a product type</option>
          <option value="Mobile Phone">Mobile Phone</option>
          <option value="TV">TV</option>
          <option value="Refrigerator">Refrigerator</option>
          <option value="Washing Machine">Washing Machine</option>
        </select>
      </label>
      {productType && (
        <label >
          Issue Type: (Select multiple by holding ctrl)
          <select value={issueType} onChange={(e) => setIssueType(Array.from(e.target.selectedOptions).map(option => option.value))} multiple required>
            {productType === 'Mobile Phone' && (
              <>
                <option value="Broken Screen">Broken Screen</option>
                <option value="Faulty Camera">Faulty Camera</option>
                <option value="Overheating Issue">Overheating Issue</option>
              </>
            )}
            {productType === 'TV' && (
              <>
                <option value="Damaged Screen">Damaged Screen</option>
                <option value="Discoloration Of Screen">Discoloration Of Screen</option>
                <option value="Adapter Issues">Adapter Issues</option>
              </>
            )}
            {productType === 'Refrigerator' && (
              <>
                <option value="Panel Controls Broken">Panel Controls Broken</option>
                <option value="Compressor Not Working">Compressor Not Working</option>
                <option value="Unable To Turn On">Unable To Turn On</option>
              </>
            )}
            {productType === 'Washing Machine' && (
          <>
            <option value="Water overflowing">Water overflowing</option>
            <option value="Motor not working">Motor not working</option>
          </>
        )}
      </select>
    </label>
  )}
  <label>
    Issue Description:
    <textarea value={issueDescription} onChange={(e) => setIssueDescription(e.target.value)} />
  </label>
  <label>
  Invoice Number:
  <input type="text" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} required />
</label>
  <label>
    Policy Upload:
    <input type="file" accept=".pdf,.doc,.docx,.jpg,.png" onChange={(e) => setPolicyUpload(e.target.files[0])}  />
  </label>
  <button type="submit">Submit</button>
</form>

    </Layout>
  );
};

export default CustomerDashboard;

// CustomerDashboard
// EmployeeDashboard
// AdminDashboard
