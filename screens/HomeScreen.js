// screens/HomeScreen.js
// Home screen with title and central navigation button

import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import {
  SafeScreenWrapper,
  TITLE_TEXT,
  BUTTON_STYLE,
  BUTTON_TEXT,
  COLORS,
  SPACING,
} from '../utils/sharedImport';

export default function HomeScreen({ navigation }) {
  return (
    <SafeScreenWrapper>
      {/* Centered content */}
      <View style={styles.centeredContent}>
        <Text style={[TITLE_TEXT, { marginBottom: SPACING.lg }]}>Endurance Horse App</Text>

        {/* Main navigation button */}
        <Pressable
          style={BUTTON_STYLE}
          onPress={() => navigation.navigate('ViewHorses')}
        >
          <Text style={BUTTON_TEXT}>View Horses</Text>
        </Pressable>
      </View>

      {/* Developer-only text link */}
      <Pressable onPress={() => navigation.navigate('ClearStorage')}>
        <Text style={styles.devText}>Clear All Horses (Dev Only)</Text>
      </Pressable>
    </SafeScreenWrapper>
  );
}

const styles = StyleSheet.create({
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  devText: {
    fontSize: 12,
    color: COLORS.danger,
    textAlign: 'center',
    marginTop: SPACING.lg,
  },
});
