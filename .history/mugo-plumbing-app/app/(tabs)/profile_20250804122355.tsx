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
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

const profileMenuItems = [
  {
    id: 'personal-info',
    title: 'Personal Information',
    icon: '👤',
    description: 'Update your profile details',
    color: '#4ECDC4',
  },
  {
    id: 'payment-methods',
    title: 'Payment Methods',
    icon: '💳',
    description: 'Manage your payment options',
    color: '#45B7D1',
  },
  {
    id: 'addresses',
    title: 'Saved Addresses',
    icon: '📍',
    description: 'Manage your service addresses',
    color: '#96CEB4',
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: '🔔',
    description: 'Configure notification preferences',
    color: '#FFEAA7',
  },
  {
    id: 'privacy',
    title: 'Privacy & Security',
    icon: '🔒',
    description: 'Manage your privacy settings',
    color: '#DDA0DD',
  },
  {
    id: 'help',
    title: 'Help & Support',
    icon: '❓',
    description: 'Get help and contact support',
    color: '#FF6B6B',
  },
  {
    id: 'about',
    title: 'About Mugo Plumbing',
    icon: 'ℹ️',
    description: 'App version and company info',
    color: '#A8E6CF',
  },
  {
    id: 'services',
    title: 'Browse Services',
    icon: '🔧',
    description: 'Explore all available services',
    color: '#FFB347',
  },
  {
    id: 'providers',
    title: 'Find Providers',
    icon: '👨‍🔧',
    description: 'Discover qualified plumbers',
    color: '#87CEEB',
  },
  {
    id: 'pricing',
    title: 'Service Pricing',
    icon: '💰',
    description: 'View transparent pricing',
    color: '#98FB98',
  },
  {
    id: 'reviews',
    title: 'Customer Reviews',
    icon: '⭐',
    description: 'Read customer testimonials',
    color: '#FFD700',
  },
  {
    id: 'emergency',
    title: 'Emergency Services',
    icon: '🚨',
    description: '24/7 emergency assistance',
    color: '#FF6347',
  },
];

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { userProfile, logout } = useAuth();
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
          onPress: async () => {
            try {
              await logout();
              router.replace('/auth/login');
            } catch (error) {
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          },
        },
      ]
    );
  };

  const getUserDisplayName = () => {
    if (userProfile?.displayName) {
      return userProfile.displayName;
    }
    return 'User';
  };

  const getUserEmail = () => {
    return userProfile?.email || 'user@example.com';
  };

  const getUserType = () => {
    if (userProfile?.userType) {
      return userProfile.userType.charAt(0).toUpperCase() + userProfile.userType.slice(1);
    }
    return 'Customer';
  };

  const getUserLocation = () => {
    return userProfile?.location || 'Location not set';
  };

  const getProviderInfo = () => {
    if (userProfile?.userType === 'provider') {
      return {
        businessName: userProfile.businessName || 'Business name not set',
        serviceArea: userProfile.serviceArea || 'Service area not set',
        experience: userProfile.experience ? `${userProfile.experience} years` : 'Experience not set',
      };
    }
    return null;
  };

  const providerInfo = getProviderInfo();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
            <TouchableOpacity
              style={[styles.themeButton, { backgroundColor: colors.lightGray }]}
              onPress={toggleTheme}
            >
              <Text style={styles.themeIcon}>{isDark ? '☀️' : '🌙'}</Text>
            </TouchableOpacity>
          </View>

          {/* User Info Card */}
          <View style={[styles.userCard, { backgroundColor: colors.lightGray }]}>
            <View style={[styles.userAvatar, { backgroundColor: colors.primary }]}>
              <Text style={styles.userAvatarText}>
                {getUserDisplayName().charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={[styles.userName, { color: colors.text }]}>
                {getUserDisplayName()}
              </Text>
              <Text style={[styles.userEmail, { color: colors.gray }]}>
                {getUserEmail()}
              </Text>
              <Text style={[styles.userType, { color: colors.primary }]}>
                {getUserType()}
              </Text>
              <Text style={[styles.userLocation, { color: colors.gray }]}>
                📍 {getUserLocation()}
              </Text>
              
              {/* Provider-specific info */}
              {providerInfo && (
                <View style={styles.providerInfo}>
                  <Text style={[styles.providerLabel, { color: colors.gray }]}>
                    🏢 {providerInfo.businessName}
                  </Text>
                  <Text style={[styles.providerLabel, { color: colors.gray }]}>
                    🌍 {providerInfo.serviceArea}
                  </Text>
                  <Text style={[styles.providerLabel, { color: colors.gray }]}>
                    ⏰ {providerInfo.experience}
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Menu Grid */}
          <View style={styles.menuSection}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Menu</Text>
            <View style={styles.menuGrid}>
              {profileMenuItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.menuItem, { backgroundColor: colors.lightGray }]}
                  onPress={() => handleMenuItemPress(item.id)}
                >
                  <View style={[styles.menuIcon, { backgroundColor: item.color }]}>
                    <Text style={styles.menuIconText}>{item.icon}</Text>
                  </View>
                  <Text style={[styles.menuTitle, { color: colors.text }]}>
                    {item.title}
                  </Text>
                  <Text style={[styles.menuDescription, { color: colors.gray }]}>
                    {item.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Logout Button */}
          <TouchableOpacity
            style={[styles.logoutButton, { backgroundColor: colors.error }]}
            onPress={handleLogout}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
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
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  themeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  themeIcon: {
    fontSize: 20,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 20,
    borderRadius: 16,
    marginBottom: 30,
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userAvatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    marginBottom: 4,
  },
  userType: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  userLocation: {
    fontSize: 12,
    marginBottom: 8,
  },
  providerInfo: {
    marginTop: 8,
  },
  providerLabel: {
    fontSize: 11,
    marginBottom: 2,
  },
  menuSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuItem: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  menuIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  menuIconText: {
    fontSize: 20,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  logoutButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 30,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 