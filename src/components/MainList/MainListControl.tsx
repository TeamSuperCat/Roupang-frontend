import { useAppDispatch, useAppSelector } from "../../hooks/useDispatch";
import { getCateItems, getSortType } from "../../slice/ItemSlice";
import { useState, useEffect } from "react";
import { ControlWrapper } from "./stMainListControl";

const MainListControl = () => {
  const itemCount = useAppSelector((state) => state.item.Totalitems);
  const categoryId = useAppSelector((state) => state.item.categorynum);
  const filtersort = useAppSelector((state) => state.item.catesort);
  const dispatch = useAppDispatch();

  const [isfilterType, setIsfilterTpye] = useState("");

  useEffect(() => {
    setIsfilterTpye(filtersort);
  }, [filtersort]);

  const handleGetCateItems = (category: string) => {
    dispatch(getCateItems({ categoryId, category }));
    dispatch(getSortType(category));
    setIsfilterTpye(category);
  };

  return (
    <ControlWrapper $isfilterType={isfilterType}>
      <div className="item_quantity_info">
        <img src="/img/item.svg" alt="item" />
        <div>
          총 <span>{itemCount}</span> 개의 상품이 있습니다.
        </div>
      </div>
      <div>
        <ul className="item_selected_list">
          <li onClick={() => handleGetCateItems("")}>최신순</li>
          <li onClick={() => handleGetCateItems("priceDesc")}>높은가격</li>
          <li onClick={() => handleGetCateItems("priceAsc")}>낮은가격</li>
          <li>판매순</li>
        </ul>
      </div>
    </ControlWrapper>
  );
};
export default MainListControl;
