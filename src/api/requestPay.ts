import { RequestPayParams } from "iamport-typings";
import axiosClient from "./axios";

const currentTime = Date.now();

const requestPay = (point: number) => {
  window.IMP?.init("imp28437666");

  const params: RequestPayParams = {
    // param
    pg: `kcp.${"A52CY"}`,
    pay_method: "card",
    merchant_uid: `roupang_${currentTime}`,
    name: `포인트 ${point} 구매`,
    amount: 100, // <----- 이게 지금 결제금액 이건 pg사에 보내는 거라 다빈님 서버랑 아무 상관이 없다
    buyer_email: "gildong@gmail.com",
    buyer_name: "홍길동",
    buyer_tel: "010-4242-4242",
    buyer_addr: "서울특별시 강남구 신사동",
    buyer_postcode: "01181",
  };
  window.IMP?.request_pay(params, (rsp) => {
    if (rsp.success) {
      axiosClient
        .post("/point/charge", {
          충전포인트: point, // <---- 이게 지금 다빈님 서버에 보내는거 이거 포인트
          "결제 금액": ~~(point * 0.1), // <----- 결제금액 다빈님 서버에 보내는 결제금액
          "결제수단 번호": 1, // <--- 결제 방법
        })
        .then((res) => {
          console.log(res);
        });
    } else {
      console.log(rsp);
      console.log("실패");
    }
  });
};

export default requestPay;
