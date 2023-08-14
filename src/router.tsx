import { createBrowserRouter } from "react-router-dom";
import { Router as RemixRouter } from "@remix-run/router/dist/router";
import Home from "./pages/Home";
import AuthComponents from "./Auth/AuthComponents";
import HeaderLayout from "./layout/HeaderLayout";

interface RouterBase {
  id: number; // 페이지 아이디 (반복문용 고유값)
  path: string; // 페이지 경로
  label: string; // 사이드바에 표시할 페이지 이름
  element: React.ReactNode; // 페이지 엘리먼트
  children?: RouterBase[];
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
        path: "home",
        label: "Home",
        element: <Home />,
      },
    ],
  },
  // {
  //   id: 1,
  //   path: "/",
  //   label: "Home",
  //   element: <Home />,
  //   withAuth: false,
  // },
  // {
  //   id: 1,
  //   path: "/admin",
  //   label: "어드민 페이지",
  //   // element: <AdminPage />,
  //   withAuth: true,
  //   isAdminPage: true,
  // },
];

// export const routers: RemixRouter = createBrowserRouter(
//   // 어드민 전용 페이지이거나 auth가 필요한 페이지는 AuthComponent으로 감싸기
//   // 어드민 권한이 필요한 페이지는 isAdminPage 속성에 true 부여
//   routerData.map((router) => {
//     if (router.withAuth) {
//       return {
//         path: router.path,
//         element: <AuthComponents>{router.element}</AuthComponents>,
//       };
//     } else {
//       return {
//         path: router.path,
//         element: router.element,
//       };
//     }
//   })
// );

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
    const routeElement = router.withAuth ? (
      <AuthComponents>{router.element}</AuthComponents>
    ) : (
      router.element
    );

    const routeObject: RouteObject = {
      path: router.path,
      element: routeElement,
    };

    if (router.children && router.children.length) {
      routeObject.children = transformRoutes(router.children);
    }

    return routeObject;
  });
}

export const routers: RemixRouter = createBrowserRouter(
  transformRoutes(routerData)
);
