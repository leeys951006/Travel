// components/AddEmailModal.tsx
'use client';

import { useState } from 'react';

interface AddEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (email: string) => void;
}

export default function AddEmailModal({ isOpen, onClose, onAdd }: AddEmailModalProps) {
  const [newEmail, setNewEmail] = useState('');

  const handleSubmit = () => {
    if (newEmail) {
      onAdd(newEmail);
      setNewEmail('');
      onClose();  // 등록 후 모달 닫기
    }
  };

  if (!isOpen) return null;  // 모달이 열리지 않았으면 null 반환

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>이메일 추가</h2>
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          placeholder="이메일 입력"
        />
        <button onClick={handleSubmit}>등록</button>
        <button onClick={onClose}>취소</button>
      </div>
    </div>
  );
}
