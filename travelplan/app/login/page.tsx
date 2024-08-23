'use client';

import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const handleSignIn = (provider: string) => {
    signIn(provider, { callbackUrl: '/' });  // 로그인 성공 시 메인 페이지로 리다이렉트
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', width: '320px', textAlign: 'center', backgroundColor: '#fff' }}>
        <h1 style={{ marginBottom: '20px' }}>로그인</h1>
        <button
          onClick={() => handleSignIn('naver')}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#03C75A',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem',
            marginBottom: '10px',
          }}
        >
          네이버 로그인
        </button>
        <button
          onClick={() => handleSignIn('kakao')}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#F7E600',
            color: '#000',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem',
            marginBottom: '10px',
          }}
        >
          카카오 로그인
        </button>
        <button
          onClick={() => handleSignIn('google')}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#4285F4',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          구글 로그인
        </button>
      </div>
    </div>
  );
}
