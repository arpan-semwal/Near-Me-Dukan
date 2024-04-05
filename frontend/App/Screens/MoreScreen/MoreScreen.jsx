import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

export default function MoreScreen() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.29.68:3000/');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {data ? <Text>{data}</Text> : <Text>Loading...</Text>}
    </View>
  );
}
