import axios from "axios";

const url = "https://kapi.kakao.com/v1/payment/ready";
const adminKey = import.meta.env.VITE_REACT_APP_KAKAOPAYMENT_ADMINKEY;
const kakaoPaymentfunction = (
  name?: string,
  quantity?: number,
  price?: number
) => {
  axios({
    url: url,
    method: "POST",
    headers: {
      Authorization: `KakaoAK ${adminKey}`,
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    data: {
      cid: "TC0ONETIME",
      partner_order_id: "partner_order_id",
      partner_user_id: "partner_user_id",
      item_name: name,
      quantity: quantity,
      total_amount: price,
      tax_free_amount: 0,
      approval_url: "http://localhost:5173",
      cancel_url: "http://localhost:5173",
      fail_url: "http://localhost:5173",
    },
  })
    .then(function (response) {
      console.log(response);
      window.location.href = response.data.next_redirect_pc_url;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export default kakaoPaymentfunction;
