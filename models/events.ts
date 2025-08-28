export interface Event {
  _id: string;
  title: string;
  description: string;
  date: Date;
  location: {
    address: string;
    lat: number | null;
    lng: number | null;
  };
  maxAttendees: number;
  image: string | null;
  attendees: string[]; 
  __v?: number;
  id: string;
  attendeesCount: number;
}

export type RSVPStatus = 'Going' | 'NotGoing' | 'Maybe' | null;
export interface RSVPButtonProps {
  eventId: string;
  initialStatus?: RSVPStatus;
  onStatusChange?: (newStatus: RSVPStatus) => void;
}
