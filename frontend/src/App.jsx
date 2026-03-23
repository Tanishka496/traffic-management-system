import "./App.css";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Drivers from "./pages/Drivers";
import Vehicles from "./pages/Vehicles";
import Violations from "./pages/Violations";
import Challans from "./pages/Challans";
import Payments from "./pages/Payments";
import Login from "./pages/Login";

function App() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("tms_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    localStorage.setItem("tms_user", JSON.stringify(loggedInUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("tms_user");
    setActiveSection("dashboard");
  };

  if (!user) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

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
      <Navbar user={user} onLogout={handleLogout} />
      <div className="app-shell">
        <Sidebar active={activeSection} onChange={setActiveSection} />
        <section className="app-content">{renderActiveSection()}</section>
      </div>
    </main>
  );
}

export default App;
