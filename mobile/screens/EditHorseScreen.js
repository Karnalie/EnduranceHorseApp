// screens/EditHorseScreen.js
// Allows editing of an existing horse profile using shared styling

import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import SafeScreenWrapper from '../components/SafeScreenWrapper';
import {
  TITLE_TEXT,
  LABEL_TEXT,
  INPUT_STYLE,
  BUTTON_STYLE,
  BUTTON_TEXT,
} from '../styles/theme';
import {
  getHorsesFromStorage,
  saveHorsesToStorage,
} from '../utils/horseStorage';

export default function EditHorseScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { horse } = route.params;

  // Populate fields from existing horse
  const [name, setName] = useState(horse.name);
  const [dob, setDob] = useState(horse.dob);
  const [gender, setGender] = useState(horse.gender);

  // Format input as YYYY-MM-DD while typing
  const handleDobChange = (text) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    let formatted = '';
    if (cleaned.length >= 4) {
      formatted += cleaned.slice(0, 4);
      if (cleaned.length >= 6) {
        formatted += '-' + cleaned.slice(4, 6);
        if (cleaned.length >= 8) {
          formatted += '-' + cleaned.slice(6, 8);
        }
      }
    } else {
      formatted = cleaned;
    }
    setDob(formatted);
  };

  // Save changes to storage
  const handleSave = async () => {
    if (!name || !dob || !gender) {
      alert('Please fill in all fields.');
      return;
    }

    const horses = await getHorsesFromStorage();
    const updatedHorses = horses.map((h) =>
      h.id === horse.id ? { ...h, name, dob, gender } : h
    );

    await saveHorsesToStorage(updatedHorses);
    navigation.goBack();
  };

  return (
    <SafeScreenWrapper>
      {/* Screen Title */}
      <Text style={[TITLE_TEXT, { marginBottom: 30 }]}>Edit Horse</Text>

      {/* Horse Name */}
      <Text style={LABEL_TEXT}>Horse Name</Text>
      <TextInput
        style={INPUT_STYLE}
        value={name}
        onChangeText={setName}
        placeholder="Enter horse name"
      />

      {/* Date of Birth */}
      <Text style={LABEL_TEXT}>Date of Birth (yyyy-mm-dd)</Text>
      <TextInput
        style={INPUT_STYLE}
        value={dob}
        onChangeText={handleDobChange}
        keyboardType="numeric"
        placeholder="YYYY-MM-DD"
        maxLength={10}
      />

      {/* Gender */}
      <Text style={LABEL_TEXT}>Gender</Text>
      <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 6, marginBottom: 20 }}>
        <Picker selectedValue={gender} onValueChange={(itemValue) => setGender(itemValue)}>
          <Picker.Item label="Select gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>

      {/* Save Button */}
      <Pressable style={BUTTON_STYLE} onPress={handleSave}>
        <Text style={BUTTON_TEXT}>Save Changes</Text>
      </Pressable>
    </SafeScreenWrapper>
  );
}
