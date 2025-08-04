/**
 * Mugo Plumbing Solutions Color Scheme
 * Primary colors: #0056A6 (deep blue) & #1FC2B3 (turquoise accent)
 */

const primaryBlue = '#0056A6';
const accentTurquoise = '#1FC2B3';
const tintColorLight = primaryBlue;
const tintColorDark = accentTurquoise;

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    primary: primaryBlue,
    accent: accentTurquoise,
    success: '#28a745',
    warning: '#ffc107',
    error: '#dc3545',
    gray: '#6c757d',
    lightGray: '#f8f9fa',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    primary: primaryBlue,
    accent: accentTurquoise,
    success: '#28a745',
    warning: '#ffc107',
    error: '#dc3545',
    gray: '#6c757d',
    lightGray: '#2d3748',
  },
};
