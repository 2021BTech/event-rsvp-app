import { Event } from '@/models/events';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { events } from '../../constants/events';
import RSVPButtons from '../_components/RSVPButtons';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams();
  const event = events.find(e => e.id === id) as Event;

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: event.title }} />
      
      <Image 
        source={{ uri: event.image }} 
        style={styles.headerImage}
      />
      
      <View style={styles.content}>
        <Text style={styles.date}>
          {format(event.date, 'EEEE, MMMM d, yyyy')}
        </Text>
        
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <Ionicons name="location-outline" size={20} color="#4F46E5" />
            <Text style={styles.metaText}>{event.location}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="people-outline" size={20} color="#4F46E5" />
            <Text style={styles.metaText}>{event.attendees} attending</Text>
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>About the Event</Text>
        <Text style={styles.description}>{event.description}</Text>
        
        <RSVPButtons />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  headerImage: {
    width: '100%',
    height: 240,
  },
  content: {
    padding: 24,
  },
  date: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  metaContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#374151',
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 12,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
    marginBottom: 32,
  },
});