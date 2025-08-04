import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  Switch,
} from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useTheme } from '@/contexts/ThemeContext';

const profileMenuItems = [
  {
    id: 'personal-info',
    title: 'Personal Information',
    icon: '👤',
    description: 'Update your profile details',
  },
  {
    id: 'payment-methods',
    title: 'Payment Methods',
    icon: '💳',
    description: 'Manage your payment options',
  },
  {
    id: 'addresses',
    title: 'Saved Addresses',
    icon: '📍',
    description: 'Manage your service addresses',
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: '🔔',
    description: 'Configure notification preferences',
  },
  {
    id: 'privacy',
    title: 'Privacy & Security',
    icon: '🔒',
    description: 'Manage your privacy settings',
  },
  {
    id: 'help',
    title: 'Help & Support',
    icon: '❓',
    description: 'Get help and contact support',
  },
  {
    id: 'about',
    title: 'About Mugo Plumbing',
    icon: 'ℹ️',
    description: 'App version and company info',
  },
];

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { isDark, toggleTheme } = useTheme();

  const handleMenuItemPress = (itemId: string) => {
    // TODO: Navigate to respective screens when implemented
    console.log('Menu item pressed:', itemId);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            // TODO: Implement logout logic
            router.replace('/auth/login');
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
            <TouchableOpacity
              style={[styles.settingsButton, { backgroundColor: colors.lightGray }]}
              onPress={() => handleMenuItemPress('settings')}
            >
              <Text style={styles.settingsIcon}>⚙️</Text>
            </TouchableOpacity>
          </View>

          {/* Profile Card */}
          <View style={[styles.profileCard, { backgroundColor: colors.lightGray }]}>
            <View style={styles.profileAvatar}>
              <Text style={styles.avatarText}>👤</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={[styles.userName, { color: colors.text }]}>
                John Doe
              </Text>
              <Text style={[styles.userEmail, { color: colors.gray }]}>
                john.doe@example.com
              </Text>
              <Text style={[styles.userPhone, { color: colors.gray }]}>
                +263 77 123 4567
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.editButton, { backgroundColor: colors.primary }]}
              onPress={() => handleMenuItemPress('personal-info')}
            >
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>

          {/* Account Stats */}
          <View style={styles.statsContainer}>
            <View style={[styles.statCard, { backgroundColor: colors.lightGray }]}>
              <Text style={[styles.statNumber, { color: colors.primary }]}>12</Text>
              <Text style={[styles.statLabel, { color: colors.gray }]}>Total Bookings</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: colors.lightGray }]}>
              <Text style={[styles.statNumber, { color: colors.accent }]}>4.8</Text>
              <Text style={[styles.statLabel, { color: colors.gray }]}>Average Rating</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: colors.lightGray }]}>
              <Text style={[styles.statNumber, { color: colors.success }]}>8</Text>
              <Text style={[styles.statLabel, { color: colors.gray }]}>This Month</Text>
            </View>
          </View>

          {/* Theme Toggle */}
          <View style={styles.themeSection}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Appearance
            </Text>
            <View style={[styles.themeCard, { backgroundColor: colors.lightGray }]}>
              <View style={styles.themeContent}>
                <Text style={styles.themeIcon}>🌙</Text>
                <View style={styles.themeText}>
                  <Text style={[styles.themeTitle, { color: colors.text }]}>
                    Dark Mode
                  </Text>
                  <Text style={[styles.themeDescription, { color: colors.gray }]}>
                    Switch between light and dark themes
                  </Text>
                </View>
              </View>
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: colors.gray, true: colors.primary }}
                thumbColor={isDark ? colors.accent : '#f4f3f4'}
              />
            </View>
          </View>

          {/* Menu Items */}
          <View style={styles.menuSection}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Account Settings
            </Text>
            {profileMenuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.menuItem, { backgroundColor: colors.lightGray }]}
                onPress={() => handleMenuItemPress(item.id)}
              >
                <View style={styles.menuItemContent}>
                  <Text style={styles.menuItemIcon}>{item.icon}</Text>
                  <View style={styles.menuItemText}>
                    <Text style={[styles.menuItemTitle, { color: colors.text }]}>
                      {item.title}
                    </Text>
                    <Text style={[styles.menuItemDescription, { color: colors.gray }]}>
                      {item.description}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.menuItemArrow, { color: colors.gray }]}>›</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Logout Button */}
          <View style={styles.logoutSection}>
            <TouchableOpacity
              style={[styles.logoutButton, { backgroundColor: colors.error }]}
              onPress={handleLogout}
            >
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsIcon: {
    fontSize: 20,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    marginBottom: 2,
  },
  userPhone: {
    fontSize: 14,
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  editButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  themeSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  themeCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  themeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  themeIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  themeText: {
    flex: 1,
  },
  themeTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  themeDescription: {
    fontSize: 14,
  },
  menuSection: {
    marginBottom: 32,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  menuItemDescription: {
    fontSize: 14,
  },
  menuItemArrow: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutSection: {
    marginBottom: 40,
  },
  logoutButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 