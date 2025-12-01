// screens/ViewHorsesScreen.js
// Displays all horses, allows tap to view and long-press to multi-delete

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  Modal,
} from 'react-native';

import { getHorsesFromStorage, saveHorsesToStorage } from '../utils/horseStorage';

import {
  SafeScreenWrapper,
  TITLE_TEXT,
  BUTTON_STYLE,
  BUTTON_TEXT,
  COLORS,
  SPACING,
  BORDER_RADIUS,
} from '../utils/sharedImport';

export default function ViewHorsesScreen({ navigation }) {
  const [horses, setHorses] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);

  // Load horses from storage and sort alphabetically
  useEffect(() => {
    loadHorses();
  }, []);

  const loadHorses = async () => {
    const data = await getHorsesFromStorage();
    const sorted = [...data].sort((a, b) => a.name.localeCompare(b.name));
    setHorses(sorted);
  };

  // Handle single tap to view or select
  const handlePress = (horse) => {
    if (isSelecting) {
      toggleSelect(horse.id);
    } else {
      navigation.navigate('HorseDetail', { horse });
    }
  };

  // Handle long press to activate multi-select
  const handleLongPress = (horse) => {
    setIsSelecting(true);
    toggleSelect(horse.id);
  };

  // Toggle horse ID in selected list
  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Delete selected horses
  const confirmDelete = async () => {
    const remaining = horses.filter((horse) => !selectedIds.includes(horse.id));
    await saveHorsesToStorage(remaining);
    setSelectedIds([]);
    setIsSelecting(false);
    setDeleteModalVisible(false);
    loadHorses();
  };

  return (
    <SafeScreenWrapper>
      {/* Screen Title */}
      <Text style={TITLE_TEXT}>View Horses</Text>

      {/* List of Horses */}
      <FlatList
        data={horses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handlePress(item)}
            onLongPress={() => handleLongPress(item)}
            style={[
              styles.horseItem,
              selectedIds.includes(item.id) && styles.selected,
            ]}
          >
            <Text style={styles.horseText}>{item.name}</Text>
          </Pressable>
        )}
      />

      {/* Button Group */}
      <View style={styles.buttonGroup}>
        <Pressable
          style={BUTTON_STYLE}
          onPress={() => navigation.navigate('AddHorse')}
        >
          <Text style={BUTTON_TEXT}>Add New Horse</Text>
        </Pressable>

        {isSelecting && (
          <Pressable
            style={[BUTTON_STYLE, { backgroundColor: COLORS.danger }]}
            onPress={() => setDeleteModalVisible(true)}
          >
            <Text style={[BUTTON_TEXT, { color: COLORS.white }]}>
              Delete Selected
            </Text>
          </Pressable>
        )}
      </View>

      {/* Confirmation Modal */}
      <Modal visible={isDeleteModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>
              Confirm Deletion
            </Text>
            <Text>Are you sure you want to delete selected horses?</Text>
            <View style={styles.modalButtons}>
              <Pressable
                style={styles.cancelButton}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text>Cancel</Text>
              </Pressable>
              <Pressable
                style={styles.confirmButton}
                onPress={confirmDelete}
              >
                <Text style={{ color: COLORS.white }}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeScreenWrapper>
  );
}

const styles = StyleSheet.create({
  horseItem: {
    padding: SPACING.md,
    marginVertical: 5,
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.md,
  },
  selected: {
    backgroundColor: COLORS.highlight,
  },
  horseText: {
    fontSize: 16,
    color: COLORS.text,
  },
  buttonGroup: {
    marginTop: SPACING.lg,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    width: '80%',
    alignItems: 'center',
  },
  modalButtons: {
    marginTop: SPACING.lg,
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  cancelButton: {
    padding: SPACING.sm,
    backgroundColor: '#ddd',
    borderRadius: BORDER_RADIUS.sm,
    marginRight: SPACING.sm,
  },
  confirmButton: {
    padding: SPACING.sm,
    backgroundColor: COLORS.danger,
    borderRadius: BORDER_RADIUS.sm,
  },
});
