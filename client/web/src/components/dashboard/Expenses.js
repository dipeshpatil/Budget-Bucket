import React, { Fragment } from "react";

const listData = [
  {
    id: 1,
    text: "list item 1",
    text2: "2549.45",
  },
  {
    id: 2,
    text: "list item 2",
    text2: "5621.45",
  },
  {
    id: 3,
    text: "list item 3",
    text2: "1903.45",
  },
  {
    id: 4,
    text: "list item 4",
    text2: "8123.45",
  },
];

const Expenses = () => {
  return (
    <Fragment>
      <div className="bg-white shadow-md rounded-md my-2 p-3">
        <div className="text-">Expenses</div>

        <div className="flex flex-col mt-2">
          {listData.map((listItem) => {
            return (
              <div
                key={listItem.id}
                className="flex-1 p-2 my-1 rounded-sm bg-gray-200"
              >
                <div className="flex flex-row">
                  <div className="w-6 h-6 bg-red-300" />
                  <p className="flex-1 ml-1 text-dark text-bold">
                    {listItem.text}
                  </p>
                  <p className="ml-1 text-dark text-bold">{listItem.text2}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default Expenses;
