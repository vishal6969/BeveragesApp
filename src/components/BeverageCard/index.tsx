import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import { BookMark } from "../../icons";
import colors from "../../constants/colors";
import { DataI } from "../../constants/interface";

interface BeverageCardI {
  id: number;
  name: string;
  tagline: string;
  description: string;
  imageUrl: string;
  isBookMarked: boolean;
  saveCard: (cardData: DataI) => void;
  removeCard: (id: number) => void;
}

const BeverageCard = ({
  id,
  name,
  tagline,
  description,
  imageUrl,
  isBookMarked,
  saveCard,
  removeCard,
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
      <TouchableOpacity
        onPress={() => {
          if (isBookMarked) {
            removeCard(id);
          } else {
            saveCard({ name, tagline, description, id, imageUrl });
          }
        }}
      >
        <BookMark
          stroke={colors.black}
          fill={isBookMarked ? colors.lightGreen : "none"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(BeverageCard);
