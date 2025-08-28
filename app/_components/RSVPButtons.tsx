import { useAuth } from '@/context/AuthContext';
import { useRequest } from '@/hooks/useRequest';
import { RSVPButtonProps, RSVPStatus } from '@/models/events';
import { Endpoints } from '@/utils/enums';
import { showToast } from '@/utils/toast';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AuthModal from './AuthModal';


export default function RSVPButton({ eventId, initialStatus = null, onStatusChange }: RSVPButtonProps) {
  const [rsvpStatus, setRsvpStatus] = useState<RSVPStatus>(initialStatus);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { user, token } = useAuth();
  const { request } = useRequest();

  const handleRSVP = async (status: RSVPStatus) => {
    if (!user || !token) {
      setAuthMode('login');
      setShowAuthModal(true);
      return;
    }
  
    if (rsvpStatus === status) {
      showToast('info', `You are already marked as ${status}`);
      return;
    }
  
    await request({
      method: 'POST',
      url: Endpoints.RSVP_EVENT.replace(':id', eventId),
      data: { status },
      onSuccess: () => {
        setRsvpStatus(status);
        if (onStatusChange) {
          onStatusChange(status);
        }
        showToast('success', `You've marked yourself as ${status}`);
      },
      onError: (error) => {
        showToast('error', 'Failed to update RSVP status');
        console.error('RSVP error:', error);
      }
    });
  };
  

  const handleAuthSuccess = () => {
    // After successful authentication, the user can now RSVP
    showToast('success', 'You are now logged in. You can RSVP to events.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Will you be attending?</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            rsvpStatus === 'Going' && styles.buttonSelected
          ]}
          onPress={() => handleRSVP('Going')}
        >
          <Ionicons
            name="checkmark-circle"
            size={20}
            color={rsvpStatus === 'Going' ? 'white' : '#04016C'}
          />
          <Text
            style={[
              styles.buttonText,
              rsvpStatus === 'Going' && styles.buttonTextSelected
            ]}
          >
            Going
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            rsvpStatus === 'Maybe' && styles.buttonSelected
          ]}
          onPress={() => handleRSVP('Maybe')}
        >
          <Ionicons
            name="help-circle"
            size={20}
            color={rsvpStatus === 'Maybe' ? 'white' : '#04016C'}
          />
          <Text
            style={[
              styles.buttonText,
              rsvpStatus === 'Maybe' && styles.buttonTextSelected
            ]}
          >
            Maybe
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            rsvpStatus === 'NotGoing' && styles.buttonSelected
          ]}
          onPress={() => handleRSVP('NotGoing')}
        >
          <Ionicons
            name="close-circle"
            size={20}
            color={rsvpStatus === 'NotGoing' ? 'white' : '#04016C'}
          />
          <Text
            style={[
              styles.buttonText,
              rsvpStatus === 'NotGoing' && styles.buttonTextSelected
            ]}
          >
            Can&apos;t Go
          </Text>
        </TouchableOpacity>
      </View>

      {rsvpStatus && (
        <Text style={styles.confirmationText}>
          {rsvpStatus === 'Going' 
            ? "You're going! 🎉" 
            : rsvpStatus === 'Maybe' 
            ? "We'll see you there! 🤞" 
            : "Hope to see you next time! 👋"}
        </Text>
      )}

      <AuthModal
        visible={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
        defaultMode={authMode}
      />
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