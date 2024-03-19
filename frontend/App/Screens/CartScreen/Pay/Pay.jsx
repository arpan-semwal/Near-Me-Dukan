import React, { useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Pay = () => {
  const scaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const animatedStyle = {
    transform: [{ scale: scaleValue }],
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../../../../assets/logo.png')}
        style={styles.logo}
      />

      {/* Checked Icon */}
      <Animated.View style={[styles.iconContainer, animatedStyle]}>
        <AntDesign name="checkcircleo" size={Dimensions.get('window').width * 0.4} color="#00B20E" />
      </Animated.View>

      {/* Order Placed Text */}
      <Text style={styles.orderPlacedText}>Order Placed Successfully</Text>

      {/* Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Go to Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').width * 0.4,
    marginBottom: 30,
  },
  iconContainer: {
    marginBottom: 20,
  },
  orderPlacedText: {
    fontSize: Dimensions.get('window').width * 0.06,
    fontWeight: 'bold',
    marginBottom: 20,
    color: "#00B20E",
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: Dimensions.get('window').width * 0.04,
    fontWeight: 'bold',
  },
});

export default Pay;
