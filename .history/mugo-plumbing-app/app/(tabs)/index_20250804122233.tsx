import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuth } from '@/contexts/AuthContext';

const services = [
  {
    id: 'emergency',
    title: 'Emergency Plumbing',
    icon: '🚨',
    description: '24/7 emergency services',
    color: '#FF6B6B',
  },
  {
    id: 'repair',
    title: 'Plumbing Repairs',
    icon: '🔧',
    description: 'Fix leaks and repairs',
    color: '#4ECDC4',
  },
  {
    id: 'installation',
    title: 'Installation',
    icon: '⚙️',
    description: 'New fixtures and systems',
    color: '#45B7D1',
  },
  {
    id: 'maintenance',
    title: 'Maintenance',
    icon: '🛠️',
    description: 'Regular maintenance',
    color: '#96CEB4',
  },
  {
    id: 'drainage',
    title: 'Drainage',
    icon: '🌊',
    description: 'Drain cleaning & repair',
    color: '#FFEAA7',
  },
  {
    id: 'inspection',
    title: 'Inspections',
    icon: '🔍',
    description: 'Professional inspections',
    color: '#DDA0DD',
  },
];

const quickActions = [
  {
    id: 'book-service',
    title: 'Book Service',
    icon: '📅',
    description: 'Schedule a service',
    color: '#4ECDC4',
  },
  {
    id: 'find-provider',
    title: 'Find Provider',
    icon: '👨‍🔧',
    description: 'Browse qualified plumbers',
    color: '#45B7D1',
  },
  {
    id: 'emergency-call',
    title: 'Emergency Call',
    icon: '📞',
    description: 'Call for urgent help',
    color: '#FF6B6B',
  },
  {
    id: 'get-quote',
    title: 'Get Quote',
    icon: '💰',
    description: 'Request price estimate',
    color: '#96CEB4',
  },
];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { userProfile } = useAuth();

  const getUserGreeting = () => {
    const hour = new Date().getHours();
    let greeting = 'Good morning';
    
    if (hour >= 12 && hour < 17) {
      greeting = 'Good afternoon';
    } else if (hour >= 17) {
      greeting = 'Good evening';
    }
    
    return greeting;
  };

  const getUserDisplayName = () => {
    if (userProfile?.displayName) {
      return userProfile.displayName.split(' ')[0]; // Get first name only
    }
    return 'there';
  };

  const getUserType = () => {
    if (userProfile?.userType) {
      return userProfile.userType === 'provider' ? 'Provider' : 'Customer';
    }
    return 'Customer';
  };

  const getWelcomeMessage = () => {
    if (userProfile?.userType === 'provider') {
      return 'Ready to serve your customers today?';
    }
    return 'How can we help you today?';
  };

  const handleServicePress = (serviceId: string) => {
    // TODO: Navigate to service booking screen
    console.log('Service pressed:', serviceId);
  };

  const handleQuickActionPress = (actionId: string) => {
    switch (actionId) {
      case 'book-service':
        router.push('/booking');
        break;
      case 'find-provider':
        // TODO: Navigate to provider listing
        console.log('Find provider pressed');
        break;
      case 'emergency-call':
        // TODO: Implement emergency call functionality
        console.log('Emergency call pressed');
        break;
      case 'get-quote':
        // TODO: Navigate to quote request
        console.log('Get quote pressed');
        break;
      default:
        console.log('Action pressed:', actionId);
    }
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
                {getUserGreeting()}, {getUserDisplayName()}! 👋
              </Text>
              <Text style={[styles.welcomeMessage, { color: colors.gray }]}>
                {getWelcomeMessage()}
              </Text>
            </View>
            <View style={[styles.userBadge, { backgroundColor: colors.primary }]}>
              <Text style={styles.userBadgeText}>{getUserType()}</Text>
            </View>
          </View>

          {/* Provider-specific info */}
          {userProfile?.userType === 'provider' && (
            <View style={[styles.providerCard, { backgroundColor: colors.lightGray }]}>
              <Text style={[styles.providerTitle, { color: colors.text }]}>
                🏢 {userProfile.businessName || 'Your Business'}
              </Text>
              <Text style={[styles.providerInfo, { color: colors.gray }]}>
                🌍 {userProfile.serviceArea || 'Service area not set'}
              </Text>
              <Text style={[styles.providerInfo, { color: colors.gray }]}>
                ⏰ {userProfile.experience ? `${userProfile.experience} years experience` : 'Experience not set'}
              </Text>
            </View>
          )}

          {/* Quick Actions */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
            <View style={styles.quickActionsGrid}>
              {quickActions.map((action) => (
                <TouchableOpacity
                  key={action.id}
                  style={[styles.quickActionItem, { backgroundColor: colors.lightGray }]}
                  onPress={() => handleQuickActionPress(action.id)}
                >
                  <View style={[styles.quickActionIcon, { backgroundColor: action.color }]}>
                    <Text style={styles.quickActionIconText}>{action.icon}</Text>
                  </View>
                  <Text style={[styles.quickActionTitle, { color: colors.text }]}>
                    {action.title}
                  </Text>
                  <Text style={[styles.quickActionDescription, { color: colors.gray }]}>
                    {action.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Services */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {userProfile?.userType === 'provider' ? 'Services You Offer' : 'Available Services'}
            </Text>
            <View style={styles.servicesGrid}>
              {services.map((service) => (
                <TouchableOpacity
                  key={service.id}
                  style={[styles.serviceItem, { backgroundColor: colors.lightGray }]}
                  onPress={() => handleServicePress(service.id)}
                >
                  <View style={[styles.serviceIcon, { backgroundColor: service.color }]}>
                    <Text style={styles.serviceIconText}>{service.icon}</Text>
                  </View>
                  <Text style={[styles.serviceTitle, { color: colors.text }]}>
                    {service.title}
                  </Text>
                  <Text style={[styles.serviceDescription, { color: colors.gray }]}>
                    {service.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Recent Activity or Stats */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {userProfile?.userType === 'provider' ? 'Recent Bookings' : 'Recent Activity'}
            </Text>
            <View style={[styles.activityCard, { backgroundColor: colors.lightGray }]}>
              <Text style={[styles.activityText, { color: colors.gray }]}>
                {userProfile?.userType === 'provider' 
                  ? 'No recent bookings yet. Your bookings will appear here.'
                  : 'No recent activity. Book a service to get started!'
                }
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
    alignItems: 'flex-start',
    paddingTop: 20,
    paddingBottom: 30,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  welcomeMessage: {
    fontSize: 16,
  },
  userBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  userBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  providerCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  providerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  providerInfo: {
    fontSize: 14,
    marginBottom: 4,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionItem: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionIconText: {
    fontSize: 20,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  quickActionDescription: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceItem: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceIconText: {
    fontSize: 20,
  },
  serviceTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  activityCard: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  activityText: {
    fontSize: 14,
    textAlign: 'center',
  },
});
