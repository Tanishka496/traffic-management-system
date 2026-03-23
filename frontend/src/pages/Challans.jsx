import { useState } from "react";
import CreateChallan from "./challans/CreateChallan";
import ChallanList from "./challans/ChallanList";

function Challans() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <section className="module-card">
      <h2>Challan Management</h2>
      <CreateChallan onCreated={() => setRefreshKey((prev) => prev + 1)} />
      <ChallanList refreshKey={refreshKey} />
    </section>
  );
}

export default Challans;
