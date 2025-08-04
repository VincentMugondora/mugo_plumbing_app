import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
} from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Mock chat data
const mockChats = [
  {
    id: '1',
    providerName: 'John Smith',
    providerAvatar: '👨‍🔧',
    lastMessage: 'I\'ll be there in 15 minutes',
    timestamp: '2:30 PM',
    unreadCount: 2,
    serviceName: 'Emergency Plumbing',
    status: 'active',
  },
  {
    id: '2',
    providerName: 'Mike Johnson',
    providerAvatar: '👨‍🔧',
    lastMessage: 'The job is completed. Please rate your experience',
    timestamp: 'Yesterday',
    unreadCount: 0,
    serviceName: 'Drain Cleaning',
    status: 'completed',
  },
  {
    id: '3',
    providerName: 'Sarah Wilson',
    providerAvatar: '👩‍🔧',
    lastMessage: 'I\'m on my way to your location',
    timestamp: '1 hour ago',
    unreadCount: 1,
    serviceName: 'Water Heater Repair',
    status: 'active',
  },
];

export default function ChatScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const filteredChats = mockChats.filter(chat =>
    chat.providerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.serviceName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChatPress = (chat: any) => {
    router.push({
      pathname: '/chat-conversation',
      params: { chatId: chat.id, providerName: chat.providerName }
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#28a745';
      case 'completed':
        return '#6c757d';
      default:
        return '#ffc107';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'completed':
        return 'Completed';
      default:
        return 'Pending';
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Messages</Text>
        <TouchableOpacity
          style={[styles.settingsButton, { backgroundColor: colors.lightGray }]}
          onPress={() => router.push('/chat-settings')}
        >
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: colors.lightGray }]}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search conversations..."
            placeholderTextColor={colors.gray}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Chat List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <TouchableOpacity
              key={chat.id}
              style={[styles.chatCard, { backgroundColor: colors.lightGray }]}
              onPress={() => handleChatPress(chat)}
            >
              <View style={styles.chatAvatar}>
                <Text style={styles.avatarText}>{chat.providerAvatar}</Text>
                <View style={[
                  styles.statusIndicator,
                  { backgroundColor: getStatusColor(chat.status) }
                ]} />
              </View>
              
              <View style={styles.chatContent}>
                <View style={styles.chatHeader}>
                  <Text style={[styles.providerName, { color: colors.text }]}>
                    {chat.providerName}
                  </Text>
                  <Text style={[styles.timestamp, { color: colors.gray }]}>
                    {chat.timestamp}
                  </Text>
                </View>
                
                <View style={styles.chatDetails}>
                  <Text style={[styles.serviceName, { color: colors.gray }]}>
                    {chat.serviceName}
                  </Text>
                  <View style={styles.statusContainer}>
                    <View style={[
                      styles.statusBadge,
                      { backgroundColor: getStatusColor(chat.status) }
                    ]}>
                      <Text style={styles.statusText}>
                        {getStatusText(chat.status)}
                      </Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.messageContainer}>
                  <Text 
                    style={[
                      styles.lastMessage, 
                      { color: chat.unreadCount > 0 ? colors.text : colors.gray }
                    ]}
                    numberOfLines={1}
                  >
                    {chat.lastMessage}
                  </Text>
                  {chat.unreadCount > 0 && (
                    <View style={[styles.unreadBadge, { backgroundColor: colors.primary }]}>
                      <Text style={styles.unreadCount}>{chat.unreadCount}</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={[styles.emptyState, { backgroundColor: colors.lightGray }]}>
            <Text style={styles.emptyStateIcon}>💬</Text>
            <Text style={[styles.emptyStateTitle, { color: colors.text }]}>
              {searchQuery ? 'No conversations found' : 'No messages yet'}
            </Text>
            <Text style={[styles.emptyStateText, { color: colors.gray }]}>
              {searchQuery 
                ? 'Try adjusting your search terms'
                : 'Start a booking to chat with providers'
              }
            </Text>
            {!searchQuery && (
              <TouchableOpacity
                style={[styles.emptyStateButton, { backgroundColor: colors.primary }]}
                onPress={() => router.push('/(tabs)')}
              >
                <Text style={styles.emptyStateButtonText}>Book a Service</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
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
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  chatCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  chatAvatar: {
    position: 'relative',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 32,
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'white',
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  providerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: 12,
  },
  chatDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 14,
  },
  statusContainer: {
    flexDirection: 'row',
  },
  statusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  statusText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  messageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    flex: 1,
    fontSize: 14,
    marginRight: 8,
  },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadCount: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
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