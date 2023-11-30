import * as React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";
import { BookMark } from "../../icons";
import colors from "../../constants/colors";

interface BeverageCardI {
  name: string;
  tagline: string;
  description: string;
  imageUrl: string;
}

const BeverageCard = ({
  name,
  tagline,
  description,
  imageUrl,
}: BeverageCardI) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUrl }}
        height={140}
        width={60}
        resizeMode="center"
      />
      <View style={styles.detailsContainer}>
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.tagline}>{tagline}</Text>
        </View>
        <View style={styles.description}>
          <Text numberOfLines={3} style={styles.descriptionTxt}>
            {description}
          </Text>
        </View>
      </View>
      <BookMark stroke={colors.black} />
    </View>
  );
};

export default React.memo(BeverageCard);
