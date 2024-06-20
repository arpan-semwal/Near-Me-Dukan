import   { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';
import baseURL from '../../../metro';

export default function UpdateSalesAssociate() {
  const [salesAssociate, setSalesAssociate] = useState({});
  const { mobileNo } = useParams();

  useEffect(() => {
    async function fetchSalesAssociate() {
      try {
        const response = await axios.get(`${baseURL}/sales-executives/${mobileNo}`);
        setSalesAssociate(response.data);
      } catch (error) {
        console.error('Error fetching sales associate:', error);
      }
    }

    fetchSalesAssociate();
  }, [mobileNo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalesAssociate({ ...salesAssociate, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${baseURL}/sales-executives/${mobileNo}`, salesAssociate);
      console.log('Sales executive updated successfully');
      // Optionally, you can redirect or show a success message here
    } catch (error) {
      console.error('Error updating sales executive:', error);
      // Optionally, you can show an error message here
    }
  };

  return (
    <div>
		<Navbar/>
      <h2>Update Sales Associate</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" name="firstName" value={salesAssociate.firstName || ''} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" name="lastName" value={salesAssociate.lastName || ''} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="pincode">Pincode:</label>
          <input type="text" id="pincode" name="pincode" value={salesAssociate.pincode || ''} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="upi">UPI:</label>
          <input type="text" id="upi" name="upi" value={salesAssociate.upi || ''} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="pancard">Pancard:</label>
          <input type="text" id="pancard" name="pancard" value={salesAssociate.pancard || ''} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="aadhar">Aadhar Card:</label>
          <input type="text" id="aadhar" name="aadhar" value={salesAssociate.aadhar || ''} onChange={handleChange} />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
