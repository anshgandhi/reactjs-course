import Card from "./../UI/Card";
import ExpenseItem from "./ExpenseItem";
import ExpensesFilter from "./ExpensesFilter";
import "./Expenses.css";
import { useState } from "react";

function Expenses(props) {
  const [filterYear, setFilterYear] = useState("2019");

  const filterChangeHandler = (data) => {
    setFilterYear((prevState) => {
      return data;
    });
  };

  const filteredExpenses = props.items.filter((element) => {
    return element.date.getFullYear().toString() === filterYear;
  });

  let expensesContent = <p> No Content Found </p>;

  if (filteredExpenses.length > 0) {
    expensesContent = filteredExpenses.map((x) => (
      <ExpenseItem key={x.id} title={x.title} amount={x.amount} date={x.date} />
    ));
  }

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter
          onChangeFilter={filterChangeHandler}
          selected={filterYear}
        />
        {expensesContent}
      </Card>
    </div>
  );
}

export default Expenses;
