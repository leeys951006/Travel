'use client';

import { useState } from 'react';
import CustomColumnModal from './CustomColumnModal';

export default function MiscellaneousBox({ onDelete }: { onDelete: () => void }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [columns, setColumns] = useState<string[]>([]);
  const [rows, setRows] = useState<string[][]>([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddColumn = (column: string) => {
    setColumns([...columns, column]);
    setRows(rows.map(row => [...row, '']));
    closeModal();
  };

  const deleteColumn = (colIndex: number) => {
    setColumns(columns.filter((_, index) => index !== colIndex));
    setRows(rows.map(row => row.filter((_, index) => index !== colIndex)));
  };

  const addRow = () => {
    setRows([...rows, Array(columns.length).fill('')]);
  };

  const deleteRow = (rowIndex: number) => {
    setRows(rows.filter((_, index) => index !== rowIndex));
  };

  const handleRowInputChange = (rowIndex: number, colIndex: number, value: string) => {
    const newRows = [...rows];
    newRows[rowIndex][colIndex] = value;
    setRows(newRows);
  };

  return (
    <div className="miscellaneous-box">
      <h3>기타 항목</h3>
      <table className="miscellaneous-table">
        <thead>
          <tr>
            {columns.map((col, colIndex) => (
              <th key={colIndex}>
                {col}
                <button className="delete-column-button" onClick={() => deleteColumn(colIndex)}>✖︎</button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="text"
                    value={cell}
                    onChange={(e) => handleRowInputChange(rowIndex, colIndex, e.target.value)}
                    placeholder="내용을 입력하세요"
                  />
                  {/* 조건부로 마지막 열에만 x 버튼 표시 */}
                  {colIndex === columns.length - 1 && (
                    <button className="delete-row-button" onClick={() => deleteRow(rowIndex)}>✖︎</button>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="form-actions">
        <button className="add-column-button1" onClick={openModal}>열 추가 +</button>
        <button className="add-row-button1" onClick={addRow}>행 추가 +</button>
        <button className="delete-form-button" onClick={onDelete}>✖︎</button>
      </div>
      {isModalOpen && (
        <CustomColumnModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onAddColumn={handleAddColumn}
        />
      )}
    </div>
  );
}
