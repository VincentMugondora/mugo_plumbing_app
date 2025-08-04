import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function UserTypeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleUserTypeSelect = (userType: 'client' | 'provider') => {
    // Store user type in AsyncStorage or context
    // For now, just navigate to register with user type
    router.push({
      pathname: '/auth/register',
      params: { userType }
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>
              Choose Your Role
            </Text>
            <Text style={[styles.subtitle, { color: colors.gray }]}>
              Select how you want to use Mugo Plumbing Solutions
            </Text>
          </View>

          {/* User Type Options */}
          <View style={styles.optionsContainer}>
            {/* Client Option */}
            <TouchableOpacity
              style={[styles.optionCard, { backgroundColor: colors.lightGray }]}
              onPress={() => handleUserTypeSelect('client')}
            >
              <View style={[styles.iconContainer, { backgroundColor: colors.primary }]}>
                <Text style={styles.iconText}>🏠</Text>
              </View>
              <View style={styles.optionContent}>
                <Text style={[styles.optionTitle, { color: colors.text }]}>
                  I need plumbing services
                </Text>
                <Text style={[styles.optionDescription, { color: colors.gray }]}>
                  Book qualified plumbers for your home or business
                </Text>
              </View>
            </TouchableOpacity>

            {/* Provider Option */}
            <TouchableOpacity
              style={[styles.optionCard, { backgroundColor: colors.lightGray }]}
              onPress={() => handleUserTypeSelect('provider')}
            >
              <View style={[styles.iconContainer, { backgroundColor: colors.accent }]}>
                <Text style={styles.iconText}>🔧</Text>
              </View>
              <View style={styles.optionContent}>
                <Text style={[styles.optionTitle, { color: colors.text }]}>
                  I provide plumbing services
                </Text>
                <Text style={[styles.optionDescription, { color: colors.gray }]}>
                  Join our network of qualified plumbers
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.gray }]}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => router.push('/auth/login')}>
              <Text style={[styles.loginText, { color: colors.primary }]}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  optionsContainer: {
    flex: 1,
    gap: 20,
  },
  optionCard: {
    flexDirection: 'row',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    gap: 16,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 24,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  footerText: {
    fontSize: 16,
  },
  loginText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 