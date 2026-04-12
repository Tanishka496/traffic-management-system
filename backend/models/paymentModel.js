const db = require("../config/db");

const addPayment = (payment, callback) => {
  const sql =
    "INSERT INTO payment (challan_id, amount, payment_date, payment_method) VALUES (?, ?, ?, ?)";
  const paymentDate = payment.payment_date || new Date();
  db.query(
    sql,
    [payment.challan_id, payment.amount, paymentDate, payment.payment_method],
    callback,
  );
};

const getChallanById = (challanId, callback) => {
  const sql =
    "SELECT challan_id, status, violation_id FROM challan WHERE challan_id = ? LIMIT 1";
  db.query(sql, [challanId], callback);
};

const markChallanAsPaid = (challanId, callback) => {
  const sql = "UPDATE challan SET status = 'Paid' WHERE challan_id = ?";
  db.query(sql, [challanId], callback);
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

const getPaymentReport = (callback) => {
  const summarySql = `
    SELECT
      COUNT(*) AS total_payments,
      IFNULL(SUM(amount), 0) AS total_amount_collected,
      IFNULL(AVG(amount), 0) AS average_payment_amount,
      COUNT(DISTINCT challan_id) AS challans_paid
    FROM payment
  `;

  const byMethodSql = `
    SELECT
      payment_method,
      COUNT(*) AS payments_count,
      IFNULL(SUM(amount), 0) AS total_amount
    FROM payment
    GROUP BY payment_method
    ORDER BY total_amount DESC
  `;

  db.query(summarySql, (summaryErr, summaryRows) => {
    if (summaryErr) {
      return callback(summaryErr);
    }

    db.query(byMethodSql, (methodErr, methodRows) => {
      if (methodErr) {
        return callback(methodErr);
      }

      return callback(null, {
        summary: summaryRows[0],
        by_method: methodRows,
      });
    });
  });
};

module.exports = {
  addPayment,
  getChallanById,
  markChallanAsPaid,
  getPayments,
  getDashboardSummary,
  getPaymentReport,
};
