import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function UserTypeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const handleUserTypeSelect = (userType: 'client' | 'provider') => {
    router.push({
      pathname: '/auth/register',
      params: { userType }
    });
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={[styles.backButtonText, { color: colors.primary }]}>← Back</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text }]}>
            Choose Your Role
          </Text>
          <Text style={[styles.subtitle, { color: colors.gray }]}>
            Select how you'll use Mugo Plumbing Solutions
          </Text>

          {/* User Type Cards */}
          <View style={styles.cardsContainer}>
            {/* Customer Card */}
            <TouchableOpacity
              style={[styles.card, { backgroundColor: colors.lightGray }]}
              onPress={() => handleUserTypeSelect('client')}
            >
              <View style={[styles.cardIcon, { backgroundColor: '#0056A6' }]}>
                <Text style={styles.cardIconText}>👤</Text>
              </View>
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                I'm a Customer
              </Text>
              <Text style={[styles.cardDescription, { color: colors.gray }]}>
                I need plumbing services and want to book qualified plumbers
              </Text>
              <View style={styles.cardFeatures}>
                <Text style={[styles.featureText, { color: colors.gray }]}>
                  • Book plumbing services
                </Text>
                <Text style={[styles.featureText, { color: colors.gray }]}>
                  • Track service progress
                </Text>
                <Text style={[styles.featureText, { color: colors.gray }]}>
                  • Rate and review providers
                </Text>
                <Text style={[styles.featureText, { color: colors.gray }]}>
                  • Secure payments
                </Text>
              </View>
            </TouchableOpacity>

            {/* Provider Card */}
            <TouchableOpacity
              style={[styles.card, { backgroundColor: colors.lightGray }]}
              onPress={() => handleUserTypeSelect('provider')}
            >
              <View style={[styles.cardIcon, { backgroundColor: '#1FC2B3' }]}>
                <Text style={styles.cardIconText}>🔧</Text>
              </View>
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                I'm a Provider
              </Text>
              <Text style={[styles.cardDescription, { color: colors.gray }]}>
                I'm a qualified plumber and want to offer my services
              </Text>
              <View style={styles.cardFeatures}>
                <Text style={[styles.featureText, { color: colors.gray }]}>
                  • Receive job requests
                </Text>
                <Text style={[styles.featureText, { color: colors.gray }]}>
                  • Manage your schedule
                </Text>
                <Text style={[styles.featureText, { color: colors.gray }]}>
                  • Earn money
                </Text>
                <Text style={[styles.featureText, { color: colors.gray }]}>
                  • Build your reputation
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  cardsContainer: {
    flex: 1,
    gap: 20,
  },
  card: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    alignSelf: 'center',
  },
  cardIconText: {
    fontSize: 28,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  cardFeatures: {
    gap: 8,
  },
  featureText: {
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 16,
  },
  loginText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 