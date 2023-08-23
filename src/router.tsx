import { createBrowserRouter } from "react-router-dom";
import { Router as RemixRouter } from "@remix-run/router/dist/router";
import Home from "./pages/Home";
import AuthComponents from "./Auth/AuthComponents";
import HeaderLayout from "./layout/HeaderLayout";
import Signup from "./pages/Signup";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Test from "./pages/Test";
import Footer from "./components/Footer/Footer";
import Cart from "./pages/Cart";
import Detail from "./pages/Detail";
import Loading from "./components/Loading/Loading";
import Error from "./pages/ErrorPage";
import Order from "./pages/Order";
import SellerEdit from "./pages/SellerEdit";
import Mypage from "./pages/Mypage";

interface RouterBase {
  id: number; // 페이지 아이디 (반복문용 고유값)
  path: string; // 페이지 경로
  label: string; // 사이드바에 표시할 페이지 이름
  element: React.ReactNode; // 페이지 엘리먼트
  children?: RouterElement[]; // 중첩라우팅에서 인증이 필요한 페이지가 있을경우 처리하기 위해서 RouterBase 에서 RouterElement로 바꿨습니다
  errorElement?: React.ReactNode; // 에러 페이지 엘러먼트
}

interface UserAccessibleRouterElement extends RouterBase {
  withAuth?: boolean; // 인증이 필요한 페이지 여부
}

interface AdminAccessibleRouterElement extends RouterBase {
  withAuth: true; // 인증이 필요한 페이지 여부
  isAdminPage?: boolean; // 어드민 페이지 여부
}

type RouterElement = UserAccessibleRouterElement | AdminAccessibleRouterElement;

const routerData: RouterElement[] = [
  {
    id: 0,
    path: "/",
    label: "HeaderLayout",
    element: <HeaderLayout />,
    withAuth: false,
    children: [
      {
        id: 1,
        path: "",
        label: "Home",
        element: <Home />,
      },
      {
        id: 2,
        path: "main",
        label: "Main",
        element: <Main />,
      },
      {
        id: 3,
        path: "login",
        label: "Login",
        element: <Login />,
      },
      {
        id: 5,
        path: "test",
        label: "Test",
        element: <Test />,
      },
      {
        id: 6,
        path: "cart",
        label: "Cart",
        element: <Cart />,
      },
      {
        id: 7,
        path: "detail/:productid",
        label: "Detail",
        element: <Detail />,
      },
      {
        id: 11,
        path: "signup",
        label: "Signup",
        element: <Signup />,
      },
      {
        id: 13,
        path: "selleredit",
        label: "SellerEdit",
        element: <SellerEdit />,
      },
      {
        id: 14,
        path: "mypage",
        label: "Mypage",
        element: <Mypage />,
      },
    ],
  },
  {
    id: 10,
    path: "/order",
    label: "Order",
    element: <Order />,
    withAuth: false,
  },
  {
    id: 8,
    path: "/loading",
    label: "Loading",
    element: <Loading />,
  },
  {
    id: 9,
    path: "/error",
    label: "Footer",
    element: <Error />,
  },
  {
    id: 4,
    path: "/",
    label: "Footer",
    element: <Footer />,
  },

  // {
  //   id: 1,
  //   path: "/admin",
  //   label: "어드민 페이지",
  //   // element: <AdminPage />,
  //   withAuth: true,
  //   isAdminPage: true,
  // },
];

interface RouteObject {
  path: string;
  element: React.ReactNode;
  children?: RouteObject[];
}

//기존 router 코드에는 중첩 라우팅에 대한 처리가 없어서 새로 만들었습니다.
//함수로 분리했으니 혹시 추가하거나 수정할 부분있으면 함수내에서 바로 처리하시면 될 것 같아요.
//router.children가 존재하면 다시 함수를 다시 호출해서 중첩라우팅을 변환합니다. 재귀를 사용했으니 2중3중으로 들어가도 처리가능합니다.
function transformRoutes(routerArray: RouterElement[]): RouteObject[] {
  return routerArray.map((router) => {
    const routeElement = router.withAuth ? <AuthComponents>{router.element}</AuthComponents> : router.element;

    const routeObject: RouteObject = {
      path: router.path,
      element: routeElement,
    };

    if (router.children && router.children.length) {
      routeObject.children = transformRoutes(router.children);

      // children에 withAuth가 있는 경우(인증이 필요한 페이지가 있는경우 처리입니당)
      if (router.children.some((child) => child.withAuth)) {
        routeObject.element = <AuthComponents>{router.element}</AuthComponents>;
      }
    }

    return routeObject;
  });
}

export const routers: RemixRouter = createBrowserRouter(transformRoutes(routerData));
