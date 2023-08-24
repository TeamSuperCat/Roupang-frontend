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

  //인피니티쿼리의 2번째 인자인 쿼리함수에 사용되는 함수입니다.
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

  //useEffect를 통해서 의존성배열의 값이 바뀌거나 처음에 진입하면 인피니티쿼리의 캐싱된 값을 초기화해줍니다.
  //이 작업을 하는 이유는 검색어가 유효하지 않은 상황에도 불구하고 검색이된것처럼 이 전의 값들이 남아서 로드되기에 사용자의 혼란을 막아주기 위해서입니다.
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

  //리액트 쿼리의 인피니티쿼리입니다 무한스크롤을 위해 사용하였습니다.
  //현재 fetchItems에서 처음에 0페이지와 1페이지가 호출되기에 pageParam을 0에서 바로 2가 되게 해주었습니다.
  //페이지를 호출할때마다 받는 last 값이 true면 undefined를 줘서 인피니티쿼리의 동작을 멈추고, false라면 pageParam이 1씩 늘어납니다.
  //맨 처음에 한번 실행되고, 이후로는 인터섹션옵저버가 감지할때마다 실행됩니다.
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

  //무한스크롤에서 스크롤의 끝을 감지하기 위해 만들었습니다.
  //사용자 입장에서는 마지막 아이템이 보일떄쯤에 감지되도록 설정하였습니다.
  //옵저버가 감지하면 인피니티쿼리의 fetchNextPage를 실행시킵니다.
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

  //인피니티쿼리의 값들이 배열안의 배열로 쌓이는 형태라서 한개의 배열로 풀어주는 작업입니다.
  useEffect(() => {
    const newData = data?.pages?.map((page) => page.content).flat() || [];
    setAllData(newData);
  }, [data]);

  //main페이지의 처음불러오는 아이템 리스트는 리덕스통신을 통해 아이템을 12개만큼 불러옵니다.
  //인피니티쿼리를 통해 그 이상수량이 넘어갈경우 main페이지의 아이템 리스트를 인피니티쿼리의 캐싱데이터로 교체해줍니다.
  const displayData = allData.length > 12 ? allData : items;

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
