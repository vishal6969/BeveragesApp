import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Text, View, TouchableOpacity } from "react-native";
import colors from "../../constants/colors";
import { BookMark, Profile } from "../../icons";

const Header = ({
  onBookMarkPress,
}: {
  onBookMarkPress: (isActive: boolean) => void;
}) => {
  const [isBookMarkActive, setIsBookMarkActive] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Beverages</Text>
      <View>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() => {
              setIsBookMarkActive(!isBookMarkActive);
              onBookMarkPress(!isBookMarkActive);
            }}
            style={{ marginRight: 8 }}
          >
            <BookMark fill={isBookMarkActive ? colors.white : "none"} />
          </TouchableOpacity>
          <Profile />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    height: 64,
    paddingHorizontal: 24,
    backgroundColor: colors.lightGreen,
    zIndex: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: colors.white,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Header;
