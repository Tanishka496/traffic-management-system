const db = require("../config/db");

const addChallan = (challan, callback) => {
  const sql =
    "INSERT INTO challan (vehicle_id, violation_id, officer_id, challan_date, status) VALUES (?, ?, ?, ?, ?)";
  const challanDate = challan.challan_date || new Date();
  db.query(
    sql,
    [challan.vehicle_id, challan.violation_id, challan.officer_id, challanDate, challan.status || "Pending"],
    callback
  );
};

const getChallans = (callback) => {
  const sql = `
    SELECT
      c.challan_id,
      c.challan_date,
      c.status,
      c.vehicle_id,
      c.violation_id,
      c.officer_id,
      v.vehicle_number,
      vi.violation_type,
      vi.fine_amount,
      o.name AS officer_name
    FROM challan c
    LEFT JOIN vehicle v ON v.vehicle_id = c.vehicle_id
    LEFT JOIN violation vi ON vi.violation_id = c.violation_id
    LEFT JOIN officer o ON o.officer_id = c.officer_id
    ORDER BY c.challan_id DESC
  `;
  db.query(sql, callback);
};

module.exports = { addChallan, getChallans };
