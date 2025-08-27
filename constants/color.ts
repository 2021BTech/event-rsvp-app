
const tintColorLight = '#F59E0B'; // Lightbulb Gold
const tintColorDark = '#FBBF24';  // Slight lighter gold for dark mode (optional tweak)

export const Colors = {
  primary: '#04016C',   // Deep Navy  – buttons / icons
  accent:  '#EFAA2B',   // Gold Accent – highlights
  deepBlue:'#161A3A',
  light: {
    text: '#1F2937',           // Very dark text
    background: '#FFFFFF',     // Pure white background
    tint: tintColorLight,       // Primary color
    icon: '#6B7280',            // Muted gray for icons
    tabIconDefault: '#6B7280',  // Default tab icon (inactive)
    tabIconSelected: tintColorLight, // Selected tab (active)
    cardBackground: '#F8F9FA'
  },
  dark: {
    text: '#F59E0B',            // Very light text (almost white)
    background: '#0F172A',      // Very dark blue/navy background
    tint: tintColorDark,        // Accent color for dark
    icon: '#9CA3AF',            // Light gray for icons
    tabIconDefault: '#9CA3AF',  // Default tab icon (inactive)
    tabIconSelected: tintColorDark, // Selected tab (active)
    cardBackground: '#1E1E1E',
  },
  blue: "#04016C",
};
