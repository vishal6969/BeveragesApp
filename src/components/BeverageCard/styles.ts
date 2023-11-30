import { StyleSheet } from "react-native";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: colors.white,
    padding: 16,
    elevation: 4,
    borderRadius: 10,
    marginBottom: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: "500",
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 14,
  },
  tagline: {
    color: colors.lightGray,
  },
  description: {
    flexDirection: "row",
    marginTop: 16,
  },
  descriptionTxt: {
    flex: 1,
    flexWrap: "wrap",
    color: colors.lightGreen,
  },
});

export default styles;
