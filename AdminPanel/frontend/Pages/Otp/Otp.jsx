import { useState } from 'react';

function Otp() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Check if entered OTP is correct
    if (otp === '1234') {
      // OTP is correct, navigate to the homepage
      window.location.href = '/homepage';
    } else {
 
      setError('Incorrect OTP');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>OTP Verification</h2>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      <div>
        <label style={{ marginRight: '10px' }}>Enter OTP:</label>
        <input
          type="text"
          value={otp}
          onChange={e => setOtp(e.target.value)}
          style={{ padding: '5px', marginRight: '10px' }}
        />
        <button onClick={handleLogin} style={{ padding: '5px 10px', borderRadius: '5px', backgroundColor: '#ff0000', color: '#fff', border: 'none', cursor: 'pointer' }}>Submit</button>
      </div>
    </div>
  );
}

export default Otp;
