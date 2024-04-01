//import React, { useEffect, useState } from 'react';
//import { View, Text, StyleSheet, Dimensions, PermissionsAndroid, Platform } from 'react-native';
//import MapView, { Marker } from 'react-native-maps';

//const MyAddress = () => {
//  const [currentLocation, setCurrentLocation] = useState(null);

//  useEffect(() => {
//    const fetchLocation = async () => {
//      try {
//        if (Platform.OS === 'android') {
//          // Request location permission for Android
//          const granted = await PermissionsAndroid.request(
//            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//            {
//              title: 'Location Permission',
//              message: 'This app requires access to your location.',
//              buttonNeutral: 'Ask Me Later',
//              buttonNegative: 'Cancel',
//              buttonPositive: 'OK',
//            }
//          );
//          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//            console.log('Location permission denied');
//            return;
//          }
//        }

//        // Fetch current location
//        navigator.geolocation.getCurrentPosition(
//          position => {
//            const { latitude, longitude } = position.coords;
//            setCurrentLocation({ latitude, longitude });
//          },
//          error => {
//            console.error(error);
//          },
//          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//        );
//      } catch (err) {
//        console.error(err);
//      }
//    };

//    fetchLocation();
//  }, []);

//  return (
//    <View style={styles.container}>
//      <Text style={styles.title}>My Address</Text>
//      {currentLocation && (
//        <MapView
//          style={styles.map}
//          initialRegion={{
//            latitude: currentLocation.latitude,
//            longitude: currentLocation.longitude,
//            latitudeDelta: 0.0922,
//            longitudeDelta: 0.0421,
//          }}
//        >
//          <Marker
//            coordinate={{
//              latitude: currentLocation.latitude,
//              longitude: currentLocation.longitude,
//            }}
//            title="Your Location"
//          />
//        </MapView>
//      )}
//    </View>
//  );
//};

//const styles = StyleSheet.create({
//  container: {
//    flex: 1,
//    justifyContent: 'center',
//    alignItems: 'center',
//  },
//  title: {
//    fontSize: 24,
//    fontWeight: 'bold',
//    marginBottom: 20,
//  },
//  map: {
//    width: Dimensions.get('window').width - 40,
//    height: Dimensions.get('window').height / 2,
//  },
//});

//export default MyAddress;
import { View, Text } from 'react-native'
import React from 'react'

export default function MyAddress() {
  return (
	<View>
	  <Text>MyAddress</Text>
	</View>
  )
}
