  
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import Colors from '../../../utils/Colors';
import {useCart} from '../../../Context/ContextApi';
 

export default function SalonsServices( ) {
   const {customerName , shopID , shopName , pincode} = useCart();
  const navigation = useNavigation();
  
  const navigateToScreen = (screenName, params) => {
    navigation.navigate(screenName, params);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.leftContainer}>
            <Image source={require('../../../../assets/logo.png')} style={styles.welcomeImage} />
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.welcomeText}>Welcome, {customerName}</Text>
            <Text style={styles.pincodeText}>Shops at Pincode: {pincode}</Text>
            <TouchableOpacity>
              <Text style={styles.changePincodeText}>Change Pincode</Text>
            </TouchableOpacity>
          </View>
        </View>
		 
        <Text style={styles.welcomeText1}>Hello , {customerName}</Text>
        <Text> Select a Service to Book</Text>
       
        <View style={styles.cardRow}>
          <View style={styles.card}>
            <TouchableOpacity onPress={() => navigateToScreen('PrefferedShops')}>
              <View style={styles.cardContent}>
                <View style={styles.iconWrapper}>
                  <FontAwesome5 name="shopping-cart" size={50} color="black" style={styles.icon} />
                </View>
                <Text style={styles.cardText}>Hair Cut</Text>
              </View>
            </TouchableOpacity>
          </View>
          
          <View style={styles.card}>
            <TouchableOpacity onPress={() => navigateToScreen('Orders')}>
              <View style={styles.cardContent}>
                <View style={styles.iconWrapper}>
                  <MaterialIcons name="menu-book" size={50} color="black" style={styles.icon} />
                </View>
                <Text style={styles.cardText}>Beard Grooming</Text>
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
                <Text style={styles.cardText}>Hair Cut + Beard Grooming</Text>
              </View>
            </TouchableOpacity>
          </View>
          
          <View style={styles.card}>
            <TouchableOpacity >
              <View style={styles.cardContent}>
                <View style={styles.iconWrapper}>
                  <MaterialCommunityIcons name="shopping-search" size={50} color="black" style={styles.icon} />
                </View>
                <Text style={styles.cardText}>Hair Colour</Text>
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
                <Text style={styles.cardText}>Nails</Text>
              </View>
            </TouchableOpacity>
          </View>
          
          <View style={styles.card}>
            <TouchableOpacity >
              <View style={styles.cardContent}>
                <View style={styles.iconWrapper}>
                  <MaterialCommunityIcons name="shopping-search" size={50} color="black" style={styles.icon} />
                </View>
                <Text style={styles.cardText}>Massages</Text>
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
  leftContainer: {
    marginRight: 40,
    marginLeft: 20
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
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  card: {
    width: '42%',
    height: 200,
    backgroundColor: '#44C7F4',
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
  welcomeText1:{
	fontWeight:"bold",
	fontSize:26,
	textAlign:"center"
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
  line: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    width: '100%',
    marginVertical: 10,
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
