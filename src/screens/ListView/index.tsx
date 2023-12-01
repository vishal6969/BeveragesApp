import React, { useState } from "react";
import { View, FlatList, ActivityIndicator, Text } from "react-native";
import { Header, BeverageCard, EmptyListScreen } from "../../components";
import styles from "./styles";
import useGetPaginatedData from "../../hooks/useGetPaginatedData";
import useGetBookMarkCards from "../../hooks/useGetBookMarkCards";
import colors from "../../constants/colors";

const ListViewScreen = () => {
  const [isBookMarkActive, setIsBookMarkActive] = useState(false);
  const {
    data,
    onLoadMore,
    hasMorePages,
    onRefresh,
    isRefreshing,
    isLoadingMore,
  } = useGetPaginatedData();
  const { data: bookMarkedData, saveCard, removeCard } = useGetBookMarkCards();
  const shouldLoadMore = hasMorePages && !isLoadingMore && !isBookMarkActive;

  const handleBookMarkPress = (isActive: boolean) => {
    setIsBookMarkActive(isActive);
  };

  return (
    <View style={styles.container}>
      <Header onBookMarkPress={handleBookMarkPress} />
      {data.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={colors.lightGreen} size={100} />
        </View>
      ) : null}
      {data.length > 0 ? (
        <FlatList
          style={styles.scrollView}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          contentContainerStyle={styles.cardsContainer}
          data={isBookMarkActive ? bookMarkedData : data}
          renderItem={({ item }) => (
            <BeverageCard
              name={item.name}
              tagline={item.tagline}
              description={item.description}
              imageUrl={item.imageUrl}
              id={item.id}
              saveCard={saveCard}
              removeCard={removeCard}
              isBookMarked={bookMarkedData.some((data) => data.id === item.id)}
            />
          )}
          onEndReached={() => {
            if (shouldLoadMore) {
              onLoadMore();
            }
          }}
          onEndReachedThreshold={0.8}
          ListFooterComponent={
            isLoadingMore ? (
              <ActivityIndicator
                style={{ marginBottom: 24 }}
                size={60}
                color={colors.lightGreen}
              />
            ) : null
          }
        />
      ) : null}
      {isBookMarkActive && !bookMarkedData?.length && <EmptyListScreen />}
    </View>
  );
};

export default ListViewScreen;
