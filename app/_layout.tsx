import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import SplashScreenComponent from './_components/SplashScreen';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
    'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Medium': require('../assets/fonts/Inter-Medium.ttf'),
    'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
  });

  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Let the splash screen animation complete before hiding
      setTimeout(() => {
        SplashScreen.hideAsync();
        setAppReady(true);
      }, 1500);
    }
  }, [fontsLoaded, fontError]);

  if (!appReady) {
    return <SplashScreenComponent onAnimationComplete={() => setAppReady(true)} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4F46E5',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontFamily: 'Inter-SemiBold',
          },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="events/index" options={{ title: 'Upcoming Events' }} />
        <Stack.Screen name="events/[id]" options={{ title: 'Event Details' }} />
      </Stack>
    </View>
  );
}