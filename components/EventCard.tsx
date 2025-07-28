import { Event } from '@/models/events';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { Image, StyleSheet, Text, View } from 'react-native';

type EventCardProps = {
  event: Event;
};

export default function EventCard({ event }: EventCardProps) {
  return (
    <View style={styles.card}>
      <Image 
        source={{ uri: event.image }} 
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.date}>
          {format(event.date, 'MMMM d, yyyy')}
        </Text>
        <Text style={styles.title}>{event.title}</Text>
        <View style={styles.meta}>
          <View style={styles.metaItem}>
            <Ionicons name="location-outline" size={16} color="#6B7280" />
            <Text style={styles.metaText}>{event.location}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="people-outline" size={16} color="#6B7280" />
            <Text style={styles.metaText}>{event.attendees} attending</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 160,
  },
  content: {
    padding: 16,
  },
  date: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 12,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
});