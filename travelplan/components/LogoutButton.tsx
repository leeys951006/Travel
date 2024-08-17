// components/LogoutButton.tsx
import { useRouter } from 'next/router';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem('auth'); // 세션에서 로그인 상태 제거
    router.push('/auth/login'); // 로그아웃 후 로그인 페이지로 리다이렉트
  };

  return (
    <button onClick={handleLogout}>로그아웃</button>
  );
}
