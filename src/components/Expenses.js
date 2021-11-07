import ExpenseItem from "./ExpenseItem";
import './Expenses.css'

function Expenses(props) {

  const data = props.data_;

  return (
    <div className="expenses">
      <ExpenseItem
        title={data[0].title}
        amount={data[0].amount}
        date={data[0].date}
      />
      <ExpenseItem
        title={data[1].title}
        amount={data[1].amount}
        date={data[1].date}
      />
    </div>
  );
}

export default Expenses;
