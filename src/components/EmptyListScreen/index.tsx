import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import colors from "../../constants/colors";
import { SadEmoji } from "../../icons";

const EmptyListScreen = () => {
  return (
    <View style={styles.container}>
      <SadEmoji height={96} width={96} />
      <Text style={styles.title}>Nothing here...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    color: colors.lightGreen,
  },
});

export default EmptyListScreen;
