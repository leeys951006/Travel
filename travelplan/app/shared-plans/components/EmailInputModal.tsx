// components/EmailInputModal.tsx
'use client';

import { useState } from 'react'; // useState를 React로부터 임포트

export default function EmailInputModal({ isOpen, onClose, onAddEmail }: { isOpen: boolean; onClose: () => void; onAddEmail: (email: string) => void }) {
  const [email, setEmail] = useState('');

  const handleAdd = () => {
    if (email) {
      onAddEmail(email);
      setEmail(''); // 이메일 추가 후 input 초기화
      onClose();    // 모달 닫기
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="email-modal-content">
        <h3>이메일 추가</h3>
        <input
          className="email-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일을 입력하세요"
        />
        <div className="modal-buttons">
          <button className="modal-button email-add-button" onClick={handleAdd}>확인</button>
          <button className="modal-button invite-email-button" onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
}
