import Chart from './../Chart/Chart'

const ExpensesChart = props => {
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ]
    const chartDataPoints = months.map(x => ({
        label: x,
        value: 0,
    }))
    for (const expense of props.expenses) {
        const expenseMonth = expense.date.getMonth();
        chartDataPoints[expenseMonth].value += expense.amount;
    }
    
    return <Chart dataPoints={chartDataPoints}/>
}

export default ExpensesChart;