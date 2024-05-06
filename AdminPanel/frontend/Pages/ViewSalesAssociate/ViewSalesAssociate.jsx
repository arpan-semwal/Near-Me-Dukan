import   { useState, useEffect } from 'react';
import axios from 'axios';

export default function ViewSalesAssociate() {
  const [salesAssociates, setSalesAssociates] = useState([]);

  useEffect(() => {
    async function fetchSalesAssociates() {
      try {
        const response = await axios.get('http://localhost:3001/sales-executives');
        setSalesAssociates(response.data);
      } catch (error) {
        console.error('Error fetching sales associates:', error);
      }
    }

    fetchSalesAssociates();
  }, []);

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
            <th>View Profile</th>
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
              <td><button>View</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
