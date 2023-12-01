import React, { useCallback, useEffect, useRef, useState } from "react";
import { DataI } from "../constants/interface";

//this should be in .env file, keeping it here for demo purpose
const url = (page: number) =>
  `https://api.punkapi.com/v2/beers?page=${page}&per_page=10`;

const useGetPaginatedData = () => {
  const pageNumber = useRef(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const hasMorePages = useRef(true);
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchData(false);
  }, []);

  const fetchData = async (isPaginationCall: boolean) => {
    const response = await fetch(url(pageNumber.current));

    if (response.ok) {
      const data = await response.json();
      const modifiedData = data.map((item: any) => ({
        id: item.id,
        name: item.name,
        tagline: item.tagline,
        description: item.description,
        imageUrl: item.image_url,
      }));
      handleSetData(modifiedData, isPaginationCall);
    } else {
      setIsError(true);
      setIsLoadingMore(false);
      setIsRefreshing(false);
    }
  };

  const handleSetData = (
    fetchedData: Array<DataI>,
    isPaginationCall: boolean
  ) => {
    if (fetchedData?.length == 0) {
      hasMorePages.current = false;
      return;
    }

    if (isPaginationCall) {
      setData([...data, ...fetchedData]);
    } else {
      setData(fetchedData);
    }

    setIsLoadingMore(false);
    setIsRefreshing(false);
    setIsError(false);
  };

  const onLoadMore = async () => {
    setIsLoadingMore(true);
    pageNumber.current += 1;
    await fetchData(true);
  };

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    setIsLoadingMore(false);
    pageNumber.current = 1;
    fetchData(false);
  }, []);

  return {
    data,
    isLoadingMore,
    isRefreshing,
    isError,
    hasMorePages: hasMorePages.current,
    onLoadMore,
    onRefresh,
  };
};

export default useGetPaginatedData;
