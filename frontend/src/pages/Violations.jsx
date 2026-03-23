import AddViolation from "./violations/AddViolation";
import ViolationList from "./violations/ViolationList";

function Violations() {
  return (
    <section className="module-card">
      <h2>Violation Management</h2>
      <AddViolation />
      <ViolationList />
    </section>
  );
}

export default Violations;
