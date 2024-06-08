import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Alert, Modal, TextInput , StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../../../../utils/Colors';


export default function SearchShops({ route }) {
  const { phoneNumber, userType, firstcustomerName, pincode, custPhoneNumber, selectedCategory  , shopID} = route.params || {};
  const navigation = useNavigation();
  const [showChangePincode, setShowChangePincode] = useState(false);
  const [newPincode, setNewPincode] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [filteredShops, setFilteredShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedShops, setSelectedShops] = useState([]);

  useEffect(() => {
    const loadLikedShops = async () => {
      try {
        const likedShops = await AsyncStorage.getItem('likedShops');
        if (likedShops !== null) {
          setSelectedShops(JSON.parse(likedShops));
        }
      } catch (error) {
        console.error('Error loading liked shops:', error);
      }
    };
    loadLikedShops();
  }, []);
  
  

  const handleSubmit = () => {
    setShowChangePincode(true);
  };

  const handlePincodeChange = async () => {
    if (newPincode.trim() === '') {
      Alert.alert('Invalid Pincode', 'Please enter a valid pincode.');
      return;
    }

    try {
      const response = await fetch('http://172.16.16.41:3000/updatePincode', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
          newPincode: newPincode,
        }),
      });
      if (response.ok) {
        fetchShopsInArea(newPincode);
        setShowChangePincode(false);
        Alert.alert('Success', 'Pincode changed successfully');
      } else {
        console.error('Failed to update pincode:', response.statusText);
        Alert.alert('Error', 'Failed to change pincode');
      }
    } catch (error) {
      console.error('Error updating pincode:', error);
      Alert.alert('Error', 'Failed to change pincode');
    }
  };

  useEffect(() => {
    fetchCustomerDetails();
  }, []);

  useEffect(() => {
    if (pincode) {
      fetchShopsInArea(pincode);
    }
  }, [pincode, selectedCategory]);

  const fetchCustomerDetails = async () => {
    try {
      const response = await fetch(`http://172.16.16.41:3000/customerDetails/${phoneNumber}`);
      const data = await response.json();
      setCustomerName(data.name);
      setNewPincode(data.pincode);
    } catch (error) {
      console.error('Error fetching customer details:', error);
      setError('Error fetching customer details');
    }
  };

 const fetchShopsInArea = async (pincode) => {
  setLoading(true);
  try {
    const response = await fetch(`http://172.16.16.41:3000/shopsInArea/${pincode}`);
    const data = await response.json();

    let filteredData = data;

    if (selectedCategory) {
      filteredData = filteredData.filter(shop => shop.selectedCategory === selectedCategory);
    }

    if (shopID) {
      const shopWithID = filteredData.find(shop => shop.phoneNumber === shopID);
      setFilteredShops(shopWithID ? [shopWithID] : []);
    } else {
      setFilteredShops(filteredData);
    }

    setError('');
  } catch (error) {
    console.error('Error fetching shops in area:', error);
    setError('Error fetching shops in area');
  } finally {
    setLoading(false);
  }
};

  

  const handleShopPress = (shop) => {
    const { phoneNumber, storeImage, shopkeeperName, shopType } = shop;

    if (shopType === 'product') {
      navigation.navigate('ShopkeeperMyProducts', { phoneNumber, storeImage, shopkeeperName, userType, shopID: shop.id, firstcustomerName, custPhoneNumber });
    } else if (shopType === 'service') {
      navigation.navigate('MyServices', { phoneNumber, storeImage, shopkeeperName, userType, shopID: shop.id, firstcustomerName, custPhoneNumber });
    }
  };

  const handleAddPreferredShop = async (shop) => {
    const isShopSelected = selectedShops.includes(shop.id);
    let updatedShops;

    if (isShopSelected) {
      updatedShops = selectedShops.filter(id => id !== shop.id);
      await removePreferredShop(shop.id);
    } else {
      updatedShops = [...selectedShops, shop.id];
      await addPreferredShop(shop);
    }

    setSelectedShops(updatedShops);

    try {
      await AsyncStorage.setItem('likedShops', JSON.stringify(updatedShops));
    } catch (error) {
      console.error('Error saving liked shops:', error);
    }
  };

  const addPreferredShop = async (shop) => {
    try {
      const response = await fetch('http://172.16.16.41:3000/addPreferredShop', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerPhoneNumber: phoneNumber,
          shopID: shop.id,
          shopkeeperName: shop.shopkeeperName,
          phoneNumber: shop.phoneNumber,
          selectedCategory: shop.selectedCategory,
          shopType: shop.shopType,
          pincode: shop.pincode,
        }),
      });

      if (!response.ok) {
        console.error('Failed to add preferred shop:', response.statusText);
        Alert.alert('Error', 'Failed to add preferred shop');
      }
    } catch (error) {
      console.error('Error adding preferred shop:', error);
      Alert.alert('Error', 'Failed to add preferred shop');
    }
  };

  const removePreferredShop = async (shopID) => {
    try {
      const response = await fetch('http://172.16.16.41:3000/removePreferredShop', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerPhoneNumber: phoneNumber,
          shopID: shopID,
        }),
      });

      if (!response.ok) {
        console.error('Failed to remove preferred shop:', response.statusText);
        Alert.alert('Error', 'Failed to remove preferred shop');
      }
    } catch (error) {
      console.error('Error removing preferred shop:', error);
      Alert.alert('Error', 'Failed to remove preferred shop');
    }
  };

  const renderSeparator = () => (
    <View style={styles.separator} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.leftContainer}>
          <Image source={require('../../../../../assets/logo.png')} style={styles.welcomeImage} />
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.welcomeText}>Welcome, {shopID}</Text>
          <Text style={styles.welcomeText}>Welcome, {phoneNumber}</Text>
          <Text style={styles.pincodeText}>Shops at Pincode: </Text>
          <TouchableOpacity onPress={handleSubmit}>
            <Text style={styles.changePincodeText}>Change Pincode</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.locationTextContainer}>
        <Text style={styles.locationText}>Shops in Your Location</Text>
      </View>
      {error ? (
  <Text style={styles.errorText}>{error}</Text>
) : (
  <FlatList
    data={filteredShops}
    renderItem={({ item }) => {
      if (shopID) {
        // Render only the shop with the specified shopID
        if (item.phoneNumber === shopID) {
          return (
            <View>
              <TouchableOpacity onPress={() => handleShopPress(item)}>
                <View style={styles.itemContainer}>
                  <View style={styles.shopDetails}>
                    <Text>{item.shopkeeperName}</Text>
                    <Text>Pincode: {item.pincode}</Text>
                    <Text>Shop: {item.selectedCategory}</Text>
                    <Text>Phone: {item.phoneNumber}</Text>
                  </View>
                  <TouchableOpacity onPress={() => handleAddPreferredShop(item)}>
                    <AntDesign
                      name={selectedShops.includes(item.id) ? "heart" : "hearto"}
                      size={24}
                      color={selectedShops.includes(item.id) ? "red" : "black"}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
              {renderSeparator()}
            </View>
          );
        } else {
          // Return an empty view if the item's phoneNumber doesn't match shopID
          return <View />;
        }
      } else {
        // Render all shops if shopID is null
        return (
          <View>
            <TouchableOpacity onPress={() => handleShopPress(item)}>
              <View style={styles.itemContainer}>
                <View style={styles.shopDetails}>
                  <Text>{item.shopkeeperName}</Text>
                  <Text>Pincode: {item.pincode}</Text>
                  <Text>Shop: {item.selectedCategory}</Text>
                  <Text>Phone: {item.phoneNumber}</Text>
                </View>
                <TouchableOpacity onPress={() => handleAddPreferredShop(item)}>
                  <AntDesign
                    name={selectedShops.includes(item.id) ? "heart" : "hearto"}
                    size={24}
                    color={selectedShops.includes(item.id) ? "red" : "black"}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            {renderSeparator()}
          </View>
        );
      }
    }}
    keyExtractor={(item) => item.id.toString()}
    ListEmptyComponent={<Text>No shops found</Text>}
  />
)}

      <Modal
        visible={showChangePincode}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Enter New Pincode"
              value={newPincode}
              onChangeText={setNewPincode}
            />
            <TouchableOpacity onPress={handlePincodeChange}>
              <Text style={styles.closeButton}>Change</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowChangePincode(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: Colors.BACKGROUND,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    leftContainer: {
        marginRight: 40,
        marginLeft: 20,
    },
    rightContainer: {
        flex: 1,
    },
    welcomeImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    pincodeText: {
        fontSize: 16,
        marginBottom: 5,
    },
    changePincodeText: {
        color: '#9F9F9F',
        fontSize: 14,
        marginBottom: 20,
    },
    locationTextContainer: {
        alignItems: 'center',
        marginBottom: 20,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    locationText: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    separator: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent background
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    button: {
        backgroundColor: Colors.BUTTONCOLOR,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    closeButton: {
        color: 'blue',
        fontSize: 16,
        marginTop: 10,
    },
    shopDetails: {
        flex: 1,
    },
    heartIcon: {
        marginLeft: 10,
    },
});
