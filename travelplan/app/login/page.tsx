'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = () => {
    // 간단한 테스트 로그인 로직
    if (username === 'admin' && password === '1234') {
      login();  // 로그인 상태 업데이트
      router.push('/');  // 로그인 성공 시 메인 페이지로 이동
    } else {
      alert('아이디 또는 비밀번호가 잘못되었습니다.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', width: '320px', textAlign: 'center', backgroundColor: '#fff' }}>
        <h1 style={{ marginBottom: '20px' }}>로그인</h1>
        <input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            padding: '10px',
            marginBottom: '10px',
            width: '100%',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '1rem',
            boxSizing: 'border-box',
            backgroundColor: '#f9f9f9',
          }}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: '10px',
            marginBottom: '20px',
            width: '100%',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '1rem',
            boxSizing: 'border-box',
            backgroundColor: '#f9f9f9',
          }}
        />
        <button
          onClick={handleLogin}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          로그인
        </button>
      </div>
    </div>
  );
}
