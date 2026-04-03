import { useState, useEffect } from "react";

export default function TransactionForm({ onSave, editing, setEditing, setShowForm }) {
  const [form, setForm] = useState({
    id: Date.now(),
    date: "",
    amount: "",
    category: "",
    type: "Expense",
  });

  useEffect(() => {
    if (editing) setForm(editing);
  }, [editing]);

  const handleSubmit = () => {
    if (!form.date || !form.amount || !form.category) return;
    onSave({ ...form, amount: Number(form.amount) });

    setForm({
      id: Date.now(),
      date: "",
      amount: "",
      category: "",
      type: "Expense",
    });
    setEditing(null);
    setShowForm(false);
  };

  return (
    <div className="card">
      <div className="form-header">
        <h3 style={{margin: "0 0 10px 0"}}>{editing ? "Edit Transaction" : "Add Transaction"}</h3>
        <button
            className="close-btn"
            onClick={() => {
                setEditing(null);
                setShowForm(false);
            }}
            >
            ✖
        </button>
      </div>

      <div className="form-body">
        <input type="date" value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })} />

        <input type="number" placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })} />

        <input type="text" placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })} />

        <select value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
      </div>
      <button onClick={handleSubmit}>
        {editing ? "Update" : "Add"}
      </button>
    </div>
  );
}