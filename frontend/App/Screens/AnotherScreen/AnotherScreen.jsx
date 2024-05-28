import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AnotherScreen = () => {
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://nearkidukan.in/data');
      const data = await response.text();
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Fetching data from backend...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AnotherScreen;
