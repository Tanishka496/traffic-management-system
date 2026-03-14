import AddViolation from "./pages/violations/AddViolation";
import ViolationList from "./pages/violations/ViolationList";

function App() {
  return (
    <div>
      <h1>Traffic Management System</h1>
      <AddViolation />
      <hr />
      <ViolationList />
    </div>
  );
}

export default App;