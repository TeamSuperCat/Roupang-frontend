import CategoryCarousel from "../components/Home/CategoryCarousel";
import MainCarousel from "../components/main/MainCarousel";
import { useAppDispatch, useAppSelector } from "../hooks/useDispatch";
import { useEffect } from "react";
import { getAllCategorys } from "../slice/mainSlice";
import Loading from "../components/Loading/Loading";

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllCategorys());
  }, []);

  const AllCategory: ItemData[][] = useAppSelector((state) => state.main.items);
  const LoadingData = useAppSelector((state) => state.main.isLoading);

  return (
    <>
      {LoadingData ? (
        <Loading />
      ) : (
        <>
          <MainCarousel />
          {AllCategory.filter((category) => category.length > 0).map(
            (category, index) => (
              <CategoryCarousel
                key={index}
                data={category}
                category={index + 1}
              />
            )
          )}
        </>
      )}
    </>
  );
};

export default Home;
