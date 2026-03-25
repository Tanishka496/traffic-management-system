import { useEffect, useState } from "react";
import { getDrivers } from "../../services/driverServices";
import Table from "../../components/Table";

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "license_number", label: "License Number" },
  { key: "phone", label: "Phone" },
];

function DriverList({ refreshKey = 0 }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const response = await getDrivers();
      setRows(response.data);
    };

    loadData();
  }, [refreshKey]);

  return (
    <Table columns={columns} rows={rows} emptyMessage="No drivers available." />
  );
}

export default DriverList;
