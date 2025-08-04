import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
  StatusBar,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function RegisterScreen() {
  const { userType } = useLocalSearchParams<{ userType: 'client' | 'provider' }>();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    // Provider specific fields
    businessName: '',
    serviceArea: '',
    experience: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const isProvider = userType === 'provider';

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.fullName || !formData.phone || !formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill in all required fields');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }

    if (isProvider && (!formData.businessName || !formData.serviceArea)) {
      Alert.alert('Error', 'Please fill in all provider fields');
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // TODO: Implement actual registration logic
      // For now, just navigate to main app
      setTimeout(() => {
        router.replace('/(tabs)');
      }, 1000);
    } catch (error) {
      Alert.alert('Error', 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                <Text style={[styles.backButtonText, { color: colors.primary }]}>← Back</Text>
              </TouchableOpacity>
              <Text style={[styles.title, { color: colors.text }]}>
                {isProvider ? 'Provider Registration' : 'Create Account'}
              </Text>
              <Text style={[styles.subtitle, { color: colors.gray }]}>
                {isProvider 
                  ? 'Join our network of qualified plumbers'
                  : 'Sign up to book plumbing services'
                }
              </Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: colors.text }]}>Full Name *</Text>
                <TextInput
                  style={[styles.input, { 
                    backgroundColor: colors.lightGray,
                    color: colors.text,
                    borderColor: colors.gray
                  }]}
                  placeholder="Enter your full name"
                  placeholderTextColor={colors.gray}
                  value={formData.fullName}
                  onChangeText={(value) => handleInputChange('fullName', value)}
                  autoCapitalize="words"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: colors.text }]}>Phone Number *</Text>
                <TextInput
                  style={[styles.input, { 
                    backgroundColor: colors.lightGray,
                    color: colors.text,
                    borderColor: colors.gray
                  }]}
                  placeholder="Enter your phone number"
                  placeholderTextColor={colors.gray}
                  value={formData.phone}
                  onChangeText={(value) => handleInputChange('phone', value)}
                  keyboardType="phone-pad"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: colors.text }]}>Email Address *</Text>
                <TextInput
                  style={[styles.input, { 
                    backgroundColor: colors.lightGray,
                    color: colors.text,
                    borderColor: colors.gray
                  }]}
                  placeholder="Enter your email address"
                  placeholderTextColor={colors.gray}
                  value={formData.email}
                  onChangeText={(value) => handleInputChange('email', value)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: colors.text }]}>Password *</Text>
                <TextInput
                  style={[styles.input, { 
                    backgroundColor: colors.lightGray,
                    color: colors.text,
                    borderColor: colors.gray
                  }]}
                  placeholder="Create a password"
                  placeholderTextColor={colors.gray}
                  value={formData.password}
                  onChangeText={(value) => handleInputChange('password', value)}
                  secureTextEntry
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: colors.text }]}>Confirm Password *</Text>
                <TextInput
                  style={[styles.input, { 
                    backgroundColor: colors.lightGray,
                    color: colors.text,
                    borderColor: colors.gray
                  }]}
                  placeholder="Confirm your password"
                  placeholderTextColor={colors.gray}
                  value={formData.confirmPassword}
                  onChangeText={(value) => handleInputChange('confirmPassword', value)}
                  secureTextEntry
                  autoCapitalize="none"
                />
              </View>

              {/* Provider specific fields */}
              {isProvider && (
                <>
                  <View style={styles.inputContainer}>
                    <Text style={[styles.label, { color: colors.text }]}>Business Name *</Text>
                    <TextInput
                      style={[styles.input, { 
                        backgroundColor: colors.lightGray,
                        color: colors.text,
                        borderColor: colors.gray
                      }]}
                      placeholder="Enter your business name"
                      placeholderTextColor={colors.gray}
                      value={formData.businessName}
                      onChangeText={(value) => handleInputChange('businessName', value)}
                      autoCapitalize="words"
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={[styles.label, { color: colors.text }]}>Service Area *</Text>
                    <TextInput
                      style={[styles.input, { 
                        backgroundColor: colors.lightGray,
                        color: colors.text,
                        borderColor: colors.gray
                      }]}
                      placeholder="e.g., Harare, Bulawayo"
                      placeholderTextColor={colors.gray}
                      value={formData.serviceArea}
                      onChangeText={(value) => handleInputChange('serviceArea', value)}
                      autoCapitalize="words"
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={[styles.label, { color: colors.text }]}>Years of Experience</Text>
                    <TextInput
                      style={[styles.input, { 
                        backgroundColor: colors.lightGray,
                        color: colors.text,
                        borderColor: colors.gray
                      }]}
                      placeholder="e.g., 5 years"
                      placeholderTextColor={colors.gray}
                      value={formData.experience}
                      onChangeText={(value) => handleInputChange('experience', value)}
                      keyboardType="numeric"
                    />
                  </View>
                </>
              )}

              <TouchableOpacity
                style={[styles.registerButton, { backgroundColor: colors.primary }]}
                onPress={handleRegister}
                disabled={isLoading}
              >
                <Text style={styles.registerButtonText}>
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Text>
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
          </ScrollView>
        </KeyboardAvoidingView>
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
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
  },
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  registerButton: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 24,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
  },
  loginText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 