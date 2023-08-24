import { ChangeEvent } from "react";
import {
  EmailType,
  PhoneType,
  FormDataType,
  TypeAddress,
  addressState,
  emailState,
  formData,
  phoneState,
  pointState,
  setAddress,
  setEmail,
  setFormData,
  setPhone,
  setPoint,
  setZipCode,
  zipCodeState,
  ProductsType,
  setProducts,
  productsState,
} from "../slice/orderSlice";
import { useAppDispatch, useAppSelector } from "./useDispatch";

const useOrder = () => {
  const zipCode = useAppSelector(zipCodeState);
  const address = useAppSelector(addressState);
  const phone = useAppSelector(phoneState);
  const email = useAppSelector(emailState);
  const form = useAppSelector(formData);
  const point = useAppSelector(pointState);
  const products = useAppSelector(productsState);
  const dispatch = useAppDispatch();

  const handleZipCode = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setZipCode(e.target.value));
  };

  const insertZipcode = (zipcode: string) => {
    dispatch(setZipCode(zipcode));
  };

  const updateAddress = (newAddr: TypeAddress) => {
    dispatch(setAddress({ ...address, ...newAddr }));
  };
  const updatePhone = (newPhone: PhoneType) => {
    dispatch(setPhone({ ...phone, ...newPhone }));
  };
  const updateEmail = (newEmail: EmailType) => {
    dispatch(setEmail({ ...email, ...newEmail }));
  };
  const updateForm = (newForm: FormDataType) => {
    dispatch(setFormData(newForm));
  };
  const updatePoint = (point: number) => {
    dispatch(setPoint(point));
  };

  const handleTo = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFormData({ ...form, To: e.target.value }));
  };

  const updateProducts = (newProducts: ProductsType[]) => {
    dispatch(setProducts(newProducts));
  };

  return {
    zipCodeState: {
      zipCode,
      handleZipCode,
      insertZipcode,
    },
    addressState: {
      address,
      updateAddress,
    },
    phoneState: {
      phone,
      updatePhone,
    },
    emailState: {
      email,
      updateEmail,
    },
    formState: {
      form,
      updateForm,
      handleTo,
    },
    pointState: {
      point,
      updatePoint,
    },
    productsState: {
      products,
      updateProducts,
    },
  };
};

export default useOrder;
