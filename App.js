// App.js
// Main app navigation setup with consistent screen naming

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Shared import (for future-proofing and consistency across screens)
import './utils/sharedImport'; // Even if unused here, this keeps consistency
import './utils/firebase'; // Bootstraps Firebase configuration (warns if not configured)

// Screen imports
import HomeScreen from './screens/HomeScreen';
import ViewHorsesScreen from './screens/ViewHorsesScreen';
import AddHorseScreen from './screens/AddHorseScreen';
import EditHorseScreen from './screens/EditHorseScreen';
import HorseDetailScreen from './screens/HorseDetailScreen';
import ClearStorageScreen from './screens/ClearStorageScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="ViewHorses" component={ViewHorsesScreen} options={{ title: 'View Horses' }} />
        <Stack.Screen name="AddHorse" component={AddHorseScreen} options={{ title: 'Add Horse' }} />
        <Stack.Screen name="EditHorse" component={EditHorseScreen} options={{ title: 'Edit Horse' }} />
        <Stack.Screen name="HorseDetail" component={HorseDetailScreen} options={{ title: 'Horse Details' }} />
        <Stack.Screen name="ClearStorage" component={ClearStorageScreen} options={{ title: 'Clear Storage' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
