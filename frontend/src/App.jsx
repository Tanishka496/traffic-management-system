import "./App.css";
import Drivers from "./pages/Drivers";

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Traffic Control Console</p>
          <h1>Traffic Management System</h1>
          <p className="topbar-copy">
            Driver registry
          </p>
        </div>
        <div className="live-badge">Registry online</div>
      </header>

      <main className="dashboard">
        <section className="hero-panel">
          <div className="hero-copy">
            <p className="section-tag">Driver management</p>
            <h2>Add and manage drivers</h2>
            <p className="hero-text">
              Create records on the left. View active records on the right.
            </p>
          </div>

          <div className="hero-accent">
            <span className="accent-chip">Live sync</span>
            <span className="accent-chip">Clear records</span>
            <span className="accent-chip">Fast entry</span>
          </div>
        </section>

        <Drivers />
      </main>
    </div>
  );
}

export default App;
