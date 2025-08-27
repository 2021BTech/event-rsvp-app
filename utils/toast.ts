import Toast from "react-native-toast-message";

export const showToast = (type: "success" | "error" | "info", message: string) => {
  Toast.show({
    type,
    text1: message,
    visibilityTime: 3000,
    position: "bottom",
  });
};