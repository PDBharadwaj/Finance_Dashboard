import SummaryCards from "../components/SummaryCards";
import Charts from "../components/Charts";
import Transactions from "../components/Transactions";
import RoleSwitcher from "../components/RoleSwitcher";
import ThemeToggle from "../components/ThemeToggle";
import ExportCSV from "../components/ExportCSV";

export default function Dashboard() {
  return (
    <div className="container">
      <h1 style={{textAlign: "center"}}>Finance Dashboard</h1>
      <div className="controls header-controls">
        <ThemeToggle />
        <RoleSwitcher />
      </div>
      
      <SummaryCards />
      <Charts />
      <Transactions />
      <ExportCSV />
    </div>
  );
}