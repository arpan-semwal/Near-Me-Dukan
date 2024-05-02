import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';

const AppointmentPicker = ({ onDateSelect, onTimeSelect }) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirmDate = (date) => {
        const formattedDate = moment(date).format('YYYY-MM-DD');
        setSelectedDate(formattedDate);
        onDateSelect(formattedDate); // Callback to parent component
        hideDatePicker();
    };

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleConfirmTime = (time) => {
        const formattedTime = moment(time).format('HH:mm');
        setSelectedTime(formattedTime);
        onTimeSelect(formattedTime); // Callback to parent component
        hideTimePicker();
    };

    const handleAppointment = () => {
        // Handle appointment logic here, e.g., submit the selected date and time
        console.log('Selected Date:', selectedDate);
        console.log('Selected Time:', selectedTime);
    };

    return (
        <View style={styles.container}>
            <View style={styles.line}></View>
            <Text style={styles.text}>Select a Date</Text>
            <TouchableOpacity onPress={showDatePicker} style={styles.button}>
                <Text style={styles.buttonText}> {selectedDate || 'Select a Date'}</Text>
            </TouchableOpacity>
            <Text style={styles.text}>Select a Time</Text>
            <TouchableOpacity onPress={showTimePicker} style={styles.button}>
                <Text style={styles.buttonText}> {selectedTime || 'Select a Time'}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirmDate}
                onCancel={hideDatePicker}
            />
            <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleConfirmTime}
                onCancel={hideTimePicker}
            />
            <TouchableOpacity style={styles.makeAppointmentButton} onPress={handleAppointment}>
                <Text style={styles.buttonText}>Make Appointment</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        backgroundColor: "#808080"
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '80%',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#dcdcdc',
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginVertical: 10,
        borderRadius: 20,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: "black",
        fontWeight: 'bold',
    },
    text: {
        color: "white",
    },
    makeAppointmentButton: {
        backgroundColor: '#3498db',
        paddingVertical: 15,
        paddingHorizontal: 50,
        marginVertical: 20,
        borderRadius: 20,
        width: '80%',
        alignItems: 'center',
    },
});

export default AppointmentPicker;
