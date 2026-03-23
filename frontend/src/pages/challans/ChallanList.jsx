import { useEffect, useState } from "react";
import { getChallans } from "../../services/challanService";
import Table from "../../components/Table";

const columns = [
  { key: "challan_id", label: "Challan ID" },
  { key: "vehicle_number", label: "Vehicle" },
  { key: "violation_type", label: "Violation" },
  { key: "fine_amount", label: "Fine" },
  { key: "officer_name", label: "Officer" },
  { key: "status", label: "Status" },
];

function ChallanList({ refreshKey = 0 }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const response = await getChallans();
      setRows(response.data);
    };

    loadData();
  }, [refreshKey]);

  return <Table columns={columns} rows={rows} emptyMessage="No challans available." />;
}

export default ChallanList;
