import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const CustomDrawer = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../../assets/logo.png')}
          style={styles.drawerImage}
        />
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  drawerImage: {
    width: 230, // Adjust width according to your image size
    height: 140, // Adjust height according to your image size
    resizeMode: 'contain', // or any other resizeMode property as per your requirement
  },
});

export default CustomDrawer;
