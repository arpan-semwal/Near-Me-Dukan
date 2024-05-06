import { useState } from 'react';
import axios from 'axios';

export default function AddSalesAssociate() {
  const [formData, setFormData] = useState({
    mobileNo: '',
    firstName: '',
    lastName: '',
    pincode: '',
    upi: '',
    pancard: '',
    aadhar: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/sales-executives', formData);
      console.log('Sales executive added successfully:', response.data);
      // Optionally, you can clear the form data after successful submission
      setFormData({
        mobileNo: '',
        firstName: '',
        lastName: '',
        pincode: '',
        upi: '',
        pancard: '',
        aadhar: ''
      });
    } catch (error) {
      console.error('Error adding sales executive:', error);
    }
  };

  return (
    <div className="sales-associate-form">
      <h2 style={{ color: 'green' }}>Sales Associates - Add a Sales Associate</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="mobileNo">Mobile No:</label>
          <input type="text" id="mobileNo" name="mobileNo" value={formData.mobileNo} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="pincode">Pincode:</label>
          <input type="text" id="pincode" name="pincode" value={formData.pincode} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="upi">UPID:</label>
          <input type="text" id="upi" name="upi" value={formData.upi} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="pancard">Pancard:</label>
          <input type="text" id="pancard" name="pancard" value={formData.pancard} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="aadhar">Aadhar Card:</label>
          <input type="text" id="aadhar" name="aadhar" value={formData.aadhar} onChange={handleChange} />
        </div>
        <button type="submit" className="add-button">Add</button>
      </form>
    </div>
  );
}
