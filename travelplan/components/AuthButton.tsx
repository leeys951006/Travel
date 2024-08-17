// components/AuthButton.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '../app/context/AuthContext';

export default function AuthButton() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();

  const handleSignIn = () => {
    router.push('/login');
  };

  const handleSignOut = () => {
    logout();
    router.push('/');  // 로그아웃 후 메인 페이지로 이동
  };

  return isAuthenticated ? (
    <button onClick={handleSignOut} className="auth-button">
      로그아웃
    </button>
  ) : (
    <button onClick={handleSignIn} className="auth-button">
      로그인
    </button>
  );
}
