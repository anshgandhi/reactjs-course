import Card from "./../UI/Card";
import ExpenseItem from "./ExpenseItem";
import ExpensesFilter from "./ExpensesFilter";
import "./Expenses.css";
import { useState } from "react";

function Expenses(props) {
  const expenses = props.items;

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
        {expenses.map((x) => (
          <ExpenseItem
            key={x.id}
            title={x.title}
            amount={x.amount}
            date={x.date}
          />
        ))}
      </Card>
    </div>
  );
}

export default Expenses;
