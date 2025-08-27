import { useRequest } from '@/hooks/useRequest';
import { Event } from '@/models/events';
import { Endpoints } from '@/utils/enums';
import { showToast } from '@/utils/toast';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import RSVPButtons from '../_components/RSVPButtons';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const { request, loading } = useRequest();

  useEffect(() => {
    const fetchEvent = async () => {
      await request({
        method: 'GET',
        url: Endpoints.GET_EVENT_BY_ID + id,
        onSuccess: (data) => {
          if (!data) {
            console.error('Invalid event data:', data);
            return;
          }
          const eventData = {
            ...data,
            id: data._id,
            date: new Date(data.date),
            attendees: data.attendees?.length || 0,
          };
          setEvent(eventData);
          showToast('success', 'Event details loaded');
        },
        onError: (error) => {
          console.error('Failed to fetch event details:', error);
          showToast('error', 'Failed to load event details');
        },
      });
    };
  
    if (id) fetchEvent();
  }, [id]);
  

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#111827" />
      </View>
    );
  }

  if (!event) {
    return (
      <View style={styles.center}>
        <Text>Event not found</Text>
      </View>
    );
  }


  return (
    <ScrollView style={styles.container}>
    <Stack.Screen options={{ title: event.title }} />

    {event.image && (
      <Image 
        source={{ uri: event.image }} 
        style={styles.headerImage}
      />
    )}

<View style={styles.content}>
  <Text style={styles.date}>
    {format(event.date, 'EEEE, MMMM d, yyyy')}
  </Text>

  {/* Meta section */}
  <View style={styles.metaContainer}>
    <View style={styles.metaItem}>
      <Ionicons name="location-outline" size={18} color="#fff" />
      <Text
        style={styles.metaText}
        numberOfLines={2} 
        ellipsizeMode="tail"
      >
        {event.location?.address || 'No location'}
      </Text>
    </View>

    <View style={styles.metaItem}>
      <Ionicons name="people-outline" size={18} color="#fff" />
      <Text style={styles.metaText}>
        {event.attendees} / {event.maxAttendees} attending
      </Text>
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
    backgroundColor: '#04016C', 
    borderRadius: 12,
  padding: 12,
  marginBottom: 24,
  gap: 12, 
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    flex: 1,                    
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    color: '#fff',
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
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});