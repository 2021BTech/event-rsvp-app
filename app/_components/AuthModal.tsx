import { useAuth } from '@/context/AuthContext';
import { AuthModalProps } from '@/models/modal';
import { showToast } from '@/utils/toast';
import { useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';



export default function AuthModal({ visible, onClose, onSuccess, defaultMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, register } = useAuth();

  const handleSubmit = async () => {
    if (!email || !password) {
      showToast('error', 'Please fill in all required fields');
      return;
    }

    if (mode === 'register' && !name) {
        showToast('error', 'Please enter your name');
      return;
    }

    setIsLoading(true);
    
    try {
      let success = false;
      if (mode === 'login') {
        success = await login(email, password);
      } else {
        success = await register(name, email, password);
      }

      if (success) {
        onSuccess();
        onClose();
        resetForm();
      } else {
       showToast('error', mode === 'login' ? 'Invalid credentials' : 'Registration failed');
      }
    } catch (error) {
      showToast('error', 'An unexpected error occurred' + (error instanceof Error ? `: ${error.message}` : ''));
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </Text>

          {mode === 'register' && (
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          )}

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity 
            style={[styles.button, isLoading && styles.buttonDisabled]} 
            onPress={handleSubmit}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleMode} style={styles.switchMode}>
            <Text style={styles.switchModeText}>
              {mode === 'login' 
                ? "Don't have an account? Register" 
                : "Already have an account? Sign In"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose} style={styles.close}>
            <Text style={styles.closeText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    width: '85%',
    maxWidth: 400,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#04016C',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  switchMode: {
    alignItems: 'center',
    marginBottom: 16,
  },
  switchModeText: {
    color: '#04016C',
    fontSize: 14,
  },
  close: {
    alignItems: 'center',
  },
  closeText: {
    color: '#6B7280',
    fontSize: 14,
  },
});