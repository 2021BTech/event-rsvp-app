import { Link } from 'expo-router';
import { FlatList, StyleSheet, View } from 'react-native';

import EventCard from '@/components/EventCard';
import { events } from '../../constants/events';

export default function EventsScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        renderItem={({ item }) => (
          <Link href={`/events/${item.id}`} asChild>
            <EventCard event={item} />
          </Link>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  listContent: {
    padding: 16,
  },
});