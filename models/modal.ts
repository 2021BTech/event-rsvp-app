export interface AuthModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  defaultMode?: 'login' | 'register';
}