import React, { useEffect, useState } from "react";
import { useRouter } from "../hooks/useRouter";
import { AdminRole, User } from "../types/user";
import jwtDecode from "jwt-decode";

interface GeneralLayoutProps {
  children: React.ReactNode;
  isAdminPage?: boolean;
}

const AuthComponents: React.FC<GeneralLayoutProps> = ({
  children,
  isAdminPage,
}) => {
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const { routeTo } = useRouter();

  const fetchUserProfile = () => {
    const 로그인여부 = "쿠키 존재 여부나 백엔드에 로그인 확인 요청";

    const token =
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtZW1iZXJUb2tlbiIsImlkeCI6NDgsImVtYWlsIjoidGVzdDIyIiwibmlja25hbWUiOiJ0ZXN0IiwicGhvbmVfbnVtYmVyIjoiMTIzMTIzNDEiLCJhZGRyZXNzIjoi44WB44S044WHIiwibWVtYmVyX2ltZyI6ImFzZCIsImNyZWF0ZWRfYXQiOiIyMDIzLTA4LTIzIDE0OjU5OjM4IiwidXBkYXRlZF9hdCI6IjIwMjMtMDgtMjMgMTQ6NTk6MzgiLCJ1c2VyX3BvaW50IjowLCJpYXQiOjE2OTI4MDI4MDUsImV4cCI6MTY5MjgwNjQwNX0.5GS8PlfL5dGPSYy7lBCPYlhsIoqi3kcmsokScymZfRc";

    const decoded = jwtDecode(token.split(" ")[1]);

    if (로그인여부 === null) {
      // 쿠키가 없거나 로그인 확인 요청 했을때 아니면
      routeTo("/login");
      return;
    }

    setUserProfile(null); // 로그인해서 올바른 토큰을 받아 왔거나 올바른 유저 정보를 서버에서 가져왔으면 상태 갱신 나중에 전역상태로 바꿔줘야함
  };

  useEffect(() => {
    fetchUserProfile();
  }, [children]);

  //응답으로 받은 user의 userInfo.roles가 비어있다면 아무 권한이 없는 user이므로 로그인 페이지로 이동
  if (userProfile?.userInfo.roles.length === 0) {
    routeTo("/login");
    return <></>;
  }
  //Admin 전용 페이지 접근 시도시 userProfile.userInfo.roles에 admin이 없는 경우에는 다른 페이지로 이동
  if (isAdminPage && !userProfile?.userInfo.roles.includes(AdminRole)) {
    routeTo("/home");
    return <></>;
  }

  if (userProfile === null) return <div>loading...</div>;

  return (
    <div>
      {/* 전역상태를 이용해 userProfile props 대체 및 삭제 */}
      {/* <UserInfo userProfile={userProfile} /> 사용자의 정보가 필요한 컴포넌트  */}
      <div>{children}</div>
    </div>
  );
};

export default AuthComponents;
