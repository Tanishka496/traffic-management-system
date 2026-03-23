import { useEffect, useState } from "react";
import { addPayment, getPayments } from "../../services/paymentService";
import Table from "../../components/Table";

const columns = [
  { key: "payment_id", label: "Payment ID" },
  { key: "challan_id", label: "Challan ID" },
  { key: "amount", label: "Amount" },
  { key: "payment_method", label: "Method" },
  { key: "status", label: "Challan Status" },
];

function PaymentPage() {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({ challan_id: "", amount: "", payment_method: "Cash" });

  const loadPayments = async () => {
    const response = await getPayments();
    setRows(response.data);
  };

  useEffect(() => {
    loadPayments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addPayment({ ...form, challan_id: Number(form.challan_id), amount: Number(form.amount) });
    setForm({ challan_id: "", amount: "", payment_method: "Cash" });
    await loadPayments();
  };

  return (
    <section className="module-card">
      <h2>Payment Management</h2>
      <form onSubmit={handleSubmit} className="driver-form">
        <div className="field">
          <label htmlFor="challan_id">Challan ID</label>
          <input id="challan_id" value={form.challan_id} onChange={(e) => setForm({ ...form, challan_id: e.target.value })} required />
        </div>
        <div className="field">
          <label htmlFor="amount">Amount</label>
          <input id="amount" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
        </div>
        <div className="field">
          <label htmlFor="payment_method">Payment Method</label>
          <select id="payment_method" value={form.payment_method} onChange={(e) => setForm({ ...form, payment_method: e.target.value })}>
            <option value="Cash">Cash</option>
            <option value="UPI">UPI</option>
            <option value="Card">Card</option>
          </select>
        </div>
        <button className="submit-btn" type="submit">Record Payment</button>
      </form>
      <Table columns={columns} rows={rows} emptyMessage="No payments available." />
    </section>
  );
}

export default PaymentPage;
