'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AuthButton() {
  const { data: session } = useSession();  // 현재 세션 정보 가져오기
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');  // 로그인 페이지로 이동
  };

  const handleLogout = () => {
    signOut();  // 로그아웃
  };

  return session ? (
    <button onClick={handleLogout} className="auth-button">
      로그아웃
    </button>
  ) : (
    <button onClick={handleLogin} className="auth-button">
      로그인
    </button>
  );
}
