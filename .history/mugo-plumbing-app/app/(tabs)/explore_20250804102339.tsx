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

const exploreItems = [
  {
    id: 'services',
    title: 'Browse Services',
    icon: '🔧',
    description: 'Explore all available plumbing services',
  },
  {
    id: 'providers',
    title: 'Find Providers',
    icon: '👨‍🔧',
    description: 'Discover qualified plumbers in your area',
  },
  {
    id: 'pricing',
    title: 'Service Pricing',
    icon: '💰',
    description: 'View transparent pricing for all services',
  },
  {
    id: 'reviews',
    title: 'Customer Reviews',
    icon: '⭐',
    description: 'Read reviews from satisfied customers',
  },
  {
    id: 'tips',
    title: 'Plumbing Tips',
    icon: '💡',
    description: 'Learn maintenance and prevention tips',
  },
  {
    id: 'emergency',
    title: 'Emergency Services',
    icon: '🚨',
    description: '24/7 emergency plumbing assistance',
  },
];

export default function ExploreScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const handleItemPress = (itemId: string) => {
    // TODO: Navigate to respective screens when implemented
    console.log('Explore item pressed:', itemId);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>Explore</Text>
            <Text style={[styles.subtitle, { color: colors.gray }]}>
              Discover plumbing services and resources
            </Text>
          </View>

          {/* Explore Items */}
          <View style={styles.itemsContainer}>
            {exploreItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.itemCard, { backgroundColor: colors.lightGray }]}
                onPress={() => handleItemPress(item.id)}
              >
                <View style={[styles.itemIcon, { backgroundColor: colors.primary }]}>
                  <Text style={styles.itemIconText}>{item.icon}</Text>
                </View>
                <View style={styles.itemContent}>
                  <Text style={[styles.itemTitle, { color: colors.text }]}>
                    {item.title}
                  </Text>
                  <Text style={[styles.itemDescription, { color: colors.gray }]}>
                    {item.description}
                  </Text>
                </View>
                <Text style={[styles.itemArrow, { color: colors.gray }]}>→</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActionsSection}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
            <View style={styles.quickActions}>
              <TouchableOpacity
                style={[styles.quickActionButton, { backgroundColor: colors.primary }]}
                onPress={() => router.push('/booking')}
              >
                <Text style={styles.quickActionIcon}>📞</Text>
                <Text style={styles.quickActionText}>Book Now</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.quickActionButton, { backgroundColor: colors.accent }]}
                onPress={() => router.push('/(tabs)/chat')}
              >
                <Text style={styles.quickActionIcon}>💬</Text>
                <Text style={styles.quickActionText}>Get Support</Text>
              </TouchableOpacity>
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
    paddingTop: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  itemsContainer: {
    gap: 16,
    marginBottom: 30,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 16,
  },
  itemIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemIconText: {
    fontSize: 20,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  itemArrow: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quickActionsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionButton: {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  quickActionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  quickActionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
