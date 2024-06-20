import { useState } from 'react';
import axios from 'axios';
import Navbar from "../../components/Navbar/Navbar"
import baseURL from '../../metro';
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
      const response = await axios.post(`${baseURL}/sales-executives`, formData);
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
    
    <div>
      <Navbar/>
       <div className="sales-associate-form" style={{ textAlign: 'center' }}>
      <h2 style={{ color: 'green' }}>Sales Associates - Add a Sales Associate</h2>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <div className="form-group" style={{ marginRight: '20px' }}>
          <label htmlFor="mobileNo">Sales Associate Mobile No:</label>
          <input type="text" id="mobileNo" name="mobileNo" value={formData.mobileNo} onChange={handleChange} />
        </div>
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', marginRight: '20px' }}>
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
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
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
         <div>
         <button type="submit" className="add-button" style={{ marginTop: '20px' }}>Add</button>
         </div>
        </div>
       
      </form>
    </div>
    </div>
   
  );
}
