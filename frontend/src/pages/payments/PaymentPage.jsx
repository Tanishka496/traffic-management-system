import { useEffect, useState } from "react";
import {
  addPayment,
  getPaymentReport,
  getPayments,
} from "../../services/paymentService";
import { getChallans } from "../../services/challanService";
import Table from "../../components/Table";

const columns = [
  { key: "payment_id", label: "Payment ID" },
  { key: "challan_id", label: "Challan ID" },
  { key: "amount", label: "Amount" },
  { key: "payment_method", label: "Method" },
  { key: "status", label: "Challan Status" },
];

const reportColumns = [
  { key: "payment_method", label: "Payment Method" },
  { key: "payments_count", label: "No. of Payments" },
  { key: "total_amount", label: "Total Amount" },
];

function PaymentPage() {
  const [rows, setRows] = useState([]);
  const [challans, setChallans] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [report, setReport] = useState({
    summary: {
      total_payments: 0,
      total_amount_collected: 0,
      average_payment_amount: 0,
      challans_paid: 0,
    },
    by_method: [],
  });
  const [form, setForm] = useState({
    challan_id: "",
    amount: "",
    payment_method: "Cash",
  });

  const loadPayments = async () => {
    const response = await getPayments();
    setRows(response.data);
  };

  const loadReport = async () => {
    const response = await getPaymentReport();
    setReport(response.data);
  };

  const loadChallans = async () => {
    const response = await getChallans();
    setChallans(response.data);
  };

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([loadPayments(), loadReport(), loadChallans()]);
    };

    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback({ type: "", message: "" });

    try {
      await addPayment({
        ...form,
        challan_id: Number(form.challan_id),
        amount: Number(form.amount),
      });
      setForm({ challan_id: "", amount: "", payment_method: "Cash" });
      await Promise.all([loadPayments(), loadReport(), loadChallans()]);
      setFeedback({ type: "success", message: "Payment recorded successfully." });
    } catch (error) {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Could not record payment. Verify challan ID and amount.";
      setFeedback({ type: "error", message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="module-card">
      <h2>Payment Management</h2>
      <form onSubmit={handleSubmit} className="driver-form">
        <div className="field">
          <label htmlFor="challan_id">Challan ID</label>
          <select
            id="challan_id"
            value={form.challan_id}
            onChange={(e) => setForm({ ...form, challan_id: e.target.value })}
            required
          >
            <option value="">Select challan</option>
            {challans.map((challan) => (
              <option key={challan.challan_id} value={challan.challan_id}>
                {challan.challan_id} - {challan.vehicle_number || "Unknown Vehicle"} ({challan.status || "Pending"})
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="payment_method">Payment Method</label>
          <select
            id="payment_method"
            value={form.payment_method}
            onChange={(e) =>
              setForm({ ...form, payment_method: e.target.value })
            }
          >
            <option value="Cash">Cash</option>
            <option value="UPI">UPI</option>
            <option value="Card">Card</option>
          </select>
        </div>
        <button className="submit-btn" type="submit" disabled={isSubmitting || !challans.length}>
          {isSubmitting ? "Recording..." : "Record Payment"}
        </button>
        {!challans.length ? (
          <p className="error-text">No challans available. Create a challan first.</p>
        ) : null}
        {feedback.message ? (
          <p className={feedback.type === "error" ? "error-text" : "success-text"}>
            {feedback.message}
          </p>
        ) : null}
      </form>
      <Table
        columns={columns}
        rows={rows}
        emptyMessage="No payments available."
      />

      <article className="module-card">
        <div className="list-header">
          <h3>Payment Report</h3>
          <span className="pill-count">{report.summary.total_payments} records</span>
        </div>

        <div className="dashboard-grid">
          <div className="module-card stat-card">
            <p>Total Amount Collected</p>
            <h3>Rs {Number(report.summary.total_amount_collected).toFixed(2)}</h3>
          </div>
          <div className="module-card stat-card">
            <p>Average Payment</p>
            <h3>Rs {Number(report.summary.average_payment_amount).toFixed(2)}</h3>
          </div>
          <div className="module-card stat-card">
            <p>Challans Paid</p>
            <h3>{report.summary.challans_paid}</h3>
          </div>
        </div>

        <Table
          columns={reportColumns}
          rows={report.by_method}
          emptyMessage="No payment report data available."
        />
      </article>
    </section>
  );
}

export default PaymentPage;
