import { RequestPayParams, RequestPayResponse } from "iamport-typings";

const currentTime = Date.now();

const requestPay = () => {
  window.IMP?.init("imp28437666");

  const params: RequestPayParams = {
    // param
    pg: `html5_inicis.${"INIBillTst"}`,
    pay_method: "card",
    merchant_uid: `roupang ${currentTime}`,
    name: "루팡 테스트",
    amount: 100,
    buyer_email: "gildong@gmail.com",
    buyer_name: "홍길동",
    buyer_tel: "010-4242-4242",
    buyer_addr: "서울특별시 강남구 신사동",
    buyer_postcode: "01181",
  };
  window.IMP?.request_pay(params, handleResponse);
};

const handleResponse = (res: RequestPayResponse) => {
  const { imp_uid, merchant_uid } = res;
  console.log(imp_uid, merchant_uid);
};

export default requestPay;
