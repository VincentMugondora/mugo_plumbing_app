import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { router, useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function RegisterScreen() {
  const { userType } = useLocalSearchParams<{ userType: 'client' | 'provider' }>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  // Provider-specific fields
  const [businessName, setBusinessName] = useState('');
  const [serviceArea, setServiceArea] = useState('');
  const [experience, setExperience] = useState('');

  const isProvider = userType === 'provider';

  const handleRegister = async () => {
    // Basic validation
    if (!email || !password || !confirmPassword || !displayName || !phone) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (isProvider && (!businessName || !serviceArea)) {
      Alert.alert('Error', 'Please fill in all provider fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const additionalData = {
        phone,
        location,
        businessName: isProvider ? businessName : '',
        serviceArea: isProvider ? serviceArea : '',
        experience: isProvider ? experience : '',
      };

      await signUp(email, password, displayName, userType || 'client', additionalData);
      Alert.alert('Success', 'Account created successfully!', [
        { text: 'OK', onPress: () => router.replace('/(tabs)') }
      ]);
    } catch (error: any) {
      Alert.alert('Registration Failed', error.message);
    } finally {
      setLoading(false);
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
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
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

            <View style={styles.form}>
              {/* Common Fields */}
              <TextInput
                style={[styles.input, { 
                  backgroundColor: colors.lightGray,
                  borderColor: colors.gray,
                  color: colors.text 
                }]}
                placeholder="Full Name *"
                placeholderTextColor={colors.gray}
                value={displayName}
                onChangeText={setDisplayName}
                autoCapitalize="words"
                autoCorrect={false}
              />

              <TextInput
                style={[styles.input, { 
                  backgroundColor: colors.lightGray,
                  borderColor: colors.gray,
                  color: colors.text 
                }]}
                placeholder="Email *"
                placeholderTextColor={colors.gray}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />

              <TextInput
                style={[styles.input, { 
                  backgroundColor: colors.lightGray,
                  borderColor: colors.gray,
                  color: colors.text 
                }]}
                placeholder="Phone Number *"
                placeholderTextColor={colors.gray}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                autoCapitalize="none"
                autoCorrect={false}
              />

              <TextInput
                style={[styles.input, { 
                  backgroundColor: colors.lightGray,
                  borderColor: colors.gray,
                  color: colors.text 
                }]}
                placeholder="Location *"
                placeholderTextColor={colors.gray}
                value={location}
                onChangeText={setLocation}
                autoCapitalize="words"
                autoCorrect={false}
              />

              <TextInput
                style={[styles.input, { 
                  backgroundColor: colors.lightGray,
                  borderColor: colors.gray,
                  color: colors.text 
                }]}
                placeholder="Password *"
                placeholderTextColor={colors.gray}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />

              <TextInput
                style={[styles.input, { 
                  backgroundColor: colors.lightGray,
                  borderColor: colors.gray,
                  color: colors.text 
                }]}
                placeholder="Confirm Password *"
                placeholderTextColor={colors.gray}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />

              {/* Provider-specific fields */}
              {isProvider && (
                <>
                  <Text style={[styles.sectionTitle, { color: colors.primary }]}>Business Information</Text>
                  
                  <TextInput
                    style={[styles.input, { 
                      backgroundColor: colors.lightGray,
                      borderColor: colors.gray,
                      color: colors.text 
                    }]}
                    placeholder="Business Name *"
                    placeholderTextColor={colors.gray}
                    value={businessName}
                    onChangeText={setBusinessName}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />

                  <TextInput
                    style={[styles.input, { 
                      backgroundColor: colors.lightGray,
                      borderColor: colors.gray,
                      color: colors.text 
                    }]}
                    placeholder="Service Area (e.g., Harare, Bulawayo) *"
                    placeholderTextColor={colors.gray}
                    value={serviceArea}
                    onChangeText={setServiceArea}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />

                  <TextInput
                    style={[styles.input, { 
                      backgroundColor: colors.lightGray,
                      borderColor: colors.gray,
                      color: colors.text 
                    }]}
                    placeholder="Years of Experience"
                    placeholderTextColor={colors.gray}
                    value={experience}
                    onChangeText={setExperience}
                    keyboardType="numeric"
                    autoCorrect={false}
                  />
                </>
              )}

              <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.primary }, loading && styles.buttonDisabled]}
                onPress={handleRegister}
                disabled={loading}
              >
                <Text style={styles.buttonText}>
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.linkButton}
                onPress={() => router.push('/auth/login')}
              >
                <Text style={[styles.linkText, { color: colors.primary }]}>Already have an account? Sign In</Text>
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
  keyboardAvoidingView: {
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
    marginBottom: 30,
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
    marginBottom: 20,
  },
  form: {
    width: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 14,
  },
}); 