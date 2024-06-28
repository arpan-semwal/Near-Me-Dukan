import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import Colors from '../../utils/Colors';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import {useEffect, useState} from 'react';
import {useCustomer} from '../../Context/ContextApi';
 


export default function CustomerHomePage({ route }) {
  const {  pincode , custPhoneNumber,userType ,   name  , phoneNumber  } = route.params || {};
  const [customerDetails, setCustomerDetails] = useState(null);
 
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [shopID, setShopID] = useState('');
  const { firstCustomerName, setFirstCustomerName } = useCustomer(); // Use useCustomer hook here
 const [customerPinode , setCustomerPincode] = useState();
  const navigation = useNavigation();

  const navigateToScreen = (screenName, params) => {
    navigation.navigate(screenName, params , selectedCategory);
  };
  
  
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
   
  };
  
  
  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await fetch(`http://192.168.29.67:3000/customerDetails/${phoneNumber}`);
        const data = await response.json();
        setCustomerDetails(data);
        setFirstCustomerName(data.name); // Set the customer's name
        setShopID(data.shop_id); // Set the customer's shop ID
        setCustomerPincode(data.pincode);
        
        
      } catch (error) {
        console.error('Error fetching customer details:', error);
      }
    };

    if (phoneNumber) {
      fetchCustomerDetails();
    }
  }, [phoneNumber]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('../../../assets/logo.png')}
            style={styles.image}
          />
        </View>
        <Text style={styles.welcomeText}>Welcome,{firstCustomerName}</Text>

        <View style={styles.cardRow}>
          <View style={styles.card}>
            <TouchableOpacity onPress={() => navigateToScreen('PrefferedShops', {  firstcustomerName: firstCustomerName, shopID: shopID  , phoneNumber:phoneNumber})}>
              <View style={styles.cardContent}>
                <View style={styles.iconWrapper}>
                  <FontAwesome5 name="shopping-cart" size={50} color="black" style={styles.icon} />
                </View>
                <Text style={styles.cardText}>My Preferred Shops</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <TouchableOpacity onPress={() => navigateToScreen('Orders'  ,{   firstcustomerName: firstCustomerName, shopID: shopID,    userType:userType })}>
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
            <TouchableOpacity onPress={() => navigateToScreen('MyAddress' , {   firstcustomerName: firstCustomerName, shopID: shopID,  phoneNumber:phoneNumber , userType:userType }) }>
              <View style={styles.cardContent}>
                <View style={styles.iconWrapper}>
                  <MaterialCommunityIcons name="google-maps" size={50} color="black" style={styles.icon} />
                </View>
                <Text style={styles.cardText}>My Addresses</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <TouchableOpacity onPress={() => navigateToScreen('SearchShops', {   firstcustomerName: firstCustomerName, shopID: shopID,  userType:userType , phoneNumber:phoneNumber , selectedCategory:selectedCategory  , customerPinode:customerPinode })}>
              <View style={styles.cardContent}>
                <View style={styles.iconWrapper}>
                  <MaterialCommunityIcons name="shopping-search" size={50} color="black" style={styles.icon} />
                </View>
                <Text style={styles.cardText}>Search Shops</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text style={styles.headingText}>Types of shops</Text>
        </View>

        <View style={styles.container1}>
          <TouchableOpacity onPress={() => handleCategorySelect('Vegetable Shop')}>
            <View style={styles.iconContainer}>
              <Icon name="home" size={30} style={styles.icon1} />
              <Text style={styles.iconHeading}>Vegetable</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCategorySelect('Stationary')}>
            <View style={styles.iconContainer}>
              <Icon name="search" size={30} style={styles.icon1} />
              <Text style={styles.iconHeading}>Stationary</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCategorySelect('Grocery Shop')}>
            <View style={styles.iconContainer}>
              <Icon name="user" size={30} style={styles.icon1} />
              <Text style={styles.iconHeading}>Grocery</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCategorySelect('Salon Shop')}>
            <View style={styles.iconContainer}>
              <Icon name="bell" size={30} style={styles.icon1} />
              <Text style={styles.iconHeading}>Salon</Text>
            </View>
          </TouchableOpacity>
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
  container1: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFF100', // Background color of the bar
    height: 60, // Height of the bar
    paddingHorizontal: 10, // Added padding from the sides
    marginHorizontal: 10, // Added margin from the sides
    borderTopColor: '#ccc', // Optional: border color
    alignSelf: 'stretch', // Make the container occupy the full width
    borderRadius: 15,
  },
  iconContainer: {
    alignItems: 'center',
    top:40,
    marginBottom: 10, // Add margin bottom to create space between icons and headings
  },
  icon1: {
    color: '#333',
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 10,
  },
  iconHeading: {
    fontWeight: 'bold',
    marginTop: 5, // Adjust this value to add space between the icons and headings
  },
  headingText:{
    fontSize:16,
    fontWeight:"bold"
  }
});
