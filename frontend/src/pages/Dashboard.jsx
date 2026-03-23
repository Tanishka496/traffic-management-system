import { useEffect, useState } from "react";
import { getDashboardSummary } from "../services/paymentService";

function StatCard({ label, value }) {
  return (
    <div className="module-card stat-card">
      <p>{label}</p>
      <h3>{value}</h3>
    </div>
  );
}

function Dashboard() {
  const [summary, setSummary] = useState({
    total_challans: 0,
    total_fines_collected: 0,
    unpaid_challans: 0,
  });

  useEffect(() => {
    const loadSummary = async () => {
      const response = await getDashboardSummary();
      setSummary(response.data);
    };

    loadSummary();
  }, []);

  return (
    <section className="dashboard-grid">
      <StatCard label="Total Challans" value={summary.total_challans} />
      <StatCard label="Total Fines Collected" value={`Rs ${summary.total_fines_collected}`} />
      <StatCard label="Unpaid Challans" value={summary.unpaid_challans} />
    </section>
  );
}

export default Dashboard;
