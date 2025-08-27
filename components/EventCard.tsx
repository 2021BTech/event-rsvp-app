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
      {event.image ? (
        <Image 
          source={{ uri: event.image }} 
          style={styles.image}
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Ionicons name="calendar-outline" size={48} color="#04016C" />
        </View>
      )}
      <View style={styles.content}>
        <Text style={styles.date}>
          {format(event.date, 'MMMM d, yyyy')}
        </Text>
        <Text style={styles.title}>{event.title}</Text>
        <View style={styles.meta}>
          <View style={styles.metaItem}>
            <Ionicons name="location-outline" size={16} color="#04016C" />
            <Text style={styles.metaText}>
              {event.location.address || 'Location not specified'}
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="people-outline" size={16} color="#04016C" />
            <Text style={styles.metaText}>
              {event.attendeesCount} / {event.maxAttendees}
            </Text>
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
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    width: '100%',
    height: 160,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
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
    color: '#04016C',
    marginBottom: 12,
    fontWeight: '600',
  },
  meta: {
    flexDirection: 'row',
    flexWrap: 'wrap',    
    gap: 12,            
    marginTop: 4,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,     
  },
  metaText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    flexShrink: 1,   
  },
  
});