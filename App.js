import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import ListViewScreen from "./src/screens/ListView";
import colors from "./src/constants/colors";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.lightGreen} />
      <ListViewScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
