import { useSelector } from "react-redux";
import {
  LineChart, Line, PieChart, Pie,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Cell, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { useState } from "react";

export default function Charts() {
  const data = useSelector((state) => state.transactions);
  const [view, setView] = useState("Savings");
// Color palette
const colorPalette = [
  "#FF6B6B",
  "#FFA94D",
  "#51CF66",
  "#339AF0",
  "#845EF7",
  "#F06595",
  "#868E96",
  "#22B8CF",
  "#FCC419",
  "#FF922B"
];

// Dynamic category color mapping
const categoryColors = {};
let colorIndex = 0;

const getCategoryColor = (category) => {
  if (!categoryColors[category]) {
    categoryColors[category] =
      colorPalette[colorIndex % colorPalette.length];
    colorIndex++;
  }
  return categoryColors[category];
};
  const incomeData = data.filter(d => d.type === "Income");
const expenseData = data.filter(d => d.type === "Expense");

const totalIncome = incomeData.reduce((sum, d) => sum + d.amount, 0);
const totalExpense = expenseData.reduce((sum, d) => sum + d.amount, 0);

const savingsData = [
  { name: "Income", value: totalIncome },
  { name: "Expense", value: totalExpense },
  { name: "Savings", value: totalIncome - totalExpense }
];

const filteredData =
  view === "Income"
    ? incomeData
    : view === "Expense"
    ? expenseData
    : data;

const groupedData = Object.values(
  filteredData.reduce((acc, item) => {
    const key = item.category;

    if (!acc[key]) {
      acc[key] = { category: key, amount: 0 };
    }

    acc[key].amount += item.amount;

    return acc;
  }, {})
);
  return (
    <>
          <div style={{ marginBottom: "15px", display: "flex", justifyContent: "center" }}>
  <select style={{width: "200px"}} value={view} onChange={(e) => setView(e.target.value)}>
    <option value="Income">Income</option>
    <option value="Expense">Expense</option>
    <option value="Savings">Net</option>
  </select>
</div>
    <div className="cards charts-container">
      {/* Bar Chart */}
<div className="chart-card">
  <h3 className="cards-inner-text charts-text">Balance Overview</h3>

  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={groupedData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="category" />
      <YAxis />
      <Tooltip formatter={(value) => `₹ ${value}`} />

      <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
        {groupedData.map((entry, index) => (
          <Cell
  key={index}
  fill={getCategoryColor(entry.category)}
/>
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
</div>

      {/* Pie Chart */}
      <div className="chart-card">
        <h3 className="cards-inner-text charts-text">Breakdown</h3>

        <ResponsiveContainer width="100%" height={300}>
  <PieChart>
            
    <Tooltip formatter={(value) => `₹ ${value}`} />
    <Legend />

    {view === "Income" && (
  <Pie data={incomeData} dataKey="amount" nameKey="category" outerRadius={100}>
    {incomeData.map((entry, index) => (
      <Cell
        key={index}
        fill={getCategoryColor(entry.category)}
      />
    ))}
  </Pie>
)}

    {view === "Expense" && (
  <Pie data={expenseData} dataKey="amount" nameKey="category" outerRadius={100}>
    {expenseData.map((entry, index) => (
      <Cell
        key={index}
        fill={getCategoryColor(entry.category)}
      />
    ))}
  </Pie>
)}

{view === "Savings" && (
  <Pie
    data={savingsData}
    dataKey="value"
    nameKey="name"
    outerRadius={100}
  >
    {savingsData.map((entry, index) => (
  <Cell
    key={index}
    fill={getCategoryColor(entry.name)}
  />
))}
  </Pie>
)}

  </PieChart>
</ResponsiveContainer>
      </div>

    </div>
    
    </>
  );
}