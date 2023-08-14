import React, { useEffect, useState } from "react";
import { useRouter } from "../hooks/useRouter";
import { AdminRole, User } from "../types/user";

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

    if (로그인여부 === null) {
      // 쿠키가 없거나 로그인 확인 요청 했을때 아니면
      routeTo("/login");
      return;
    }

    setUserProfile(null); // 로그인여부
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
