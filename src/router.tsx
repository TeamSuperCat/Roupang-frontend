import { createBrowserRouter } from "react-router-dom";
import { Router as RemixRouter } from "@remix-run/router/dist/router";
import { Home } from "./pages/Home";
import AuthComponents from "./Auth/AuthComponents";

interface RouterBase {
  id: number; // 페이지 아이디 (반복문용 고유값)
  path: string; // 페이지 경로
  label: string; // 사이드바에 표시할 페이지 이름
  element: React.ReactNode; // 페이지 엘리먼트
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
    label: "Home",
    element: <Home />,
    withAuth: false,
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

export const routers: RemixRouter = createBrowserRouter(
  // 어드민 전용 페이지이거나 auth가 필요한 페이지는 AuthComponent으로 감싸기
  // 어드민 권한이 필요한 페이지는 isAdminPage 속성에 true 부여
  routerData.map((router) => {
    if (router.withAuth) {
      return {
        path: router.path,
        element: <AuthComponents>{router.element}</AuthComponents>,
      };
    } else {
      return {
        path: router.path,
        element: router.element,
      };
    }
  })
);
