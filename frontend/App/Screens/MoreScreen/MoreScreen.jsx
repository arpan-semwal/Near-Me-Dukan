import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

export default function MoreScreen() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://172.16.16.19:3000/');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {data ? (
          data.map(item => (
            <View key={item.id} style={styles.itemContainer}>
              <Text style={styles.stateName}>{item.state_name}</Text>
              <Text style={styles.stateCode}>{item.state_code}</Text>
            </View>
          ))
        ) : (
          <Text>Loading...</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    marginBottom: 10,
  },
  stateName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  stateCode: {
    fontSize: 16,
  },
});
