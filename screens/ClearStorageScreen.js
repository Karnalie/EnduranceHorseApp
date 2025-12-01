// screens/ClearStorageScreen.js
// Developer-only screen to clear all stored horses with confirmation modal

import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  Alert,
} from 'react-native';

import SafeScreenWrapper from '../components/SafeScreenWrapper';
import { saveHorsesToStorage } from '../utils/horseStorage';
import {
  TITLE_TEXT,
  BUTTON_STYLE,
  BUTTON_TEXT,
  COLORS,
  MODAL_OVERLAY,
  MODAL_CONTENT,
  MODAL_TITLE,
  MODAL_TEXT,
} from '../styles/theme';

export default function ClearStorageScreen({ navigation }) {
  const [isConfirming, setIsConfirming] = useState(false); // Controls visibility of confirmation modal

  // Clears horse data from local storage and navigates home
  const clearData = async () => {
    await saveHorsesToStorage([]);
    setIsConfirming(false);
    navigation.navigate('Home');
  };

  return (
    <SafeScreenWrapper>
      {/* Screen Title */}
      <Text style={[TITLE_TEXT, { marginBottom: 30 }]}>Clear Storage</Text>

      {/* Developer Button */}
      <Pressable
        style={[BUTTON_STYLE, { backgroundColor: COLORS.red }]}
        onPress={() => setIsConfirming(true)}
      >
        <Text style={BUTTON_TEXT}>Clear All Horses (Dev Only)</Text>
      </Pressable>

      {/* Confirmation Modal */}
      <Modal visible={isConfirming} transparent animationType="fade">
        <View style={MODAL_OVERLAY}>
          <View style={MODAL_CONTENT}>
            <Text style={MODAL_TITLE}>Are you sure?</Text>
            <Text style={MODAL_TEXT}>
              This will permanently delete all horses from local storage.
            </Text>

            {/* Modal Buttons */}
            <View style={{ flexDirection: 'row', width: '100%' }}>
              {/* Cancel */}
              <Pressable
                style={{
                  flex: 1,
                  padding: 10,
                  marginRight: 5,
                  backgroundColor: COLORS.lightGray,
                  borderRadius: 5,
                  alignItems: 'center',
                }}
                onPress={() => setIsConfirming(false)}
              >
                <Text style={{ fontWeight: 'bold', color: COLORS.darkGray }}>Cancel</Text>
              </Pressable>

              {/* Delete */}
              <Pressable
                style={{
                  flex: 1,
                  padding: 10,
                  marginLeft: 5,
                  backgroundColor: COLORS.red,
                  borderRadius: 5,
                  alignItems: 'center',
                }}
                onPress={clearData}
              >
                <Text style={{ fontWeight: 'bold', color: 'white' }}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeScreenWrapper>
  );
}
