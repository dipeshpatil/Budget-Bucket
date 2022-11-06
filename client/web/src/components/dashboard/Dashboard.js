import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import BudgetTracker from "./BudgetTracker";
import Expenses from "./Expenses";
import MonthwiseTimeline from "./MonthwiseTimeline";
import TotalSavings from "./TotalSavings";

const Dashboard = () => {
  return (
    <Fragment>
      <Container className="my-2" fluid>
        <TotalSavings />
        <MonthwiseTimeline />
        <BudgetTracker />
        <Expenses />
        <Expenses />
      </Container>
    </Fragment>
  );
};

export default Dashboard;
