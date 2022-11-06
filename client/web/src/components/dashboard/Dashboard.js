import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import BudgetTracker from "./BudgetTracker";
import TotalSavings from "./TotalSavings";

const Dashboard = () => {
  return (
    <Fragment>
      <Container className="my-2" fluid>
        <TotalSavings />
        <BudgetTracker />
      </Container>
    </Fragment>
  );
};

export default Dashboard;
