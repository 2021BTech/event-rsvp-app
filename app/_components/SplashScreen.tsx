import { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';

type SplashScreenProps = {
  onAnimationComplete?: () => void;
};

export default function SplashScreen({ onAnimationComplete }: SplashScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const logoPosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.timing(logoPosition, {
        toValue: -50,
        duration: 1500,
        delay: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        onAnimationComplete?.();
      }, 0);
    });
  }, [fadeAnim, logoPosition, onAnimationComplete, scaleAnim]);

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.logoContainer,
          { 
            opacity: fadeAnim,
            transform: [
              { scale: scaleAnim },
              { translateY: logoPosition }
            ] 
          }
        ]}
      >
        <Image
          source={require('../../assets/images/eventflow-bg.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Animated.Text style={[styles.logoText, { opacity: fadeAnim }]}>
          EventFlow
        </Animated.Text>
      </Animated.View>

      <Animated.View style={[styles.bottomTextContainer, { opacity: fadeAnim }]}>
        <Text style={styles.bottomText}>Your Event Management Solution</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 100,
  },
  logoImage: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    marginTop: 16,
  },
  bottomTextContainer: {
    position: 'absolute',
    bottom: 60,
  },
  bottomText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
});