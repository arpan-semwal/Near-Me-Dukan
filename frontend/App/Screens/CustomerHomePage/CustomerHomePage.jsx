import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../utils/Colors';

export default function CustomerHomePage({ route }) {
  const { name } = route.params || {};

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('../../../assets/logo.png')} // Specify the path to your image
            style={styles.image}
          />
        </View>
        <Text style={styles.welcomeText}>Hello, {name}</Text>
        
        <View style={styles.cardRow}>
          <View style={styles.card}>
            <FontAwesome5 name="shopping-cart" size={50} color="black" />
            <Text style={styles.cardText}>My Preferred Shops</Text>
          </View>
          <View style={styles.card}>
            <MaterialIcons name="menu-book" size={50} color="black" />
            <Text style={styles.cardText}>My Orders</Text>
          </View>
        </View>
        <View style={styles.cardRow}>
          <View style={styles.card}>
            <MaterialCommunityIcons name="google-maps" size={50} color="black" />
            <Text style={styles.cardText}>My Addresses</Text>
          </View>
          <View style={styles.card}>
            <MaterialCommunityIcons name="shopping-search" size={50} color="black" />
            <Text style={styles.cardText}>Search Shops</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor:Colors.BACKGROUND
    
  },
  container: {
    flex: 1,
    alignItems: 'center',
     // Center content horizontally
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
  },
  image: {
    width: 100, // Adjust width according to your image
    height: 100, // Adjust height according to your image
    
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20, // Increase margin bottom to increase space between rows
  },
  card: {
    width: '42%', // Adjust the width according to your design
    height: 150, // Adjust the height according to your design
    backgroundColor: '#FFF100',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10, // Add margin between cards horizontally
  },
  cardText: {
    fontSize: 16,
    paddingTop: 10,
    fontWeight: 'bold',
  },
});
