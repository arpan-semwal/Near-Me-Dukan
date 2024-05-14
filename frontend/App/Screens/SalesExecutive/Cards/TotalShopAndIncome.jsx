import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

export default function TotalShopAndIncome({ route }) {
  const { mobileNumber } = route.params;
  const [level, setLevel] = useState('');
  const [totalCommission, setTotalCommission] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user's level
    axios.get(`http://192.168.29.67:3000/user-level/${mobileNumber}`)
      .then(response => {
        setLevel(response.data.level);
      })
      .catch(error => {
        console.error('Error fetching user level:', error);
        setError('Error fetching user level');
      });
  }, [mobileNumber]);

  useEffect(() => {
    if (level) {
      // Fetch total commission based on user's level
      axios.get(`http://192.168.29.67:3000/total-commission/${mobileNumber}`)
        .then(response => {
          setTotalCommission(response.data.totalCommission);
        })
        .catch(error => {
          console.error('Error fetching total commission:', error);
          setError('Error fetching total commission: ' + error.message); // Update to include error message
        });
    }
  }, [mobileNumber, level]);

  console.log("Level:", level);
  console.log("Total Commission:", totalCommission);
  console.log("Error:", error);

  if (error) {
    return (
      <View>
        <Text>Error: {mobileNumber} {error}</Text>
      </View>
    );
  }

  return (
    <View>
      {level === 'L1' && (
        <Text>Total Commission Earned: ${totalCommission}</Text>
      )}
      {(level === 'L2' || level === 'L3') && (
        <Text>Total Commission Earned (Visible after registering a shop): ${totalCommission}</Text>
      )}
      {!level && (
        <Text>Loading...</Text>
      )}
    </View>
  );
}
