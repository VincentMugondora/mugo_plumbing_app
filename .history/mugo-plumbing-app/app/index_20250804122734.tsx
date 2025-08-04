import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function WelcomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleSignIn = () => {
    router.push('/auth/login');
  };

  const handleSignUp = () => {
    router.push('/auth/user-type');
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
          {/* Logo and Brand */}
          <View style={styles.brandSection}>
            <View style={[styles.logoContainer, { backgroundColor: colors.primary }]}>
              <Text style={styles.logoText}>🔧</Text>
            </View>
            <Text style={[styles.brandTitle, { color: colors.text }]}>
              Mugo Plumbing Solutions
            </Text>
            <Text style={[styles.brandSubtitle, { color: colors.gray }]}>
              Professional plumbing services at your fingertips
            </Text>
          </View>

          {/* Features */}
          <View style={styles.featuresSection}>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🚨</Text>
              <Text style={[styles.featureTitle, { color: colors.text }]}>
                24/7 Emergency Service
              </Text>
              <Text style={[styles.featureDescription, { color: colors.gray }]}>
                Round-the-clock emergency plumbing assistance
              </Text>
            </View>

            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>👨‍🔧</Text>
              <Text style={[styles.featureTitle, { color: colors.text }]}>
                Qualified Professionals
              </Text>
              <Text style={[styles.featureDescription, { color: colors.gray }]}>
                Verified and experienced plumbers
              </Text>
            </View>

            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>💰</Text>
              <Text style={[styles.featureTitle, { color: colors.text }]}>
                Transparent Pricing
              </Text>
              <Text style={[styles.featureDescription, { color: colors.gray }]}>
                Clear quotes with no hidden fees
              </Text>
            </View>

            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>⚡</Text>
              <Text style={[styles.featureTitle, { color: colors.text }]}>
                Quick Response
              </Text>
              <Text style={[styles.featureDescription, { color: colors.gray }]}>
                Fast booking and service delivery
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsSection}>
            <TouchableOpacity
              style={[styles.primaryButton, { backgroundColor: colors.primary }]}
              onPress={handleSignUp}
            >
              <Text style={styles.primaryButtonText}>Get Started</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.secondaryButton, { borderColor: colors.primary }]}
              onPress={handleSignIn}
            >
              <Text style={[styles.secondaryButtonText, { color: colors.primary }]}>
                I already have an account
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.gray }]}>
              By continuing, you agree to our Terms of Service and Privacy Policy
            </Text>
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
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  brandSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 40,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 34,
  },
  brandSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  featuresSection: {
    flex: 1,
    marginBottom: 40,
  },
  featureItem: {
    alignItems: 'center',
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 22,
  },
  featureDescription: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  actionsSection: {
    marginBottom: 30,
  },
  primaryButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
}); 