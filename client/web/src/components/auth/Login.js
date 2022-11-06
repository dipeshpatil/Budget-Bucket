import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Container, Row } from "react-bootstrap";

import FormComponent from "../../layout/FormComponent";

const Login = () => {
  const onSubmit = (e) => null;
  const onChange = (e) => null;

  return (
    <Fragment>
      <Container className="my-2">
        <Row>
          <h1 className="text-large text-primary">Sign In</h1>
          <p className="lead">
            <i className="fas fa-user"></i> Sign Into Your Account
          </p>
          <Form onSubmit={(e) => onSubmit(e)}>
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

            <Button type="submit" className="btn btn-primary">
              Login
            </Button>
          </Form>
          <p className="my-2">
            Don't have an account?{" "}
            <Link className="btn btn-link" to="/register">
              Sign Up
            </Link>
          </p>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Login;
