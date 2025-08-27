import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type RSVPStatus = 'yes' | 'maybe' | 'no' | null;

export default function RSVPButtons() {
  const [rsvpStatus, setRsvpStatus] = useState<RSVPStatus>(null);

  const handleRSVP = (status: RSVPStatus) => {
    setRsvpStatus(status);
    // Here you would typically make an API call to update the RSVP status
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Will you be attending?</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            rsvpStatus === 'yes' && styles.buttonSelected
          ]}
          onPress={() => handleRSVP('yes')}
        >
          <Ionicons
            name="checkmark-circle"
            size={20}
            color={rsvpStatus === 'yes' ? 'white' : '#04016C'}
          />
          <Text
            style={[
              styles.buttonText,
              rsvpStatus === 'yes' && styles.buttonTextSelected
            ]}
          >
            Going
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            rsvpStatus === 'maybe' && styles.buttonSelected
          ]}
          onPress={() => handleRSVP('maybe')}
        >
          <Ionicons
            name="help-circle"
            size={20}
            color={rsvpStatus === 'maybe' ? 'white' : '#04016C'}
          />
          <Text
            style={[
              styles.buttonText,
              rsvpStatus === 'maybe' && styles.buttonTextSelected
            ]}
          >
            Maybe
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            rsvpStatus === 'no' && styles.buttonSelected
          ]}
          onPress={() => handleRSVP('no')}
        >
          <Ionicons
            name="close-circle"
            size={20}
            color={rsvpStatus === 'no' ? 'white' : '#04016C'}
          />
          <Text
            style={[
              styles.buttonText,
              rsvpStatus === 'no' && styles.buttonTextSelected
            ]}
          >
            Can&apos;t Go
          </Text>
        </TouchableOpacity>
      </View>

      {rsvpStatus && (
        <Text style={styles.confirmationText}>
          {rsvpStatus === 'yes' 
            ? "You're going! 🎉" 
            : rsvpStatus === 'maybe' 
            ? "We'll see you there! 🤞" 
            : "Hope to see you next time! 👋"}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  buttonSelected: {
    backgroundColor: '#04016C',
    borderColor: '#04016C',
  },
  buttonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#04016C',
  },
  buttonTextSelected: {
    color: '#FFFFFF',
  },
  confirmationText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#04016C',
    textAlign: 'center',
    marginTop: 16,
  },
});