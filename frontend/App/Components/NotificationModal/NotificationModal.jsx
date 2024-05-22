import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

const NotificationModal = ({ visible, message, onClose }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10 }}>
          <Text style={{ fontSize: 18 }}>{message}</Text>
          <TouchableOpacity onPress={onClose} style={{ marginTop: 20 }}>
            <Text style={{ color: 'blue', fontSize: 16 }}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default NotificationModal;
