import { useState, useEffect } from 'react';
import axios from 'axios';
import "./styles.css"; // Import CSS file for styling
import baseURL from '../../metro';

function AdminLogin() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [adminPhoneNumber, setAdminPhoneNumber] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch admin's phone number from the backend
    axios.get(`${baseURL}/phone-number`)
      .then(response => {
        setAdminPhoneNumber(response.data.phoneNumber);
      })
      .catch(error => {
        console.error('Error fetching admin phone number:', error);
        setError('Failed to fetch admin phone number');
      });
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  const handleLogin = () => {
    // Validate phone number
    if (!phoneNumber) {
      setError('Please enter a phone number');
      return;
    }

    // Check if entered phone number matches admin's phone number
    if (phoneNumber === adminPhoneNumber) {
      // Admin phone number matched, navigate to homepage
      setError('');
      console.log('Login successful');
      // Redirect to homepage or perform other actions
      // Replace the following line with navigation logic to your homepage
      window.location.href = '/otp';
    } else {
      setError('Invalid phone number');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <div>
        <label>Phone Number:{baseURL}</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
        />
      </div>
      <div className="button-container">
        <button className="login-button" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default AdminLogin;


 