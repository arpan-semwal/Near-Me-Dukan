import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet , Button } from 'react-native';

const IncomeCalculator = () => {
    const [shopsRegistered, setShopsRegistered] = useState('');
    const [monthlyIncome, setMonthlyIncome] = useState('');
    const [yearlyIncome, setYearlyIncome] = useState('');

    const calculateIncome = () => {
        const registered = parseInt(shopsRegistered) || 0;
        const monthly = registered * 500;
        const yearly = monthly * 12;

        setMonthlyIncome(monthly.toString());
        setYearlyIncome(yearly.toString());
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Number of Shops Registered:</Text>
            <TextInput
                style={styles.input}
                value={shopsRegistered}
                onChangeText={text => setShopsRegistered(text)}
                keyboardType="numeric"
                placeholder="Enter number of shops"
            />
            <View style={styles.resultRow}>
                <Text style={styles.label}>Monthly Income:</Text>
                <Text style={styles.result}>{monthlyIncome} Rupees</Text>
            </View>
            <View style={styles.resultRow}>
                <Text style={styles.label}>Yearly Income:</Text>
                <Text style={styles.result}>{yearlyIncome} Rupees</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Calculate" onPress={calculateIncome} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    resultRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    result: {
        fontSize: 16,
    },
    buttonContainer: {
        marginTop: 20,
    },
});

export default IncomeCalculator;
