import React, { useState } from 'react';

const ChallanForm = () => {
  const [formData, setFormData] = useState({
    vehicle_id: '',
    violation_id: '',
    officer_id: '',
    status: 'Pending'
  });

  // NEW: State to store the report/summary after submission
  const [report, setReport] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/challan/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      
      if (response.ok) {
        alert("Success: Challan Created!");
        // NEW: Set the report data to show the summary
        setReport({
          ...formData,
          challan_id: data.id || 'N/A', // Assuming backend returns the new ID
          date: new Date().toLocaleString()
        });
      } else {
        alert("Database Error: " + data.error); 
      }
    } catch (err) {
      alert("Server is not responding. Check your terminal!");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Issue New Traffic Challan</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="number" placeholder="Vehicle ID (Use 1)" onChange={(e) => setFormData({...formData, vehicle_id: e.target.value})} style={styles.input} required />
        <input type="number" placeholder="Violation ID (Use 1)" onChange={(e) => setFormData({...formData, violation_id: e.target.value})} style={styles.input} required />
        <input type="number" placeholder="Officer ID (Use 1)" onChange={(e) => setFormData({...formData, officer_id: e.target.value})} style={styles.input} required />
        <select onChange={(e) => setFormData({...formData, status: e.target.value})} style={styles.input}>
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
        </select>
        <button type="submit" style={styles.button}>Generate Challan</button>
      </form>

      {/* NEW: Challan Summary Report Section */}
      {report && (
        <div style={styles.reportCard}>
          <h3 style={{ borderBottom: '2px solid #333', paddingBottom: '5px' }}>Challan Summary</h3>
          <p><strong>Challan No:</strong> {report.challan_id}</p>
          <p><strong>Vehicle ID:</strong> {report.vehicle_id}</p>
          <p><strong>Violation ID:</strong> {report.violation_id}</p>
          <p><strong>Issued By Officer:</strong> {report.officer_id}</p>
          <p><strong>Status:</strong> <span style={{color: report.status === 'Paid' ? 'green' : 'red'}}>{report.status}</span></p>
          <p style={{fontSize: '12px', color: '#666', marginTop: '10px'}}>Date: {report.date}</p>
          <button onClick={() => window.print()} style={styles.printButton}>Print Report</button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { maxWidth: '400px', margin: '50px auto', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', backgroundColor: '#fff' },
  title: { textAlign: 'center', color: '#333', marginBottom: '20px' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  input: { padding: '12px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px' },
  button: { padding: '12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' },
  // Styles for the Summary Report
  reportCard: { marginTop: '30px', padding: '15px', border: '1px dashed #333', backgroundColor: '#f9f9f9', borderRadius: '5px', lineHeight: '1.6' },
  printButton: { marginTop: '10px', width: '100%', padding: '8px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }
};

export default ChallanForm;