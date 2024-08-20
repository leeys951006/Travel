'use client';

import { useState } from 'react';

interface CustomColumnModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddColumn: (column: string) => void;
}

export default function CustomColumnModal({ isOpen, onClose, onAddColumn }: CustomColumnModalProps) {
  const [columnName, setColumnName] = useState('');

  const handleSubmit = () => {
    if (columnName.trim()) {
      onAddColumn(columnName.trim());
      setColumnName(''); // 입력 필드 초기화
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2>열 추가</h2>
        <input type="text" value={columnName} onChange={(e) => setColumnName(e.target.value)} placeholder="열 이름을 입력하세요" />
        <button className="add-column-button" onClick={handleSubmit}>
          추가
        </button>
      </div>
    </div>
  );
}
