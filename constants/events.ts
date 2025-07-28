import { Event } from "@/models/events";

export const events: Event[] = [
  {
    id: '1',
    title: 'Tech Conference 2023',
    date: new Date(2023, 10, 15),
    location: 'San Francisco, CA',
    attendees: 124,
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678',
    description: 'Annual technology conference featuring the latest innovations in AI, blockchain, and cloud computing.'
  },
  {
    id: '2',
    title: 'Design Workshop',
    date: new Date(2023, 10, 20),
    location: 'New York, NY',
    attendees: 45,
    image: 'https://images.unsplash.com/photo-1541178735493-479c1a27ed24',
    description: 'Hands-on workshop for UX/UI designers to improve their skills and network with peers.'
  },
  {
    id: '3',
    title: 'Startup Networking',
    date: new Date(2023, 11, 5),
    location: 'Austin, TX',
    attendees: 78,
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d',
    description: 'Connect with fellow entrepreneurs and investors in the startup ecosystem.'
  },
];