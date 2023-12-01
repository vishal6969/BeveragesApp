import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DataI } from "../constants/interface";
import { AppState } from "react-native";

const useGetBookMarkCards = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getLocalStorageData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("savedItems");
        setData(JSON.parse(storedData) || []);
      } catch (error) {
        console.log(error);
      }
    };
    getLocalStorageData();
  }, []);

  useEffect(() => {
    AppState.addEventListener("change", (state) => {
      if (state != "active") {
        AsyncStorage.setItem("savedItems", JSON.stringify(data));
      }
    });
  }, [data]);

  const saveCard = (cardData: DataI) => {
    setData([...data, cardData]);
  };

  const removeCard = (id: number) => {
    setData(data.filter((item) => item.id != id));
  };

  return { data, saveCard, removeCard };
};

export default useGetBookMarkCards;
