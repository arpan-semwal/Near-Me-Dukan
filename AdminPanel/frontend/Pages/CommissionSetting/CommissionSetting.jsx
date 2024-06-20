import  { useState } from 'react';
import axios from 'axios';

function CommissionSetting() {
  const [commissionRates, setCommissionRates] = useState([
    { commissionType: 'L0', amount: '500.00' },
    { commissionType: 'L1', amount: '250.00' },
    { commissionType: 'L2', amount: '100.00' }
  ]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedRates = [...commissionRates];
    updatedRates[index][name] = value;
    setCommissionRates(updatedRates);
  };

  const handleUpdateRates = () => {
    axios.put('http://localhost/commission_rates', commissionRates)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error updating commission rates:', error);
      });
  };

  return (
    <div>
      <h2>Commission Setting</h2>
      <table>
        <thead>
          <tr>
            <th>Commission Type</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {commissionRates.map((rate, index) => (
            <tr key={rate.commissionType}>
              <td>{rate.commissionType}</td>
              <td>
                <input
                  type="text"
                  name="amount"
                  value={rate.amount}
                  onChange={event => handleInputChange(index, event)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleUpdateRates}>Update Rates</button>
    </div>
  );
}

export default CommissionSetting;
