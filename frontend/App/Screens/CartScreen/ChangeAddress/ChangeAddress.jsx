import React from 'react';
import { View, Text } from 'react-native';

export default function ChangeAddress({ route }) {
  const { address } = route.params;

  return (
    <View>
      <Text>Manage Addresses{address}</Text>
        {/* Render the address here */}
    </View>
  );
}
