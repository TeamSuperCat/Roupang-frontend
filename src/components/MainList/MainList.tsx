import ProductCard from "../Home/ProductCard";
import { useAppSelector } from "../../hooks/useDispatch";
import Loading from "../Loading/Loading";
import { useRef, useEffect, useState } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../../api/axios";
import ItemLoading from "../Loading/ItemLoading";
import { ListWrapper } from "./stMainList";

const MainList = () => {
  const queryClient = useQueryClient();
  const items = useAppSelector((state) => state.item.items);
  const LoadingData = useAppSelector((state) => state.item.isLoading);
  const catetype = useAppSelector((state) => state.item.categorynum);
  const sorttype = useAppSelector((state) => state.item.catesort);
  const itemCount = useAppSelector((state) => state.item.Totalitems);
  const searchkey = useAppSelector((state) => state.item.keyword);
  const queryreset = useAppSelector((state) => state.item.queryreset);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [allData, setAllData] = useState<ItemData[]>([]);

  const fetchItems = async ({ pageParam = 0 }) => {
    let url;
    let responsePage1Url;
    if (searchkey) {
      url = `/products/search?keyword=${searchkey}&page=${pageParam}&size=8&order=${sorttype}`;
      responsePage1Url = `/products/search?keyword=${searchkey}&page=1&size=8&order=${sorttype}`;
    } else {
      url = `/products/category/${catetype}?page=${pageParam}&size=8&order=${sorttype}`;
      responsePage1Url = `/products/category/${catetype}?page=1&size=8&order=${sorttype}`;
    }

    try {
      const response = await axiosClient.get(url);

      if (pageParam === 0 && !response.data.last) {
        const responsePage1 = await axiosClient.get(responsePage1Url);
        const combinedData = [
          ...response.data.content,
          ...responsePage1.data.content,
        ];
        return {
          ...response.data,
          content: combinedData,
        };
      }
      return response.data;
    } catch (error) {
      console.error("실패했다요", error);
      throw error;
    }
  };

  useEffect(() => {
    queryClient.removeQueries(["infiniteData"]);
    queryClient.invalidateQueries(["infiniteData"]);
    setAllData([]);
    if (queryreset) {
      setShouldFetch(false);
    } else {
      setShouldFetch(true);
    }
  }, [catetype, sorttype, searchkey, queryreset]);

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["infiniteData"],
      queryFn: fetchItems,
      enabled: shouldFetch,
      getNextPageParam: (lastPage, allPages) => {
        if (allPages.length === 1 && lastPage.number === 0) {
          return 2;
        }
        return lastPage.last ? undefined : lastPage.number + 1;
      },
      staleTime: 1000 * 60 * 10,
      cacheTime: 1000 * 60 * 60,
    });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (
          first.isIntersecting &&
          hasNextPage &&
          !isFetchingNextPage &&
          itemCount !== allData.length
        ) {
          fetchNextPage();
        }
      },
      { threshold: 0.25 }
    );

    const ref = loadMoreRef.current;
    if (ref) {
      observer.observe(ref);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, fetchNextPage, sorttype]);

  useEffect(() => {
    const newData = data?.pages?.map((page) => page.content).flat() || [];
    setAllData(newData);
  }, [data]);

  const displayData = allData.length > 12 ? allData : items;

  console.log(allData, "데이따");
  console.log(items);
  return (
    <>
      {LoadingData ? (
        <Loading />
      ) : (
        <>
          <ListWrapper>
            {displayData.map((item, i) => (
              <ProductCard key={i} item={item} />
            ))}
            <div className="observer" ref={loadMoreRef}></div>
          </ListWrapper>
          {isFetchingNextPage && <ItemLoading />}
        </>
      )}
    </>
  );
};

export default MainList;
