import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ViewSalesAssociate() {
  const [salesAssociates, setSalesAssociates] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSalesAssociates() {
      try {
        const response = await axios.get('http://localhost:3001/sales-executives');
        setSalesAssociates(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sales associates:', error);
        setError(error.message);
        setLoading(false);
      }
    }

    fetchSalesAssociates();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Sales Associates</h2>
      <table>
        <thead>
          <tr>
            <th>Mobile No</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Pincode</th>
            <th>UPID</th>
            <th>Pancard</th>
            <th>Aadhar Card</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {salesAssociates.map((associate, index) => (
            <tr key={index}>
              <td>{associate.mobileNo}</td>
              <td>{associate.firstName}</td>
              <td>{associate.lastName}</td>
              <td>{associate.pincode}</td>
              <td>{associate.upi}</td>
              <td>{associate.pancard}</td>
              <td>{associate.aadhar}</td>
              <td>
                <Link to={`/update_sales/${associate.mobileNo}`}>Update</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
