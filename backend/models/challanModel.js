const db = require("../config/db");

const addChallan = (challan, callback) => {
  const sql =
    "INSERT INTO challan (vehicle_id, violation_id, officer_id, challan_date, status) VALUES (?, ?, ?, ?, ?)";
  const challanDate = challan.challan_date || new Date();
  db.query(
    sql,
    [
      challan.vehicle_id,
      challan.violation_id,
      challan.officer_id,
      challanDate,
      challan.status || "Pending",
    ],
    callback,
  );
};

const validateChallanReferences = (challan, callback) => {
  const vehicleSql = "SELECT vehicle_id FROM vehicle WHERE vehicle_id = ? LIMIT 1";
  const violationSql = "SELECT violation_id FROM violation WHERE violation_id = ? LIMIT 1";
  const officerSql = "SELECT officer_id FROM officer WHERE officer_id = ? LIMIT 1";

  db.query(vehicleSql, [challan.vehicle_id], (vehicleErr, vehicleRows) => {
    if (vehicleErr) {
      return callback(vehicleErr);
    }

    if (!vehicleRows.length) {
      return callback(null, {
        valid: false,
        message: `Invalid vehicle_id: ${challan.vehicle_id}. Select an existing vehicle.`,
      });
    }

    db.query(violationSql, [challan.violation_id], (violationErr, violationRows) => {
      if (violationErr) {
        return callback(violationErr);
      }

      if (!violationRows.length) {
        return callback(null, {
          valid: false,
          message: `Invalid violation_id: ${challan.violation_id}. Select an existing violation.`,
        });
      }

      db.query(officerSql, [challan.officer_id], (officerErr, officerRows) => {
        if (officerErr) {
          return callback(officerErr);
        }

        if (!officerRows.length) {
          return callback(null, {
            valid: false,
            message: `Invalid officer_id: ${challan.officer_id}. Select an existing officer.`,
          });
        }

        return callback(null, { valid: true });
      });
    });
  });
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

module.exports = { addChallan, getChallans, validateChallanReferences };
