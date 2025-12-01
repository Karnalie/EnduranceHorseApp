// styles/theme.js
// Master styling file for consistent, centralized design across the app

import { StyleSheet } from 'react-native';

// --- COLOR PALETTE ---
export const COLORS = {
  primary: '#3b82f6',        // Blue
  danger: 'red',
  success: '#10b981',        // Green
  background: '#fff',
  inputBackground: '#f9f9f9',
  inputText: '#333',
  labelText: '#000',
  selectedItem: '#e0f2fe',   // Light blue
  listItemBorder: '#ddd',
  modalOverlay: 'rgba(0, 0, 0, 0.5)',
  muted: '#999',
  shadow: '#000',
};

// --- TYPOGRAPHY STYLES ---
export const TITLE_TEXT = {
  fontSize: 30,
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: 20,
  color: COLORS.labelText,
};

export const LABEL_TEXT = {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 6,
  color: COLORS.labelText,
};

export const MD_TEXT = {
  fontSize: 18,
  color: COLORS.inputText,
};

export const SM_TEXT = {
  fontSize: 14,
  color: COLORS.muted,
};

export const LG_TEXT = {
  fontSize: 22,
  color: COLORS.labelText,
};

export const BOLD_TEXT = {
  fontWeight: 'bold',
  color: COLORS.inputText,
};

// --- FONT SIZE SHORTCUTS ---
export const TEXT_SM = { fontSize: 14 };
export const TEXT_MD = { fontSize: 16 };
export const TEXT_LG = { fontSize: 18 };

// --- FORM INPUT ---
export const INPUT_STYLE = {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 6,
  padding: 10,
  fontSize: 16,
  backgroundColor: COLORS.inputBackground,
  marginBottom: 15,
  color: COLORS.inputText,
};

// --- BUTTONS ---
export const BUTTON_STYLE = {
  backgroundColor: COLORS.primary,
  paddingVertical: 14,
  paddingHorizontal: 20,
  borderRadius: 6,
  alignItems: 'center',
  marginBottom: 10,
};

export const BUTTON_TEXT = {
  color: '#fff',
  fontSize: 18,
  fontWeight: 'bold',
};

export const MODAL_BUTTON_STYLE = {
  backgroundColor: COLORS.danger,
  padding: 12,
  borderRadius: 6,
  alignItems: 'center',
  marginTop: 20,
};

export const MODAL_BUTTON_TEXT = {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
};

// --- LIST ITEMS ---
export const LIST_ITEM_STYLE = {
  padding: 15,
  borderBottomWidth: 1,
  borderColor: COLORS.listItemBorder,
  borderRadius: 5,
  marginBottom: 10,
  backgroundColor: '#f2f2f2',
};

export const SELECTED_LIST_ITEM_STYLE = {
  ...LIST_ITEM_STYLE,
  backgroundColor: COLORS.selectedItem,
};

// --- EMPTY STATE ---
export const EMPTY_TEXT_STYLE = {
  textAlign: 'center',
  marginTop: 50,
  fontSize: 18,
  color: COLORS.muted,
};

// --- FUTURE STYLES ---
export const LOGO_STYLE = {
  width: 120,
  height: 120,
  resizeMode: 'contain',
  marginBottom: 20,
};

export const BACKGROUND_IMAGE = {
  flex: 1,
  resizeMode: 'cover',
  justifyContent: 'center',
};

// --- SHAPE & SPACING ---
export const SPACING = {
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
};

export const SHADOW = {
  shadowColor: COLORS.shadow,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 3,
  elevation: 5,
};

// --- OPTIONAL FULL STYLESHEET EXPORT ---
export const themeStyles = StyleSheet.create({
  safeScreen: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.md,
  },
});
