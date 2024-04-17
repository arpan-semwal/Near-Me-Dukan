import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';


export default function Inventory({ route }) {
    // Destructure selectedSubCategory from route.params
    const { selectedSubCategory } = route.params;

    return (
        <View>
            <Text>Inventory</Text>
            {/* Display the selected subcategory */}
            <Text>Selected Subcategory: {selectedSubCategory}</Text>
        </View>
    );
}
