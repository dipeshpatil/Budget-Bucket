import React from "react";
import { Form } from "react-bootstrap";

const FormComponent = ({ _type, label, ...props }) => {
  switch (_type) {
    case "text":
      return (
        <Form.Group className="mb-3">
          <Form.Label>{!label ? "Input Text" : label}</Form.Label>
          <Form.Control {...props} type="text" placeholder={`Enter ${label}`} />
        </Form.Group>
      );
    case "email":
      return (
        <Form.Group className="mb-3">
          <Form.Label>{!label ? "Email Address" : label}</Form.Label>
          <Form.Control
            {...props}
            type="email"
            placeholder="name@example.com"
          />
        </Form.Group>
      );
    case "password":
      return (
        <Form.Group className="mb-3">
          <Form.Label>{!label ? "Password" : label}</Form.Label>
          <Form.Control
            {...props}
            type="password"
            placeholder="Enter Password"
          />
        </Form.Group>
      );
    default:
      return null;
  }
};

export default FormComponent;
