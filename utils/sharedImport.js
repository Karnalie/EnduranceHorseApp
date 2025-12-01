// utils/sharedImports.js
// Centralized shared imports for cleaner screens

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Pressable,
  FlatList,
  StyleSheet,
  Modal,
  Alert,
  SafeAreaView,
  Platform,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';
import uuid from 'react-native-uuid';

import SafeScreenWrapper from '../components/SafeScreenWrapper';

import {
  COLORS,
  SPACING,
  TITLE_TEXT,
  LABEL_TEXT,
  INPUT_STYLE,
  BUTTON_STYLE,
  BUTTON_TEXT,
  TEXT_SM,
  TEXT_MD,
  TEXT_LG,
} from '../styles/theme';

import {
  getHorsesFromStorage,
  saveHorseToStorage,
  saveHorsesToStorage,
  clearAllHorsesFromStorage,
} from './horseStorage';

export {
  // React Core
  React,
  useState,
  useEffect,

  // React Native Core
  View,
  Text,
  TextInput,
  Button,
  Pressable,
  FlatList,
  StyleSheet,
  Modal,
  Alert,
  SafeAreaView,
  Platform,

  // External Packages
  Picker,
  uuid,

  // Components
  SafeScreenWrapper,

  // Theme Styles
  COLORS,
  SPACING,      
  TITLE_TEXT,
  LABEL_TEXT,
  INPUT_STYLE,
  BUTTON_STYLE,
  BUTTON_TEXT,
  TEXT_SM,
  TEXT_MD,
  TEXT_LG,

  // Storage Functions
  getHorsesFromStorage,
  saveHorseToStorage,
  saveHorsesToStorage,
  clearAllHorsesFromStorage,
};
