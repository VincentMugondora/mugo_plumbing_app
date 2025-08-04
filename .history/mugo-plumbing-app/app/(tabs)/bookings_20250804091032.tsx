import React, { useState } from 'react';
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

// Mock data for bookings
const mockBookings = [
  {
    id: '1',
    serviceName: 'Emergency Plumbing',
    providerName: 'John Smith',
    date: '2024-01-15',
    time: '14:00',
    status: 'completed',
    amount: '$120',
    address: '123 Main St, Harare',
  },
  {
    id: '2',
    serviceName: 'Drain Cleaning',
    providerName: 'Mike Johnson',
    date: '2024-01-20',
    time: '10:00',
    status: 'scheduled',
    amount: '$85',
    address: '456 Oak Ave, Harare',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return '#28a745';
    case 'scheduled':
      return '#007bff';
    case 'in-progress':
      return '#ffc107';
    case 'cancelled':
      return '#dc3545';
    default:
      return '#6c757d';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'completed':
      return 'Completed';
    case 'scheduled':
      return 'Scheduled';
    case 'in-progress':
      return 'In Progress';
    case 'cancelled':
      return 'Cancelled';
    default:
      return 'Unknown';
  }
};

export default function BookingsScreen() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const upcomingBookings = mockBookings.filter(booking => booking.status === 'scheduled');
  const pastBookings = mockBookings.filter(booking => booking.status === 'completed');

  const handleBookingPress = (booking: any) => {
    // TODO: Navigate to booking details when implemented
    console.log('Booking pressed:', booking.id);
  };

  const handleNewBooking = () => {
    router.push('/booking');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>My Bookings</Text>
          <TouchableOpacity
            style={[styles.newBookingButton, { backgroundColor: colors.primary }]}
            onPress={handleNewBooking}
          >
            <Text style={styles.newBookingText}>+ New Booking</Text>
          </TouchableOpacity>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'upcoming' && { borderBottomColor: colors.primary }
            ]}
            onPress={() => setActiveTab('upcoming')}
          >
            <Text style={[
              styles.tabText,
              { color: activeTab === 'upcoming' ? colors.primary : colors.gray }
            ]}>
              Upcoming ({upcomingBookings.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'past' && { borderBottomColor: colors.primary }
            ]}
            onPress={() => setActiveTab('past')}
          >
            <Text style={[
              styles.tabText,
              { color: activeTab === 'past' ? colors.primary : colors.gray }
            ]}>
              Past ({pastBookings.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bookings List */}
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {activeTab === 'upcoming' ? (
            upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking) => (
                <TouchableOpacity
                  key={booking.id}
                  style={[styles.bookingCard, { backgroundColor: colors.lightGray }]}
                  onPress={() => handleBookingPress(booking)}
                >
                  <View style={styles.bookingHeader}>
                    <Text style={[styles.serviceName, { color: colors.text }]}>
                      {booking.serviceName}
                    </Text>
                    <View style={[
                      styles.statusBadge,
                      { backgroundColor: getStatusColor(booking.status) }
                    ]}>
                      <Text style={styles.statusText}>
                        {getStatusText(booking.status)}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.bookingDetails}>
                    <View style={styles.detailRow}>
                      <Text style={[styles.detailLabel, { color: colors.gray }]}>Provider:</Text>
                      <Text style={[styles.detailValue, { color: colors.text }]}>
                        {booking.providerName}
                      </Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={[styles.detailLabel, { color: colors.gray }]}>Date:</Text>
                      <Text style={[styles.detailValue, { color: colors.text }]}>
                        {booking.date} at {booking.time}
                      </Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={[styles.detailLabel, { color: colors.gray }]}>Address:</Text>
                      <Text style={[styles.detailValue, { color: colors.text }]}>
                        {booking.address}
                      </Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={[styles.detailLabel, { color: colors.gray }]}>Amount:</Text>
                      <Text style={[styles.detailValue, { color: colors.primary, fontWeight: 'bold' }]}>
                        {booking.amount}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View style={[styles.emptyState, { backgroundColor: colors.lightGray }]}>
                <Text style={[styles.emptyStateIcon]}>📅</Text>
                <Text style={[styles.emptyStateTitle, { color: colors.text }]}>
                  No upcoming bookings
                </Text>
                <Text style={[styles.emptyStateText, { color: colors.gray }]}>
                  You don't have any scheduled bookings at the moment
                </Text>
                <TouchableOpacity
                  style={[styles.emptyStateButton, { backgroundColor: colors.primary }]}
                  onPress={handleNewBooking}
                >
                  <Text style={styles.emptyStateButtonText}>Book a Service</Text>
                </TouchableOpacity>
              </View>
            )
          ) : (
            pastBookings.length > 0 ? (
              pastBookings.map((booking) => (
                <TouchableOpacity
                  key={booking.id}
                  style={[styles.bookingCard, { backgroundColor: colors.lightGray }]}
                  onPress={() => handleBookingPress(booking)}
                >
                  <View style={styles.bookingHeader}>
                    <Text style={[styles.serviceName, { color: colors.text }]}>
                      {booking.serviceName}
                    </Text>
                    <View style={[
                      styles.statusBadge,
                      { backgroundColor: getStatusColor(booking.status) }
                    ]}>
                      <Text style={styles.statusText}>
                        {getStatusText(booking.status)}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.bookingDetails}>
                    <View style={styles.detailRow}>
                      <Text style={[styles.detailLabel, { color: colors.gray }]}>Provider:</Text>
                      <Text style={[styles.detailValue, { color: colors.text }]}>
                        {booking.providerName}
                      </Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={[styles.detailLabel, { color: colors.gray }]}>Date:</Text>
                      <Text style={[styles.detailValue, { color: colors.text }]}>
                        {booking.date} at {booking.time}
                      </Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={[styles.detailLabel, { color: colors.gray }]}>Amount:</Text>
                      <Text style={[styles.detailValue, { color: colors.primary, fontWeight: 'bold' }]}>
                        {booking.amount}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View style={[styles.emptyState, { backgroundColor: colors.lightGray }]}>
                <Text style={[styles.emptyStateIcon]}>📋</Text>
                <Text style={[styles.emptyStateTitle, { color: colors.text }]}>
                  No past bookings
                </Text>
                <Text style={[styles.emptyStateText, { color: colors.gray }]}>
                  Your completed bookings will appear here
                </Text>
              </View>
            )
          )}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  newBookingButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  newBookingText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  bookingCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  bookingDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: 14,
  },
  detailValue: {
    fontSize: 14,
    flex: 1,
    textAlign: 'right',
  },
  emptyState: {
    padding: 40,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 40,
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  emptyStateButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyStateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 