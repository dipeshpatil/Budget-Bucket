import React, { Fragment } from "react";
// import { Row, Col } from "react-bootstrap";

const BudgetTracker = () => {
  return (
    <Fragment>
      <div className="bg-white shadow-md rounded-md my-2 p-3">
        <div className="text-">Budget Tracker</div>

        <div className="flex flex-row mt-2">
          <div className="flex-1">
            <p className="text-dark text-bold">Spent</p>
            <p className="text-red-500 text-bold">6705.66</p>

            <div className="my-3"></div>

            <p className="text-dark text-bold">Total Budget</p>
            <p className="text-green-600 text-bold">10899.00</p>
          </div>

          <div className="flex-1">
            <p className="text-dark text-bold">Remaining</p>
            <p className="text-success text-bold">6705.66</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BudgetTracker;
