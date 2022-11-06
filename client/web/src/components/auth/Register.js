import React, { Fragment } from "react";

import { Link } from "react-router-dom";
import { Form, Button, Container, Row } from "react-bootstrap";

import FormComponent from "../../layout/FormComponent";

const Register = () => {
  const onSubmit = (e) => null;
  const onChange = (e) => null;

  return (
    <Fragment>
      <Container className="my-2">
        <Row>
          <h1 className="large text-primary">Sign Up</h1>
          <p className="lead">
            <i className="fas fa-user"></i> Create Your Account
          </p>
          <Form onSubmit={(e) => onSubmit(e)}>
            <FormComponent
              label="Full Name"
              onChange={(e) => onChange(e)}
              name="name"
              required
              _type="text"
            />
            <FormComponent
              onChange={(e) => onChange(e)}
              name="email"
              required
              _type="email"
            />
            <FormComponent
              onChange={(e) => onChange(e)}
              name="password"
              required
              _type="password"
            />
            <FormComponent
              label="Confirm Password"
              onChange={(e) => onChange(e)}
              name="password2"
              required
              _type="password"
            />
            <Button type="submit" className="btn btn-primary">
              Register
            </Button>
          </Form>
          <p className="my-2">
            Already have an account?{" "}
            <Link className="btn btn-link" to="/login">
              Sign In
            </Link>
          </p>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Register;
