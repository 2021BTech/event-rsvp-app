import EventCard from '@/components/EventCard';
import { useAuth } from '@/context/AuthContext';
import { useRequest } from '@/hooks/useRequest';
import { Event } from '@/models/events';
import { Endpoints } from '@/utils/enums';
import { showToast } from '@/utils/toast';
import { Ionicons } from '@expo/vector-icons';
import { Link, useNavigation, useRouter } from 'expo-router';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function EventsScreen() {
  const { request, loading } = useRequest();
  const [events, setEvents] = useState<Event[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuth();
  const navigation = useNavigation();
  const router = useRouter();

  const fetchEvents = useCallback(async () => {
    await request({
      method: 'GET',
      url: Endpoints.GET_EVENT,
      onSuccess: (data) => {
        if (!data.events || !Array.isArray(data.events)) {
          console.error('Invalid events data:', data.events);
          return;
        }
        const eventsData = data.events.map((e: any) => ({
          ...e,
          id: e._id,
          date: new Date(e.date),
          attendees: e.attendees?.length || 0,
        }));
        setEvents(eventsData);
        showToast('success', eventsData.length + ' events loaded');
      },
      onError: (error) => {
        console.error('Failed to fetch events:', error);
      },
    });
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchEvents();
    setRefreshing(false);
  }, [fetchEvents]);

  // 👇 Add headerRight user icon if logged in
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        user ? (
          <TouchableOpacity
            onPress={() => router.push('/profile')}
            style={{ marginRight: 12 }}
          >
            <Ionicons name="person-circle-outline" size={28} color="#fff" />
          </TouchableOpacity>
        ) : null,
    });
  }, [navigation, user]);

  if (loading && !refreshing) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#04016C" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        renderItem={({ item }) => (
          <Link href={`/events/${item.id}`} asChild>
            <TouchableOpacity activeOpacity={0.8}>
              <EventCard event={item} />
            </TouchableOpacity>
          </Link>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#04016C']}
          />
        }
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
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
