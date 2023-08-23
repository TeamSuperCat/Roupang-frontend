import axios, { AxiosInstance } from "axios";

const BASE_URL = `${import.meta.env.VITE_API_SERVER}`;
const token: string | null = localStorage.getItem("accessToken");
// const token: string | null = localStorage.getItem("token");

// if (token) {
//   axios.defaults.headers.common["Authorization"] = `${token}`;
// }

const axiosClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosClient.interceptors.response.use((response) => {
  if (response.headers["authorization"]) {
    const accessToken = response.headers["authorization"];
    localStorage.setItem("accessToken", accessToken);
  }
  return response.data;
});

axiosClient.interceptors.request.use((config) => {
  if (config.url === "https://api.cloudinary.com/v1_1/ji/image/upload") {
    delete config.headers["Authorization"];
  } else {
    config.headers["Content-Type"] = "application/json; charset=utf-8";
    if (token) {
      config.headers["Authorization"] = `${token}`;
    }
  }
  return config;
});
// axiosClient.interceptors.request.use((config) => {
//   config.headers["Content-Type"] = "application/json; charset=utf-8";
//   if (token) {
//     config.headers["Authorization"] = `${token}`;
//   }
//   return config;
// });

// 사용할 컴포넌트에서 import axiosClient from './axiosClient' 해서
// axiosClient.메소드('경로') 해서 사용 baseURL 은 이미 설정되어 있으므로 URI 만 붙여서 사용해야함

// interface Data {
//   기타 필요한 필드 추가
//   ex) 밑의 키 밸류는 예시임 필요한 데이터 정의해서 사용하면 됨
//   id: number;
//   name: string;
// }

// const [data, setData] = useState<Data | null>(null);

// const response = await axiosClient.get<Data>('/data');

// 이런식으로 사용 !!@!@!@!@!

export default axiosClient;
