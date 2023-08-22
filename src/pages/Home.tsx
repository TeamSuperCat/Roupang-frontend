import CategoryCarousel from "../components/Home/CategoryCarousel";
import MainCarousel from "../components/main/MainCarousel";
import { useAppDispatch, useAppSelector } from "../hooks/useDispatch";
import { useEffect } from "react";
import { getAllCategorys } from "../slice/mainSlice";
import Loading from "../components/Loading/Loading";

interface ItemData {
  category_name: string;
  description: string;
  description_img: string;
  options: string | null;
  price: number;
  product_idx: number;
  product_img: string;
  product_name: string;
  sales_end_date: string;
  stock: number;
}

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
          {AllCategory.filter((category) => category.length > 0).map((category, index) => (
            <CategoryCarousel key={index} data={category} />
          ))}
        </>
      )}
    </>
  );
};

export default Home;
