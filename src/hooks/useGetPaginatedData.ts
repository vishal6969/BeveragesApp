import React, { useCallback, useEffect, useState } from "react";

//this should be in .env file, keeping it here for demo purpose
const url = (page: number) =>
  `https://api.punkapi.com/v2/beers?page=${page}&per_page=10`;

interface DataI {
  id: number;
  name: string;
  tagline: string;
  description: string;
}

const useGetPaginatedData = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasMorePages, setHasMorePages] = useState(true);
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchData(false);
  }, []);

  const fetchData = useCallback(
    async (isPaginationCall: boolean) => {
      const response = await fetch(url(pageNumber));

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
        setIsLoading(false);
        setIsLoadingMore(false);
        setIsRefreshing(false);
      }
    },
    [pageNumber]
  );

  const handleSetData = useCallback(
    (fetchedData: Array<DataI>, isPaginationCall: boolean) => {
      if (fetchedData?.length == 0) {
        setHasMorePages(false);
        return;
      }

      if (isPaginationCall) {
        setData([...data, ...fetchedData]);
      } else {
        setData(fetchedData);
      }

      setIsLoading(false);
      setIsLoadingMore(false);
      setIsRefreshing(false);
      setIsError(false);
      setPageNumber((prev) => prev + 1);
    },
    [data]
  );

  const onLoadMore = () => {
    setIsLoadingMore(true);
    fetchData(true);
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    setIsLoadingMore(false);
    setData([]);
    setPageNumber(1);
  };

  return {
    data,
    isLoading,
    isLoadingMore,
    isRefreshing,
    isError,
    hasMorePages,
    onLoadMore,
    onRefresh,
  };
};

export default useGetPaginatedData;
