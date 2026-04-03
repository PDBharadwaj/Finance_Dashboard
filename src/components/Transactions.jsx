import { useSelector, useDispatch } from "react-redux";
import { setFilter, setSearch } from "../redux/uiSlice";
import { addTransaction, updateTransaction } from "../redux/transactionSlice";
import TransactionForm from "./TransactionForm";
import { useState } from "react";
import { useEffect, useRef } from "react";

export default function Transactions() {
  const dispatch = useDispatch();
  const { filter, search, role } = useSelector((state) => state.ui);
  const transactions = useSelector((state) => state.transactions);
const [showCategorySearch, setShowCategorySearch] = useState(false);
  const [sortBy, setSortBy] = useState("date");
  const [order, setOrder] = useState("desc");
    const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
const [showTypeFilter, setShowTypeFilter] = useState(false);
const dropdownRef = useRef();
const typeRef = useRef();

useEffect(() => {
  function handleClickOutside(e) {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target)
    ) {
      setShowCategorySearch(false);
    }

    if (
      typeRef.current &&
      !typeRef.current.contains(e.target)
    ) {
      setShowTypeFilter(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

  const handleSave = (data) => {
    if (editing) {
      dispatch(updateTransaction(data));
    } else {
      dispatch(addTransaction(data));
    }
    setShowForm(false);
  };


  // Filtering + Searching
  let filtered = transactions.filter((t) => {
    return (
      (filter === "all" || t.type === filter) &&
      t.category.toLowerCase().includes(search.toLowerCase())
    );
  });

  // Sorting
  filtered.sort((a, b) => {
    if (sortBy === "amount") {
      return order === "asc" ? a.amount - b.amount : b.amount - a.amount;
    } else {
      return order === "asc"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    }
  });

  return (
    <div>
      {/* HEADER + CONTROLS */}
      <div className="transaction-header">
        <h2>Transactions</h2>

        <div className="controls">

                    {/* ADMIN ONLY BUTTON */}
          {role === "admin" && (
            <button onClick={() => {
              setShowForm(true);
              setEditing(null);
            }}>
              Add
            </button>
          )}

        </div>
      </div>

      {/* FORM */}
      {showForm && role === "admin" && (
        <TransactionForm
          onSave={handleSave}
          editing={editing}
          setEditing={setEditing}
          setShowForm={setShowForm}
        />
      )}


      {/* TABLE */}
      <table>
        <thead>
  <tr>

    {/* Date with Sort */}
    <th className="table-header" onClick={() => {
      setSortBy("date");
      setOrder(order === "asc" ? "desc" : "asc");
    }}>
      Date {sortBy === "date" ? (order === "asc" ? "↑" : "↓") : ""}
    </th>

    {/* Amount with Sort */}
    <th className="table-header" onClick={() => {
      setSortBy("amount");
      setOrder(order === "asc" ? "desc" : "asc");
    }}>
      Amount {sortBy === "amount" ? (order === "asc" ? "↑" : "↓") : ""}
    </th>

<th className="table-header category-header" ref={dropdownRef}>
  <div
    className="header-label"
    onClick={() => setShowCategorySearch(!showCategorySearch)}
  >
    Category ▾
  </div>

  {showCategorySearch && (
    <div className="dropdown">
      <input
        type="text"
        placeholder="Search category..."
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />
    </div>
  )}
</th>

<th className="table-header type-header" ref={typeRef}>
  <div
    className="header-label"
    onClick={() => setShowTypeFilter(!showTypeFilter)}
  >
    Type ▾
  </div>

  {showTypeFilter && (
    <div className="dropdown">
      <select
        value={filter}
        onChange={(e) => dispatch(setFilter(e.target.value))}
      >
        <option value="all">All</option>
        <option value="Income">Income</option>
        <option value="Expense">Expense</option>
      </select>
    </div>
  )}
</th>

    {role === "admin" && <th className="table-header type-header"><div className="header-label">Actions</div></th>}

  </tr>
</thead>

        <tbody>
          {filtered.length > 0 ? (
            filtered.map((t) => (
              <tr key={t.id}>
                <td>{t.date}</td>
                <td>₹{t.amount}</td>
                <td>{t.category}</td>
                <td className={t.type === "Income" ? "income" : "expense"}>
                  {t.type}
                </td>
                {role === "admin" && (
                  <td>
                    <button onClick={() => {
                      setEditing(t);
                      setShowForm(true);
                    }}>
                      Edit
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No transactions found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}