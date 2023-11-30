import * as React from "react";
import { View, FlatList } from "react-native";
import { Header, BeverageCard } from "../../components";
import styles from "./styles";
import useGetPaginatedData from "../../hooks/useGetPaginatedData";

const ListViewScreen = () => {
  const {
    data,
    onLoadMore,
    hasMorePages,
    onRefresh,
    isRefreshing,
    isLoadingMore,
    isLoading,
  } = useGetPaginatedData();

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        style={styles.scrollView}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        contentContainerStyle={styles.cardsContainer}
        data={data}
        renderItem={({ item }) => (
          <BeverageCard
            name={item.name}
            tagline={item.tagline}
            description={item.description}
            imageUrl={item.imageUrl}
          />
        )}
        onEndReached={() => {
          if (hasMorePages && !isLoadingMore && !isLoading) {
            onLoadMore();
          }
        }}
        onEndReachedThreshold={0.8}
      />
    </View>
  );
};

export default ListViewScreen;
