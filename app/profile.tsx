import { ScrollView, StyleSheet } from "react-native";
import UserProfile from "./_components/UserProfile";

export default function ProfileScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <UserProfile />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#F9FAFB",
  },
});
