import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import Colors from '../../utils/Colors';
import { useNavigation } from '@react-navigation/native';

export default function CustomerHomePage({ route }) {
  const { name, pincode } = route.params || {};
  const navigation = useNavigation();
  
  const navigateToScreen = (screenName, params) => {
    navigation.navigate(screenName, params);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('../../../assets/logo.png')}
            style={styles.image}
          />
        </View>
        <Text style={styles.welcomeText}>Welcome, {name}</Text>
       
        <View style={styles.cardRow}>
          <View style={styles.card}>
            <TouchableOpacity onPress={() => navigateToScreen('PrefferedShops')}>
              <View style={styles.cardContent}>
                <View style={styles.iconWrapper}>
                  <FontAwesome5 name="shopping-cart" size={50} color="black" style={styles.icon} />
                </View>
                <Text style={styles.cardText}>My Preferred Shops</Text>
              </View>
            </TouchableOpacity>
          </View>
          
          <View style={styles.card}>
            <TouchableOpacity onPress={() => navigateToScreen('Orders')}>
              <View style={styles.cardContent}>
                <View style={styles.iconWrapper}>
                  <MaterialIcons name="menu-book" size={50} color="black" style={styles.icon} />
                </View>
                <Text style={styles.cardText}>My Orders</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.cardRow}>
          <View style={styles.card}>
            <TouchableOpacity onPress={() => navigateToScreen('MyAddress')}>
              <View style={styles.cardContent}>
                <View style={styles.iconWrapper}>
                  <MaterialCommunityIcons name="google-maps" size={50} color="black" style={styles.icon} />
                </View>
                <Text style={styles.cardText}>My Addresses</Text>
              </View>
            </TouchableOpacity>
          </View>
          
          <View style={styles.card}>
          <TouchableOpacity onPress={() => navigateToScreen('SearchShops', { pincode: pincode, name: name })}>
              <View style={styles.cardContent}>
              <View style={styles.iconWrapper}>
              <MaterialCommunityIcons name="shopping-search" size={50} color="black" style={styles.icon} />
        </View>
        <Text style={styles.cardText}>Search Shops</Text>
    </View>
</TouchableOpacity>
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
    backgroundColor: Colors.BACKGROUND,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  card: {
    width: '42%',
    height: 150,
    backgroundColor: '#FFF100',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  cardContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 16,
    paddingTop: 10,
    fontWeight: 'bold',
  },
  iconWrapper: {
    backgroundColor: 'white',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    backgroundColor: 'transparent',
  },
});
