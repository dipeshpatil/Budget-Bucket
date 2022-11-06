import React, { Fragment } from "react";
import { Row, Col } from "react-bootstrap";

const BudgetTracker = () => {
  return (
    <Fragment>
      <div className="p-2 my-2 bg-light rounded">
        <h3 className="text-dark float-left">Budget Tracker</h3>
        <Row>
          <Col className="col-6" sm={6}>
            <p className="lead">
              <span className="text-danger text-bold">4193.34</span>
              {" / "}
              <span className="text-success text-bold">10899.00</span>
            </p>
          </Col>
          <Col className="col-6" sm={6}>
            <h3>
              <p className="text-dark text-bold">Remaining</p>
              <p className="text-success text-bold">6705.66</p>
            </h3>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default BudgetTracker;
