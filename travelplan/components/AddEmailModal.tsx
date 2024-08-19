'use client';

import { useState } from 'react';

interface AddEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (email: string) => void;
}

export default function AddEmailModal({ isOpen, onClose, onAdd }: AddEmailModalProps) {
  const [newEmail, setNewEmail] = useState('');

  const handleAddEmail = () => {
    if (newEmail) {
      onAdd(newEmail);
      setNewEmail(''); // 이메일 입력 필드 초기화
      onClose(); // 모달 닫기
    }
  };

  if (!isOpen) return null; // 모달이 열리지 않았으면 null 반환

  return (
    <div className="modal1">
      <div className="modal-content1">
        <button onClick={onClose} className="close-button">✖︎</button>
        <h2>이메일 추가</h2>
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          placeholder="이메일 입력"
          className="email-input"
        />
        <button onClick={handleAddEmail} className="add-button1">등록</button>
      </div>
    </div>
  );
}
