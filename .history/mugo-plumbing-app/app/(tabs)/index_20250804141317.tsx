import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuth } from '@/contexts/AuthContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const serviceCategories = [
  {
    id: 'leaks',
    title: 'Leaks',
    icon: '💧',
    color: '#4ECDC4',
  },
  {
    id: 'drains',
    title: 'Drains',
    icon: '🚿',
    color: '#45B7D1',
  },
  {
    id: 'installations',
    title: 'Installations',
    icon: '🔧',
    color: '#96CEB4',
  },
  {
    id: 'emergency',
    title: 'Emergency',
    icon: '🚨',
    color: '#FF6B6B',
  },
  {
    id: 'maintenance',
    title: 'Maintenance',
    icon: '🛠️',
    color: '#FFEAA7',
  },
  {
    id: 'inspection',
    title: 'Inspection',
    icon: '🔍',
    color: '#DDA0DD',
  },
];

const nearbyPlumbers = [
  {
    id: '1',
    name: 'John Dlamini',
    rating: 4.8,
    services: 'Blocked Drains & Geysers',
    avatar: '#FFB6C1',
    avatarInitial: 'J',
  },
  {
    id: '2',
    name: 'Maria Sibanda',
    rating: 4.5,
    services: 'Pipe Repairs & Installations',
    avatar: '#4ECDC4',
    avatarInitial: 'M',
  },
  {
    id: '3',
    name: 'David Moyo',
    rating: 4.9,
    services: 'Emergency Leaks & Plumbing',
    avatar: '#FFB347',
    avatarInitial: 'D',
  },
];

