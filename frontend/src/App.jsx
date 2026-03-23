import ChallanForm from './ChallanForm';
import "./App.css";
import Drivers from "./pages/Drivers";

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
    </main>
  );
}

export default App;
