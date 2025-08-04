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
  Alert,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const serviceTypes = [
  { id: 'emergency', name: 'Emergency Plumbing', icon: '🚨', description: '24/7 emergency repairs' },
  { id: 'installation', name: 'Pipe Installation', icon: '🔧', description: 'New pipe systems' },
  { id: 'drain', name: 'Drain Cleaning', icon: '🚿', description: 'Clogged drains & sewers' },
  { id: 'heater', name: 'Water Heater', icon: '🔥', description: 'Repair & installation' },
  { id: 'leak', name: 'Leak Detection', icon: '💧', description: 'Find & fix leaks' },
  { id: 'remodel', name: 'Bathroom Remodel', icon: '🚽', description: 'Complete renovations' },
];

export default function BookingScreen() {
  const { serviceId, serviceName } = useLocalSearchParams<{ serviceId?: string; serviceName?: string }>();
  const [selectedService, setSelectedService] = useState(serviceId || '');
  const [formData, setFormData] = useState({
    address: '',
    description: '',
    preferredDate: '',
    preferredTime: '',
    budget: '',
    urgency: 'normal',
  });
  const [currentStep, setCurrentStep] = useState(1);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep === 1 && !selectedService) {
      Alert.alert('Error', 'Please select a service type');
      return;
    }
    if (currentStep === 2 && !formData.address) {
      Alert.alert('Error', 'Please enter your address');
      return;
    }
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  const handleSubmit = () => {
    // TODO: Implement actual booking submission
    Alert.alert(
      'Booking Submitted',
      'Your booking has been submitted successfully. A provider will be assigned shortly.',
      [
        {
          text: 'OK',
          onPress: () => router.push('/(tabs)/bookings'),
        },
      ]
    );
  };

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={[styles.stepTitle, { color: colors.text }]}>
        Select Service Type
      </Text>
      <Text style={[styles.stepDescription, { color: colors.gray }]}>
        Choose the type of plumbing service you need
      </Text>
      
      <View style={styles.serviceGrid}>
        {serviceTypes.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={[
              styles.serviceCard,
              { backgroundColor: colors.lightGray },
              selectedService === service.id && { borderColor: colors.primary, borderWidth: 2 }
            ]}
            onPress={() => handleServiceSelect(service.id)}
          >
            <Text style={styles.serviceIcon}>{service.icon}</Text>
            <Text style={[styles.serviceName, { color: colors.text }]}>
              {service.name}
            </Text>
            <Text style={[styles.serviceDescription, { color: colors.gray }]}>
              {service.description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={[styles.stepTitle, { color: colors.text }]}>
        Service Details
      </Text>
      <Text style={[styles.stepDescription, { color: colors.gray }]}>
        Provide details about your service request
      </Text>
      
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: colors.text }]}>Service Address *</Text>
          <TextInput
            style={[styles.input, { 
              backgroundColor: colors.lightGray,
              color: colors.text,
              borderColor: colors.gray
            }]}
            placeholder="Enter your full address"
            placeholderTextColor={colors.gray}
            value={formData.address}
            onChangeText={(value) => handleInputChange('address', value)}
            multiline
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: colors.text }]}>Description</Text>
          <TextInput
            style={[styles.textArea, { 
              backgroundColor: colors.lightGray,
              color: colors.text,
              borderColor: colors.gray
            }]}
            placeholder="Describe the issue or service needed..."
            placeholderTextColor={colors.gray}
            value={formData.description}
            onChangeText={(value) => handleInputChange('description', value)}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
            <Text style={[styles.label, { color: colors.text }]}>Preferred Date</Text>
            <TextInput
              style={[styles.input, { 
                backgroundColor: colors.lightGray,
                color: colors.text,
                borderColor: colors.gray
              }]}
              placeholder="MM/DD/YYYY"
              placeholderTextColor={colors.gray}
              value={formData.preferredDate}
              onChangeText={(value) => handleInputChange('preferredDate', value)}
            />
          </View>
          <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
            <Text style={[styles.label, { color: colors.text }]}>Preferred Time</Text>
            <TextInput
              style={[styles.input, { 
                backgroundColor: colors.lightGray,
                color: colors.text,
                borderColor: colors.gray
              }]}
              placeholder="HH:MM AM/PM"
              placeholderTextColor={colors.gray}
              value={formData.preferredTime}
              onChangeText={(value) => handleInputChange('preferredTime', value)}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: colors.text }]}>Budget (Optional)</Text>
          <TextInput
            style={[styles.input, { 
              backgroundColor: colors.lightGray,
              color: colors.text,
              borderColor: colors.gray
            }]}
            placeholder="Enter your budget range"
            placeholderTextColor={colors.gray}
            value={formData.budget}
            onChangeText={(value) => handleInputChange('budget', value)}
          />
        </View>
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={[styles.stepTitle, { color: colors.text }]}>
        Review & Confirm
      </Text>
      <Text style={[styles.stepDescription, { color: colors.gray }]}>
        Review your booking details before submitting
      </Text>
      
      <View style={[styles.reviewCard, { backgroundColor: colors.lightGray }]}>
        <View style={styles.reviewSection}>
          <Text style={[styles.reviewLabel, { color: colors.gray }]}>Service Type</Text>
          <Text style={[styles.reviewValue, { color: colors.text }]}>
            {serviceTypes.find(s => s.id === selectedService)?.name}
          </Text>
        </View>
        
        <View style={styles.reviewSection}>
          <Text style={[styles.reviewLabel, { color: colors.gray }]}>Address</Text>
          <Text style={[styles.reviewValue, { color: colors.text }]}>
            {formData.address}
          </Text>
        </View>
        
        {formData.description && (
          <View style={styles.reviewSection}>
            <Text style={[styles.reviewLabel, { color: colors.gray }]}>Description</Text>
            <Text style={[styles.reviewValue, { color: colors.text }]}>
              {formData.description}
            </Text>
          </View>
        )}
        
        {(formData.preferredDate || formData.preferredTime) && (
          <View style={styles.reviewSection}>
            <Text style={[styles.reviewLabel, { color: colors.gray }]}>Preferred Time</Text>
            <Text style={[styles.reviewValue, { color: colors.text }]}>
              {formData.preferredDate} {formData.preferredTime}
            </Text>
          </View>
        )}
        
        {formData.budget && (
          <View style={styles.reviewSection}>
            <Text style={[styles.reviewLabel, { color: colors.gray }]}>Budget</Text>
            <Text style={[styles.reviewValue, { color: colors.text }]}>
              {formData.budget}
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={[styles.backButtonText, { color: colors.primary }]}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>Book Service</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { 
                backgroundColor: colors.primary,
                width: `${(currentStep / 3) * 100}%`
              }
            ]} 
          />
        </View>
        <Text style={[styles.progressText, { color: colors.gray }]}>
          Step {currentStep} of 3
        </Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.footerButton, { backgroundColor: colors.lightGray }]}
          onPress={handleBack}
        >
          <Text style={[styles.footerButtonText, { color: colors.text }]}>
            {currentStep === 1 ? 'Cancel' : 'Back'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.footerButton, { backgroundColor: colors.primary }]}
          onPress={handleNext}
        >
          <Text style={styles.footerButtonText}>
            {currentStep === 3 ? 'Submit Booking' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
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
  backButton: {
    paddingVertical: 8,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 60,
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 14,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  stepContainer: {
    paddingBottom: 20,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 16,
    marginBottom: 24,
  },
  serviceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  serviceIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  serviceName: {
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
  formContainer: {
    gap: 20,
  },
  inputContainer: {
    marginBottom: 16,
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
  textArea: {
    height: 100,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
  },
  reviewCard: {
    padding: 20,
    borderRadius: 12,
  },
  reviewSection: {
    marginBottom: 16,
  },
  reviewLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  reviewValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
  },
  footerButton: {
    flex: 1,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
}); 