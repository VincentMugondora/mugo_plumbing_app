import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const serviceCategories = [
  {
    id: '1',
    name: 'Emergency Plumbing',
    icon: '🚨',
    description: '24/7 emergency repairs',
    color: '#FF6B6B',
  },
  {
    id: '2',
    name: 'Pipe Installation',
    icon: '🔧',
    description: 'New pipe systems',
    color: '#4ECDC4',
  },
  {
    id: '3',
    name: 'Drain Cleaning',
    icon: '🚿',
    description: 'Clogged drains & sewers',
    color: '#45B7D1',
  },
  {
    id: '4',
    name: 'Water Heater',
    icon: '🔥',
    description: 'Repair & installation',
    color: '#96CEB4',
  },
  {
    id: '5',
    name: 'Leak Detection',
    icon: '💧',
    description: 'Find & fix leaks',
    color: '#FFEAA7',
  },
  {
    id: '6',
    name: 'Bathroom Remodel',
    icon: '🚽',
    description: 'Complete renovations',
    color: '#DDA0DD',
  },
];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleServiceSelect = (service: any) => {
    router.push({
      pathname: '/booking',
      params: { serviceId: service.id, serviceName: service.name }
    });
  };

  const handleQuickBook = () => {
    router.push('/booking');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={[styles.greeting, { color: colors.text }]}>
                Good morning! 👋
              </Text>
              <Text style={[styles.userName, { color: colors.text }]}>
                How can we help you today?
              </Text>
            </View>
            <TouchableOpacity 
              style={[styles.notificationButton, { backgroundColor: colors.lightGray }]}
              onPress={() => router.push('/(tabs)/profile')}
            >
              <Text style={styles.notificationIcon}>🔔</Text>
            </TouchableOpacity>
          </View>

          {/* Quick Book Section */}
          <View style={styles.quickBookSection}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Quick Book
            </Text>
            <TouchableOpacity
              style={[styles.quickBookCard, { backgroundColor: colors.primary }]}
              onPress={handleQuickBook}
            >
              <View style={styles.quickBookContent}>
                <Text style={styles.quickBookIcon}>🔧</Text>
                <View style={styles.quickBookText}>
                  <Text style={styles.quickBookTitle}>Need a plumber now?</Text>
                  <Text style={styles.quickBookSubtitle}>Book emergency service</Text>
                </View>
              </View>
              <Text style={styles.quickBookArrow}>→</Text>
            </TouchableOpacity>
          </View>

          {/* Service Categories */}
          <View style={styles.categoriesSection}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Our Services
            </Text>
            <View style={styles.categoriesGrid}>
              {serviceCategories.map((service) => (
                <TouchableOpacity
                  key={service.id}
                  style={[styles.categoryCard, { backgroundColor: colors.lightGray }]}
                  onPress={() => handleServiceSelect(service)}
                >
                  <View style={[styles.categoryIcon, { backgroundColor: service.color }]}>
                    <Text style={styles.categoryIconText}>{service.icon}</Text>
                  </View>
                  <Text style={[styles.categoryName, { color: colors.text }]}>
                    {service.name}
                  </Text>
                  <Text style={[styles.categoryDescription, { color: colors.gray }]}>
                    {service.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Recent Bookings */}
          <View style={styles.recentSection}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Recent Bookings
              </Text>
              <TouchableOpacity onPress={() => router.push('/(tabs)/bookings')}>
                <Text style={[styles.viewAllText, { color: colors.primary }]}>
                  View All
                </Text>
              </TouchableOpacity>
            </View>
            
            <View style={[styles.recentCard, { backgroundColor: colors.lightGray }]}>
              <Text style={[styles.noBookingsText, { color: colors.gray }]}>
                No recent bookings
              </Text>
              <Text style={[styles.noBookingsSubtext, { color: colors.gray }]}>
                Your booking history will appear here
              </Text>
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
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
  },
  greeting: {
    fontSize: 18,
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationIcon: {
    fontSize: 20,
  },
  quickBookSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  quickBookCard: {
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quickBookContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  quickBookIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  quickBookText: {
    flex: 1,
  },
  quickBookTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  quickBookSubtitle: {
    color: 'white',
    opacity: 0.8,
    fontSize: 14,
  },
  quickBookArrow: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  categoriesSection: {
    marginBottom: 30,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryIconText: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  recentSection: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  recentCard: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  noBookingsText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  noBookingsSubtext: {
    fontSize: 14,
    textAlign: 'center',
  },
});
