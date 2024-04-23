import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
 
import { useNavigation } from '@react-navigation/native';

export default function PreferredShops({route}) {
	const  {phoneNumber} = route.params || {};
  const [preferredShops, setPreferredShops] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPreferredShops = async () => {
      try {
        const response = await fetch(`http://192.168.29.68:3000/preferredShops/${phoneNumber}`);
        const data = await response.json();
        console.log('Fetched preferred shops:', data); // Check the fetched data
        setPreferredShops(data);
      } catch (error) {
        console.error('Error fetching preferred shops:', error);
        // Handle error if unable to fetch preferred shops
      }
    };

    fetchPreferredShops();
  }, [phoneNumber]);

  const renderPreferredShops = () => {
    if (preferredShops.length === 0) {
      return <Text>No preferred shops found</Text>;
    }

    return preferredShops.map((shop, index) => (
      <TouchableOpacity key={index} onPress={() => navigateToShop(shop)}>
        <View style={styles.shopItem}>
          <Text>{shop.phoneNumber}</Text>
          {/* Add other details as needed */}
        </View>
      </TouchableOpacity>
    ));
  };

  const navigateToShop = (shop) => {
    // Implement navigation logic to navigate to the selected shop
  };

  return (
    <View>
      <Text >{phoneNumber}</Text>
      <ScrollView>
        {renderPreferredShops()}
      </ScrollView>
    </View>
  );
}
