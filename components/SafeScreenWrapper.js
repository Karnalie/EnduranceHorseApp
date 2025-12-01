// components/SafeScreenWrapper.js
// A reusable wrapper that adds padding to avoid screen cut-off

import React from 'react';
import { SafeAreaView, View, StyleSheet, Platform } from 'react-native';

export default function SafeScreenWrapper({ children }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: Platform.OS === 'android' ? 60 : 60, // extra padding for Android nav bar
  },
});
