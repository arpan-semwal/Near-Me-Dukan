import React from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

const INITIAL_REGION = {
	latitude: 30.3165,
	longitude: 78.0322,
	latitudeDelta: 0.0922,
	longitudeDelta: 0.0421
};



export default function MyAddress() {
  return (
    <View style={{flex:1}}>
      <MapView style={StyleSheet.absoluteFill}
	  provider={PROVIDER_GOOGLE} 
	  initialRegion={INITIAL_REGION}
	  showsUserLocation
	  showsMyLocationButton
	  />
    </View>
  );
}

 
