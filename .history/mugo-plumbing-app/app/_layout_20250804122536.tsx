import { useEffect } from 'react';
import { SplashScreen, Stack } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { user, loading } = useAuth();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {loading ? (
        // Show loading screen while checking auth state
        <Stack.Screen name="index" />
      ) : user ? (
        // User is logged in, show main app
        <>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="booking" />
        </>
      ) : (
        // User is not logged in, show auth screens
        <>
          <Stack.Screen name="auth" />
          <Stack.Screen name="index" />
        </>
      )}
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <RootLayoutNav />
      </ThemeProvider>
    </AuthProvider>
  );
}
