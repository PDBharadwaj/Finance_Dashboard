import { useSelector } from "react-redux";

export default function ExportCSV() {
  const data = useSelector((state) => state.transactions);

  const exportData = () => {
    const csv = [
      ["Date", "Amount", "Category", "Type"],
      ...data.map((t) => [t.date, t.amount, t.category, t.type]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
  };

  return <button onClick={exportData}>Export CSV</button>;
}