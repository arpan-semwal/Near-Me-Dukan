import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Picker } from 'react-native';

const DateSelector = () => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const handleAppointment = () => {
    // Logic to handle appointment
    const selectedDate = `${day}-${month}-${year}`;
    console.log("Appointment date:", selectedDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Appointment Date</Text>
      <View style={styles.dateContainer}>
        <Picker
          style={styles.picker}
          selectedValue={day}
          onValueChange={(itemValue) => setDay(itemValue)}>
          <Picker.Item label="Day" value="" />
          {/* Render days dynamically */}
          {Array.from({ length: 31 }, (_, i) => (
            <Picker.Item key={i + 1} label={`${i + 1}`} value={`${i + 1}`} />
          ))}
        </Picker>
        <Picker
          style={styles.picker}
          selectedValue={month}
          onValueChange={(itemValue) => setMonth(itemValue)}>
          <Picker.Item label="Month" value="" />
          <Picker.Item label="January" value="January" />
          <Picker.Item label="February" value="February" />
          <Picker.Item label="March" value="March" />
          <Picker.Item label="April" value="April" />
          <Picker.Item label="May" value="May" />
          <Picker.Item label="June" value="June" />
          <Picker.Item label="July" value="July" />
          <Picker.Item label="August" value="August" />
          <Picker.Item label="September" value="September" />
          <Picker.Item label="October" value="October" />
          <Picker.Item label="November" value="November" />
          <Picker.Item label="December" value="December" />
        </Picker>
        <Picker
          style={styles.picker}
          selectedValue={year}
          onValueChange={(itemValue) => setYear(itemValue)}>
          <Picker.Item label="Year" value="" />
          {/* Render years dynamically */}
          {Array.from({ length: 10 }, (_, i) => (
            <Picker.Item key={i + 2022} label={`${i + 2022}`} value={`${i + 2022}`} />
          ))}
        </Picker>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleAppointment}>
        <Text style={styles.buttonText}>Set Appointment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  picker: {
    flex: 1,
    height: 50,
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DateSelector;
