
import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { Form, Button } from "react-bootstrap";

const Register = () => {
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };
  return (
    <Layout title="Register -Ticket System">

       <div style={{ display: 'inline-block', marginLeft:"10px", boxShadow:"2px 2px 4px 1px cyan"}}>
       Registration Form = (Not Completed) but backend part is completed<br />
        admin credential =usename - (employee1) password-(ajay) <br />
       customer credential =usename - (customer) password-(ajay) <br />
       employee credential =usename - (employee2) password-(ajay)<br />
       employee credential =usename - (employee3) password-(ajay)
       </div>

      
      
         <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group controlId="firstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control required type="text" placeholder="Enter first name" />
        <Form.Control.Feedback type="invalid">
          Please provide a valid first name.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="lastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control required type="text" placeholder="Enter last name" />
        <Form.Control.Feedback type="invalid">
          Please provide a valid last name.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control required type="text" placeholder="Enter username" />
        <Form.Control.Feedback type="invalid">
          Please provide a valid username.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          required
          type="password"
          placeholder="Enter password"
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid password.
        </Form.Control.Feedback>
      </Form.Group>

      <Button type="submit" variant="primary" className="mt-3">
        Register
      </Button>
    </Form>
    </Layout>
  )
}

export default Register