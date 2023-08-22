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
  const [isCooltime, setIsCooltime] = useState(false);

  const loadMoreRef = useRef<HTMLDivElement>(null);

  const fetchItems = async ({ pageParam = 0 }) => {
    try {
      const response = await axiosClient.get(
        `/products/category/${catetype}?page=${pageParam}&size=8&order=${sorttype}`
      );
      return response.data;
    } catch (error) {
      console.error("실패했다요", error);
      throw error;
    }
  };

  useEffect(() => {
    queryClient.removeQueries(["infiniteData"]);
  }, [catetype, sorttype]);

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["infiniteData"],
      queryFn: fetchItems,
      getNextPageParam: (lastPage) => {
        return lastPage.last ? undefined : lastPage.number + 1;
      },
    });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasNextPage && !isCooltime) {
          setIsCooltime(true);
          fetchNextPage();
          setTimeout(() => {
            setIsCooltime(false);
          }, 1500);
        }
      },
      { threshold: 0 }
    );

    const ref = loadMoreRef.current;
    if (ref) {
      observer.observe(ref);
    }
  }, [hasNextPage, fetchNextPage]);

  const allData = data?.pages?.map((page) => page.content).flat() || [];
  const displayData = allData.length > 12 ? allData : items;

  console.log(allData.length);

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
