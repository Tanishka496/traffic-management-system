import ChallanForm from './ChallanForm';
import "./App.css";
import Drivers from "./pages/Drivers";
import AddViolation from "./pages/violations/AddViolation";
import ViolationList from "./pages/violations/ViolationList";

function App() {
  return (
    <main className="app-shell">
      <section className="module-card">
        <h2>Challan Module</h2>
        <ChallanForm />
      </section>

      <section>
        <Drivers />
      </section>

      <section className="module-card">
        <h2>Violation Module</h2>
        <AddViolation />
        <ViolationList />
      </section>
    </main>
  );
}

export default App;
