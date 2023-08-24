import React, { useEffect, useState } from "react";
import { useRouter } from "../hooks/useRouter";
// import { User } from "../types/user";
import jwtDecode from "jwt-decode";
// import Loading from "../components/Loading/Loading";

interface GeneralLayoutProps {
  children: React.ReactNode;
  isAdminPage?: boolean;
}

const AuthComponents: React.FC<GeneralLayoutProps> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<string | null>(null);
  const { routeTo } = useRouter();

  const fetchUserProfile = () => {
    const token: string | null = localStorage.getItem("accessToken");

    let decoded;

    if (token) {
      decoded = jwtDecode(token?.split(" ")[1]);
    }

    console.log(decoded);

    if (token === null) {
      // 쿠키가 없거나 로그인 확인 요청 했을때 아니면
      routeTo("/login");
      return;
    }

    setUserProfile(token); // 로그인해서 올바른 토큰을 받아 왔거나 올바른 유저 정보를 서버에서 가져왔으면 상태 갱신 나중에 전역상태로 바꿔줘야함
  };

  useEffect(() => {
    fetchUserProfile();
  }, [children]);

  //응답으로 받은 user의 userInfo.roles가 비어있다면 아무 권한이 없는 user이므로 로그인 페이지로 이동
  // if (userProfile?.userInfo.roles.length === 0) {
  //   routeTo("/login");
  //   return <></>;
  // }

  //Admin 전용 페이지 접근 시도시 userProfile.userInfo.roles에 admin이 없는 경우에는 다른 페이지로 이동
  // if (isAdminPage && !userProfile?.userInfo.roles.includes(AdminRole)) {
  //   routeTo("/home");
  //   return <></>;
  // }

  // if (userProfile === null) return <Loading />;

  return (
    <div>
      {/* 전역상태를 이용해 userProfile props 대체 및 삭제 */}
      {/* <UserInfo userProfile={userProfile} /> 사용자의 정보가 필요한 컴포넌트  */}
      <div>{children}</div>
    </div>
  );
};

export default AuthComponents;