const quickAccessItems = [
  {
    id: 'service-history',
    title: 'Service History',
    icon: '🕒',
    description: 'View your past bookings',
    color: '#4ECDC4',
  },
  {
    id: 'messages',
    title: 'Messages',
    icon: '💬',
    description: 'Chat with plumbers',
    color: '#45B7D1',
  },
  {
    id: 'payments',
    title: 'Payments',
    icon: '💳',
    description: 'Manage payment methods',
    color: '#96CEB4',
  },
];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { userProfile, isOnline } = useAuth();

  const getUserDisplayName = () => {
    if (userProfile?.displayName) {
      return userProfile.displayName.split(' ')[0];
    }
    return 'Customer';
  };

  const handleServiceCategoryPress = (categoryId: string) => {
    if (!isOnline) {
      Alert.alert('Offline', 'Please check your internet connection to book services.');
      return;
    }
    console.log('Service category pressed:', categoryId);
    // TODO: Navigate to service booking with category
  };

  const handlePlumberPress = (plumberId: string) => {
    if (!isOnline) {
      Alert.alert('Offline', 'Please check your internet connection to book plumbers.');
      return;
    }
    console.log('Plumber pressed:', plumberId);
    // TODO: Navigate to plumber profile or booking
  };

  const handleQuickAccessPress = (itemId: string) => {
    switch (itemId) {
      case 'service-history':
        router.push('/(tabs)/bookings');
        break;
      case 'messages':
        router.push('/(tabs)/chat');
        break;
      case 'payments':
        // TODO: Navigate to payments screen
        console.log('Payments pressed');
        break;
      default:
        console.log('Quick access pressed:', itemId);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Text key={i} style={[styles.star, { color: i <= rating ? '#FFD700' : '#E0E0E0' }]}>
          ★
        </Text>
      );
    }
    return stars;
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Offline Banner */}
          {!isOnline && (
            <View style={[styles.offlineBanner, { backgroundColor: colors.error }]}>
              <MaterialIcons name="wifi-off" size={16} color="white" />
              <Text style={styles.offlineText}>You're offline. Some features may be limited.</Text>
            </View>
          )}

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={[styles.greeting, { color: colors.text }]}>
                Good morning, {getUserDisplayName()}! 👋
              </Text>
              <Text style={[styles.headerTitle, { color: colors.text }]}>
                Customer Dashboard
              </Text>
            </View>
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.notificationButton}>
                <MaterialIcons name="notifications" size={24} color={colors.text} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.profileButton, { backgroundColor: colors.primary }]}
                onPress={() => router.push('/(tabs)/profile')}
              >
                <Text style={styles.profileInitial}>
                  {getUserDisplayName().charAt(0).toUpperCase()}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Search Bar */}
          <View style={[styles.searchContainer, { backgroundColor: colors.lightGray }]}>
            <MaterialIcons name="search" size={20} color={colors.gray} style={styles.searchIcon} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Find your plumber..."
              placeholderTextColor={colors.gray}
            />
          </View>

          {/* Service Categories */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Service Categories</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesContainer}
            >
              {serviceCategories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[styles.categoryCard, { backgroundColor: colors.lightGray }]}
                  onPress={() => handleServiceCategoryPress(category.id)}
                >
                  <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                    <Text style={styles.categoryIconText}>{category.icon}</Text>
                  </View>
                  <Text style={[styles.categoryTitle, { color: colors.text }]}>
                    {category.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Calendar Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Book Your Service</Text>
            <View style={[styles.calendarCard, { backgroundColor: colors.lightGray }]}>
              <View style={styles.calendarHeader}>
                <TouchableOpacity style={styles.calendarNav}>
                  <MaterialIcons name="chevron-left" size={24} color={colors.text} />
                </TouchableOpacity>
                <Text style={[styles.calendarMonth, { color: colors.text }]}>August 2025</Text>
                <TouchableOpacity style={styles.calendarNav}>
                  <MaterialIcons name="chevron-right" size={24} color={colors.text} />
                </TouchableOpacity>
              </View>
              <View style={styles.calendarDays}>
                <Text style={[styles.dayHeader, { color: colors.gray }]}>Sun</Text>
                <Text style={[styles.dayHeader, { color: colors.gray }]}>Mon</Text>
                <Text style={[styles.dayHeader, { color: colors.gray }]}>Tue</Text>
                <Text style={[styles.dayHeader, { color: colors.gray }]}>Wed</Text>
                <Text style={[styles.dayHeader, { color: colors.gray }]}>Thu</Text>
                <Text style={[styles.dayHeader, { color: colors.gray }]}>Fri</Text>
                <Text style={[styles.dayHeader, { color: colors.gray }]}>Sat</Text>
              </View>
              <View style={styles.calendarDates}>
                <Text style={[styles.dateCell, { color: colors.gray }]}>1</Text>
                <Text style={[styles.dateCell, { color: colors.gray }]}>2</Text>
                <Text style={[styles.dateCell, { color: colors.gray }]}>3</Text>
                <Text style={[styles.dateCell, { color: colors.gray }]}>4</Text>
                <Text style={[styles.dateCell, { color: colors.gray }]}>5</Text>
                <Text style={[styles.dateCell, { color: colors.gray }]}>6</Text>
                <Text style={[styles.dateCell, { color: colors.gray }]}>7</Text>
                <Text style={[styles.dateCell, { color: colors.gray }]}>8</Text>
                <Text style={[styles.dateCell, { color: colors.gray }]}>9</Text>
                <Text style={[styles.dateCell, { color: colors.gray }]}>10</Text>
                <Text style={[styles.dateCell, { color: colors.gray }]}>11</Text>
                <Text style={[styles.dateCell, { color: colors.gray }]}>12</Text>
                <Text style={[styles.dateCell, { color: colors.gray }]}>13</Text>
                <Text style={[styles.dateCell, { color: colors.gray }]}>14</Text>
                <Text style={[styles.dateCell, { color: colors.gray }]}>15</Text>
                <Text style={[styles.dateCell, { color: colors.gray }]}>16</Text>
                <Text style={[styles.dateCell, { color: colors.gray }]}>17</Text>
                <Text style={[styles.dateCell, { color: colors.gray }]}>18</Text>
                <Text style={[styles.dateCell, { color: colors.gray }]}>19</Text>
                <Text style={[styles.dateCell, { color: colors.gray }]}>20</Text>
                <Text style={[styles.dateCell, { color: colors.gray }]}>21</Text>
                <Text style={[styles.dateCell, { color: colors.gray }]}>22</Text>
                <Text style={[styles.dateCell, { color: colors.gray }]}>23</Text>
                <Text style={[styles.dateCell, { color: colors.gray }]}>24</Text>
                <Text style={[styles.dateCell, { color: colors.gray }]}>25</Text>
                <Text style={[styles.dateCell, { color: colors.gray }]}>26</Text>
                <Text style={[styles.dateCell, { color: colors.gray }]}>27</Text>
                <Text style={[styles.dateCell, { color: colors.gray }]}>28</Text>
                <Text style={[styles.dateCell, { color: colors.gray }]}>29</Text>
                <Text style={[styles.dateCell, { color: colors.gray }]}>30</Text>
                <Text style={[styles.dateCell, { color: colors.gray }]}>31</Text>
              </View>
            </View>
          </View>

          {/* Nearby Plumbers */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Nearby Plumbers</Text>
            {nearbyPlumbers.map((plumber) => (
              <TouchableOpacity
                key={plumber.id}
                style={[styles.plumberCard, { backgroundColor: colors.lightGray }]}
                onPress={() => handlePlumberPress(plumber.id)}
              >
                <View style={[styles.plumberAvatar, { backgroundColor: plumber.avatar }]}>
                  <Text style={styles.plumberInitial}>{plumber.avatarInitial}</Text>
                </View>
                <View style={styles.plumberInfo}>
                  <Text style={[styles.plumberName, { color: colors.text }]}>
                    {plumber.name}
                  </Text>
                  <View style={styles.plumberRating}>
                    {renderStars(plumber.rating)}
                    <Text style={[styles.ratingText, { color: colors.gray }]}>
                      ({plumber.rating})
                    </Text>
                  </View>
                  <Text style={[styles.plumberServices, { color: colors.gray }]}>
                    {plumber.services}
                  </Text>
                </View>
                <TouchableOpacity 
                  style={[styles.bookButton, { backgroundColor: colors.primary }]}
                  onPress={() => handlePlumberPress(plumber.id)}
                >
                  <Text style={styles.bookButtonText}>Book Now</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>

          {/* Quick Access */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Access</Text>
            <View style={styles.quickAccessGrid}>
              {quickAccessItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.quickAccessCard, { backgroundColor: colors.lightGray }]}
                  onPress={() => handleQuickAccessPress(item.id)}
                >
                  <View style={[styles.quickAccessIcon, { backgroundColor: item.color }]}>
                    <Text style={styles.quickAccessIconText}>{item.icon}</Text>
                  </View>
                  <Text style={[styles.quickAccessTitle, { color: colors.text }]}>
                    {item.title}
                  </Text>
                  <Text style={[styles.quickAccessDescription, { color: colors.gray }]}>
                    {item.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
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
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },
  offlineBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
    borderRadius: 8,
  },
  offlineText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notificationButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 24,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  categoriesContainer: {
    paddingRight: 20,
  },
  categoryCard: {
    width: 80,
    height: 80,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryIconText: {
    fontSize: 16,
  },
  categoryTitle: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  calendarCard: {
    borderRadius: 12,
    padding: 16,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  calendarNav: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarMonth: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  calendarDays: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  dayHeader: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
  },
  calendarDates: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dateCell: {
    width: '14.28%',
    textAlign: 'center',
    paddingVertical: 8,
    fontSize: 14,
  },
  plumberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  plumberAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  plumberInitial: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  plumberInfo: {
    flex: 1,
  },
  plumberName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  plumberRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  star: {
    fontSize: 12,
    marginRight: 1,
  },
  ratingText: {
    fontSize: 12,
    marginLeft: 4,
  },
  plumberServices: {
    fontSize: 12,
  },
  bookButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  bookButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  quickAccessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickAccessCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  quickAccessIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickAccessIconText: {
    fontSize: 18,
  },
  quickAccessTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  quickAccessDescription: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
});
