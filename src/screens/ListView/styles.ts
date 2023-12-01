import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  cardsContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  scrollView: {
    marginTop: 64,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
