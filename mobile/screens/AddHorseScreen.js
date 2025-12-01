// screens/AddHorseScreen.js
// Form to add a new horse (name, DOB, gender)

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  Pressable,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import uuid from 'react-native-uuid';
import SafeScreenWrapper from '../components/SafeScreenWrapper';
import { saveHorseToStorage } from '../utils/horseStorage';
import {
  TITLE_TEXT,
  LABEL_TEXT,
  INPUT_STYLE,
  BUTTON_STYLE,
  BUTTON_TEXT,
  PICKER_WRAPPER,
  PICKER_STYLE,
} from '../styles/theme';

export default function AddHorseScreen({ navigation }) {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');

  // Automatically insert hyphens as user types DOB
  const handleDobChange = (text) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    let formatted = cleaned;

    if (cleaned.length > 4) {
      formatted = cleaned.slice(0, 4) + '-' + cleaned.slice(4);
    }
    if (cleaned.length > 6) {
      formatted = formatted.slice(0, 7) + '-' + cleaned.slice(6, 8);
    }
    setDob(formatted);
  };

  // Save horse and navigate back
  const handleSave = async () => {
    if (!name || !dob || !gender || gender === 'Please select gender') {
      Alert.alert('Missing Fields', 'Please fill in all fields');
      return;
    }

    const newHorse = {
      id: uuid.v4(),
      name,
      dob,
      gender,
    };

    await saveHorseToStorage(newHorse);
    navigation.navigate('ViewHorses');
  };

  return (
    <SafeScreenWrapper>
      <Text style={TITLE_TEXT}>Add Horse</Text>

      <Text style={LABEL_TEXT}>Horse Name</Text>
      <TextInput
        style={INPUT_STYLE}
        value={name}
        onChangeText={setName}
        placeholder="Enter name"
      />

      <Text style={LABEL_TEXT}>Date of Birth (yyyy-mm-dd)</Text>
      <TextInput
        style={INPUT_STYLE}
        value={dob}
        onChangeText={handleDobChange}
        placeholder="yyyy-mm-dd"
        keyboardType="numeric"
        maxLength={10}
      />

      <Text style={LABEL_TEXT}>Gender</Text>
      <View style={PICKER_WRAPPER}>
        <Picker
          selectedValue={gender}
          onValueChange={(value) => setGender(value)}
          style={PICKER_STYLE}
        >
          <Picker.Item label="Please select gender" value="Please select gender" />
          <Picker.Item label="Mare" value="Mare" />
          <Picker.Item label="Gelding" value="Gelding" />
          <Picker.Item label="Stallion" value="Stallion" />
        </Picker>
      </View>

      <Pressable style={BUTTON_STYLE} onPress={handleSave}>
        <Text style={BUTTON_TEXT}>Save Horse</Text>
      </Pressable>
    </SafeScreenWrapper>
  );
}
