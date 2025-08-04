import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function UserTypeScreen() {
  const [selectedType, setSelectedType] = useState<'client' | 'provider' | null>(null);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const handleTypeSelect = (type: 'client' | 'provider') => {
    setSelectedType(type);
  };

  const handleContinue = () => {
    if (selectedType) {
      router.push({
        pathname: '/auth/register',
        params: { userType: selectedType }
      });
    }
  };

  const handleBack = () => {
    router.back();
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
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Text style={[styles.backButtonText, { color: colors.primary }]}>← Back</Text>
            </TouchableOpacity>
            <Text style={[styles.title, { color: colors.text }]}>Choose Your Role</Text>
            <Text style={[styles.subtitle, { color: colors.gray }]}>
              Select how you'll use Mugo Plumbing Solutions
            </Text>
          </View>

          {/* User Type Cards */}
          <View style={styles.cardsContainer}>
            {/* Client Card */}
            <TouchableOpacity
              style={[
                styles.card,
                { backgroundColor: colors.lightGray },
                selectedType === 'client' && { borderColor: colors.primary, borderWidth: 2 }
              ]}
              onPress={() => handleTypeSelect('client')}
            >
              <View style={[styles.cardIcon, { backgroundColor: '#4ECDC4' }]}>
                <Text style={styles.cardIconText}>👤</Text>
              </View>
              <Text style={[styles.cardTitle, { color: colors.text }]}>I'm a Customer</Text>
              <Text style={[styles.cardDescription, { color: colors.gray }]}>
                I need plumbing services for my home or business
              </Text>
              <View style={styles.cardFeatures}>
                <Text style={[styles.cardFeature, { color: colors.gray }]}>• Book plumbing services</Text>
                <Text style={[styles.cardFeature, { color: colors.gray }]}>• Find qualified plumbers</Text>
                <Text style={[styles.cardFeature, { color: colors.gray }]}>• Get quotes and estimates</Text>
                <Text style={[styles.cardFeature, { color: colors.gray }]}>• Track service requests</Text>
              </View>
            </TouchableOpacity>

            {/* Provider Card */}
            <TouchableOpacity
              style={[
                styles.card,
                { backgroundColor: colors.lightGray },
                selectedType === 'provider' && { borderColor: colors.primary, borderWidth: 2 }
              ]}
              onPress={() => handleTypeSelect('provider')}
            >
              <View style={[styles.cardIcon, { backgroundColor: '#45B7D1' }]}>
                <Text style={styles.cardIconText}>👨‍🔧</Text>
              </View>
              <Text style={[styles.cardTitle, { color: colors.text }]}>I'm a Plumber</Text>
              <Text style={[styles.cardDescription, { color: colors.gray }]}>
                I provide plumbing services and want to grow my business
              </Text>
              <View style={styles.cardFeatures}>
                <Text style={[styles.cardFeature, { color: colors.gray }]}>• Receive service requests</Text>
                <Text style={[styles.cardFeature, { color: colors.gray }]}>• Manage your business</Text>
                <Text style={[styles.cardFeature, { color: colors.gray }]}>• Set your rates</Text>
                <Text style={[styles.cardFeature, { color: colors.gray }]}>• Build your reputation</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            style={[
              styles.continueButton,
              { backgroundColor: selectedType ? colors.primary : colors.gray },
              !selectedType && styles.buttonDisabled
            ]}
            onPress={handleContinue}
            disabled={!selectedType}
          >
            <Text style={styles.continueButtonText}>
              {selectedType ? 'Continue' : 'Select a role to continue'}
            </Text>
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
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 60, // Increased top padding to avoid status bar
    paddingBottom: 40,
  },
  header: {
    marginBottom: 40,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  cardsContainer: {
    flex: 1,
    gap: 20,
  },
  card: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  cardIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
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
    lineHeight: 20,
    marginBottom: 16,
  },
  cardFeatures: {
    width: '100%',
  },
  cardFeature: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  continueButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 