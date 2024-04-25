 
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import Colors from '../../../utils/Colors';
import { useNavigation } from '@react-navigation/native';
import {useCart} from '../../../Context/ContextApi';

export default function BarberHomePage({ route }) {
  const { name, pincode, shopID , phoneNumber , userType  } = route.params || {};
  const {customerName} = useCart();
  const navigation = useNavigation();
  
  const navigateToScreen = (screenName, params) => {
    navigation.navigate(screenName, params);
  };
  
 

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
	  <View style={styles.headerContainer}>
          <Image
            source={require('../../../../assets/logo.png')}
            style={styles.storeImage}
          />
        </View>
        <Text style={styles.welcomeText}>Welcome, {phoneNumber}</Text>
       
        <View style={styles.cardRow}>
          <View style={styles.card}>
            <TouchableOpacity onPress={() => navigateToScreen('PrefferedShops', { pincode: pincode, name: name , shopID:shopID,phoneNumber:phoneNumber ,userType , name:name})}>
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
            <TouchableOpacity onPress={() => navigateToScreen('BarberSearchShops', { pincode: pincode, name: name , shopID:shopID,phoneNumber:phoneNumber , userType:userType  , name:name })}>
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
	headerContainer: {
	  flexDirection: 'row',
	  alignItems: 'center',
	  marginBottom: 20,
	},
	storeImage: {
	  width: 100,
	  height: 100,
	},
	headerText: {
	  marginLeft: 10,
	},
	welcomeText: {
	  fontSize: 26,
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
	  height: 200,
	  backgroundColor: '#80461A',
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
	  top: 40,
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
	headingText: {
	  fontSize: 16,
	  fontWeight: "bold"
	}
  });