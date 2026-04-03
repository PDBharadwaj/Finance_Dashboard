import { useSelector } from "react-redux";

export default function SummaryCards() {
  const transactions = useSelector((state) => state.transactions);

  const incomeTransactions = transactions.filter((t) => t.type === "Income");
  const expenseTransactions = transactions.filter((t) => t.type === "Expense");

  const income = incomeTransactions.reduce((a, b) => a + b.amount, 0);
  const expense = expenseTransactions.reduce((a, b) => a + b.amount, 0);
  const balance = income - expense;

  // 🔥 Highest Spending Category
  const categoryTotals = {};
  expenseTransactions.forEach((t) => {
    categoryTotals[t.category] =
      (categoryTotals[t.category] || 0) + t.amount;
  });

  const highestCategory = Object.keys(categoryTotals).reduce(
    (max, cat) =>
      categoryTotals[cat] > (categoryTotals[max] || 0) ? cat : max,
    ""
  );

  // 🔥 Total Transactions
  const totalTransactions = transactions.length;

  // 🔥 Average Expense
  const avgExpense =
    expenseTransactions.length > 0
      ? (expense / expenseTransactions.length).toFixed(2)
      : 0;

  return (
    <div className="cards">
      <div className="card">Total Balance: ₹{balance}</div>
      <div className="card income">Income: ₹{income}</div>
      <div className="card expense">Expense: ₹{expense}</div>

      <div className="card">
        Highest Spending: {highestCategory || "N/A"}
      </div>

      <div className="card">
        Transactions: {totalTransactions}
      </div>

      <div className="card">
        Avg Expense: ₹{avgExpense}
      </div>
    </div>
  );
}