import Card from "./../UI/Card";
import ExpenseItem from "./ExpenseItem";
import ExpensesFilter from "./ExpensesFilter";
import "./Expenses.css";
import { useState } from "react";

function Expenses(props) {
  const data = props.data_;

  const [filterYear, setFilterYear] = useState("2019");

  const filterChangeHandler = (data) => {
    setFilterYear((prevState) => {
      return data;
    });
  };

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter
          onChangeFilter={filterChangeHandler}
          selected={filterYear}
        />
        <ExpenseItem
          // title={data[0].title}
          title={filterYear}
          amount={data[0].amount}
          date={data[0].date}
        />
        <ExpenseItem
          //title={data[1].title}
          title={filterYear}
          amount={data[1].amount}
          date={data[1].date}
        />
      </Card>
    </div>
  );
}

export default Expenses;
