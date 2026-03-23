import "./App.css";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Drivers from "./pages/Drivers";
import Vehicles from "./pages/Vehicles";
import Violations from "./pages/Violations";
import Challans from "./pages/Challans";
import Payments from "./pages/Payments";

function App() {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderActiveSection = () => {
    if (activeSection === "dashboard") return <Dashboard />;
    if (activeSection === "drivers") return <Drivers />;
    if (activeSection === "vehicles") return <Vehicles />;
    if (activeSection === "violations") return <Violations />;
    if (activeSection === "challans") return <Challans />;
    if (activeSection === "payments") return <Payments />;
    return <Dashboard />;
  };

  return (
    <main className="app-layout">
      <Navbar />
      <div className="app-shell">
        <Sidebar active={activeSection} onChange={setActiveSection} />
        <section className="app-content">{renderActiveSection()}</section>
      </div>
    </main>
  );
}

export default App;
