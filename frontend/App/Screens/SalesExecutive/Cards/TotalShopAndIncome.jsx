import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

export default function TotalShopAndIncome({ route }) {
  const [totalCommission, setTotalCommission] = useState(0);
  const { mobileNumber } = route.params;

  useEffect(() => {
    axios.get(`http://192.168.29.67:3000/total-commission?mobileNumber=${mobileNumber}`)
      .then(response => {
        setTotalCommission(response.data.totalCommission);
      })
      .catch(error => {
        console.error('Error fetching total commission:', error);
      });
  }, [mobileNumber]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20 }}>Total Income</Text>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>₹ {totalCommission}</Text>
    </View>
  );
}
