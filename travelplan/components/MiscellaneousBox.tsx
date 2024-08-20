'use client';

import { useState } from 'react';
import CustomColumnModal from './CustomColumnModal';

export default function MiscellaneousBox({ onDelete }: { onDelete: () => void }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [columns, setColumns] = useState<string[]>([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddColumn = (column: string) => {
    setColumns([...columns, column]);
    closeModal();
  };

  return (
    <div className="miscellaneous-box">
      <h3>기타 항목</h3>
      <table className="miscellaneous-table">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>{/* 이 부분에 추가적인 행을 추가할 수 있음 */}</tbody>
      </table>
      <div className="form-actions">
        <button className="add-row-button" onClick={openModal}>
          +
        </button>
        <button className="delete-form-button" onClick={onDelete}>
          ×
        </button>
      </div>
      {isModalOpen && <CustomColumnModal isOpen={isModalOpen} onClose={closeModal} onAddColumn={handleAddColumn} />}
    </div>
  );
}
