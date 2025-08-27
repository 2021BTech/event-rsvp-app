import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace('/events'); 
    }, 5000); 

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <ImageBackground
      source={require('../assets/images/event-hero.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['#04016C', 'rgba(4,1,108,0.5)', 'rgba(4,1,108,0.3)', 'transparent']}
        style={styles.overlay}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Welcome to EventFlow</Text>
          <Text style={styles.subtitle}>
            Manage your events and RSVPs with ease
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/events')}>
            <Text style={styles.buttonText}>Browse Events</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'white',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#4F46E5',
    fontSize: 18,
    fontWeight: '600',
  },
});
