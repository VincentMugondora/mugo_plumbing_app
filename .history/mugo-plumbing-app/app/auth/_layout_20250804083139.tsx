import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function AuthLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen 
          name="login" 
          options={{ 
            headerShown: false,
            title: 'Login'
          }} 
        />
        <Stack.Screen 
          name="register" 
          options={{ 
            headerShown: false,
            title: 'Register'
          }} 
        />
        <Stack.Screen 
          name="user-type" 
          options={{ 
            headerShown: false,
            title: 'Select User Type'
          }} 
        />
      </Stack>
      <StatusBar style="light" />
    </>
  );
} 