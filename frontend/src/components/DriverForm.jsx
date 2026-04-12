import React, { useState } from 'react';
import { addDriver } from '../services/driverServices';

const DriverForm = ({ onDriverAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    license_number: '',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      await addDriver(formData);
      setSuccess('Driver added successfully!');
      setFormData({ name: '', license_number: '', phone: '' });
      if (onDriverAdded) {
        onDriverAdded();
      }
    } catch (err) {
      setError('Failed to add driver: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="driver-form-container">
      <h2 className="form-title">Add New Driver</h2>
      <form onSubmit={handleSubmit} className="driver-form">
        <div className="form-group">
          <label htmlFor="name">Driver Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter driver's full name"
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="license_number">License Number *</label>
          <input
            type="text"
            id="license_number"
            name="license_number"
            value={formData.license_number}
            onChange={handleChange}
            placeholder="Enter license number"
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
            className="form-input"
          />
        </div>

        {error && <div className="form-error">{error}</div>}
        {success && <div className="form-success">{success}</div>}

        <button type="submit" disabled={isLoading} className="form-button">
          {isLoading ? 'Adding...' : 'Add Driver'}
        </button>
      </form>
    </div>
  );
};

export default DriverForm;
