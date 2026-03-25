import { useEffect, useState } from "react";
import { getDashboardSummary } from "../services/paymentService";

function StatCard({ label, value, index }) {
  return (
    <div
      className="module-card stat-card"
      style={{ animationDelay: `${index * 90}ms` }}
    >
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

  const alerts = [
    {
      id: "N2109",
      level: "critical",
      message: "Signal cluster outage at Market Junction",
    },
    {
      id: "N2111",
      level: "high",
      message: "Accident lane block detected near Ring Road",
    },
    {
      id: "N2130",
      level: "minor",
      message: "Speed camera sync delayed in Sector 3",
    },
  ];

  useEffect(() => {
    const loadSummary = async () => {
      const response = await getDashboardSummary();
      setSummary(response.data);
    };

    loadSummary();
  }, []);

  return (
    <section className="dashboard-view">
      <article className="module-card map-hero">
        <div className="hero-copy">
          <p className="eyebrow">Traffic Twin</p>
          <h2>City Control Matrix</h2>
          <p>
            Signals, violations, and response channels in one operational
            cockpit.
          </p>
        </div>
        <div className="map-surface">
          <span className="pulse-node n1" />
          <span className="pulse-node n2" />
          <span className="pulse-node n3" />
          <span className="pulse-node n4" />
          <span className="scan-line" />
        </div>
      </article>

      <div className="dashboard-grid">
        <StatCard
          label="Total Challans"
          value={summary.total_challans}
          index={0}
        />
        <StatCard
          label="Total Fines Collected"
          value={`Rs ${summary.total_fines_collected}`}
          index={1}
        />
        <StatCard
          label="Unpaid Challans"
          value={summary.unpaid_challans}
          index={2}
        />
      </div>

      <article className="module-card alerts-panel">
        <div className="list-header">
          <h3>Active Notifications</h3>
          <span className="pill-count">{alerts.length} live</span>
        </div>
        {alerts.map((alert) => (
          <div key={alert.id} className={`alert-item ${alert.level}`}>
            <span>{alert.id}</span>
            <p>{alert.message}</p>
          </div>
        ))}
      </article>
    </section>
  );
}

export default Dashboard;
