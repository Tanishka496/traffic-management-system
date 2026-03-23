const db = require("../config/db");

const addPayment = (payment, callback) => {
  const sql =
    "INSERT INTO payment (challan_id, amount, payment_date, payment_method) VALUES (?, ?, ?, ?)";
  const paymentDate = payment.payment_date || new Date();
  db.query(sql, [payment.challan_id, payment.amount, paymentDate, payment.payment_method], callback);
};

const getPayments = (callback) => {
  const sql = `
    SELECT p.payment_id, p.challan_id, p.amount, p.payment_date, p.payment_method, c.status
    FROM payment p
    LEFT JOIN challan c ON c.challan_id = p.challan_id
    ORDER BY p.payment_id DESC
  `;
  db.query(sql, callback);
};

const getDashboardSummary = (callback) => {
  const sql = `
    SELECT
      (SELECT COUNT(*) FROM challan) AS total_challans,
      (SELECT IFNULL(SUM(amount), 0) FROM payment) AS total_fines_collected,
      (SELECT COUNT(*) FROM challan WHERE status <> 'Paid' OR status IS NULL) AS unpaid_challans
  `;
  db.query(sql, callback);
};

module.exports = { addPayment, getPayments, getDashboardSummary };
