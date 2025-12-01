// screens/HorseDetailScreen.js
// Displays full details of a selected horse, with Edit and Delete options

import React from 'react';
import { View, Text, Pressable } from 'react-native';
import SafeScreenWrapper from '../components/SafeScreenWrapper';
import {
  TITLE_TEXT,
  LABEL_TEXT,
  BUTTON_STYLE,
  BUTTON_TEXT,
  COLORS,
} from '../styles/theme';

export default function HorseDetailScreen({ route, navigation }) {
  const { horse, onDelete } = route.params;

  // Calculate age from DOB
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const now = new Date();
    const age = now.getFullYear() - birthDate.getFullYear();
    const monthDiff = now.getMonth() - birthDate.getMonth();
    return monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthDate.getDate())
      ? age - 1
      : age;
  };

  return (
    <SafeScreenWrapper>
      {/* Title */}
      <Text style={TITLE_TEXT}>{horse.name}</Text>

      {/* Horse Details */}
      <View style={{ marginTop: 20 }}>
        <Text style={LABEL_TEXT}>Date of Birth:</Text>
        <Text>{horse.dob}</Text>

        <Text style={LABEL_TEXT}>Age:</Text>
        <Text>{calculateAge(horse.dob)} years</Text>

        <Text style={LABEL_TEXT}>Gender:</Text>
        <Text>{horse.gender}</Text>
      </View>

      {/* Action Buttons */}
      <View style={{ marginTop: 40 }}>
        <Pressable
          style={[BUTTON_STYLE, { marginBottom: 10 }]}
          onPress={() =>
            navigation.navigate('EditHorse', {
              horse, // Pass horse object to edit screen
            })
          }
        >
          <Text style={BUTTON_TEXT}>Edit</Text>
        </Pressable>

        <Pressable
          style={[BUTTON_STYLE, { backgroundColor: COLORS.danger }]}
          onPress={() => {
            onDelete(horse.id);
            navigation.goBack();
          }}
        >
          <Text style={BUTTON_TEXT}>Delete</Text>
        </Pressable>
      </View>
    </SafeScreenWrapper>
  );
}
