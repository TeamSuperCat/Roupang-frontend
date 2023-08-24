declare module "react-responsive-carousel";

declare interface ItemData {
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
  id?: any;
}

declare global {
  interface Window {
    daum?: any;
    IMP: Iamport;
  }
}

declare interface CartItem {
  amount: number;
  categoryName: string;
  createdAt: string;
  description: string;
  id: number;
  memberId: number;
  optionDetail: string;
  price: number;
  productIdx: number;
  productImg: string;
  productName: string;
  productStock: number;
  sellerIdx: number;
}

export {};
