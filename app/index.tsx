import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  return (
    <LinearGradient
      colors={['#4F46E5', '#7C3AED']}
      style={styles.container}
    >
      <Image
        source={require('../assets/images/event-hero.png')}
        style={styles.heroImage}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to EventFlow</Text>
        <Text style={styles.subtitle}>
          Manage your events and RSVPs with ease
        </Text>
        <Link href="/events" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Browse Events</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heroImage: {
    width: 300,
    height: 300,
    marginBottom: 40,
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