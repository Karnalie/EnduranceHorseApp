// utils/horseStorage.js
// Utility functions for saving, retrieving, and clearing horses from AsyncStorage

import AsyncStorage from '@react-native-async-storage/async-storage';

// Key used to store horse data in AsyncStorage
const STORAGE_KEY = 'HORSE_DATA';

/**
 * Load all horses from AsyncStorage
 * @returns {Promise<Array>} - list of horses or an empty array if none
 */
export const getHorsesFromStorage = async () => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  } catch (error) {
    console.error('Failed to load horses:', error);
    return [];
  }
};

/**
 * Save a single new horse to the list
 * @param {Object} horse - new horse object to add
 */
export const saveHorseToStorage = async (horse) => {
  try {
    const horses = await getHorsesFromStorage();
    const updated = [...horses, horse];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save horse:', error);
  }
};

/**
 * Overwrite all stored horses with a new list
 * @param {Array} horseList - full list of horses to save
 */
export const saveHorsesToStorage = async (horseList) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(horseList));
  } catch (error) {
    console.error('Failed to save horses:', error);
  }
};

/**
 * Delete all horses (clear storage)
 */
export const clearAllHorsesFromStorage = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear horse data:', error);
  }
};
