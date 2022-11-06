import React, { Fragment } from "react";
import { Row, Col } from "react-bootstrap";

const TotalSavings = () => {
  return (
    <Fragment>
      <div className="p-2 bg-light rounded">
        <Row>
          <Col className="col-6" sm={6}>
            <h3 className="text-dark float-left">Total Savings</h3>
          </Col>
          <Col className="col-6" sm={6}>
            <h2 className="text-dark float-right">6705.66</h2>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default TotalSavings;
