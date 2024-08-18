// components/LuggageBox.tsx
'use client';

import { useState } from 'react';

export default function LuggageBox({ onDelete }: { onDelete: () => void }) {
  const [rows, setRows] = useState([{ name: '', quantity: '' }]);

  const addRow = () => {
    setRows([...rows, { name: '', quantity: '' }]);
  };

  const handleInputChange = (index: number, field: string, value: string) => {
    const newRows = [...rows];
    newRows[index] = { ...newRows[index], [field]: value };
    setRows(newRows);
  };

  const deleteRow = (index: number) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  return (
    <div className="luggage-form">
      <h3>짐 정보</h3>
      <table className="luggage-table">
        <thead>
          <tr>
            <th>이름</th>
            <th>수량</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td><input type="text" value={row.name} onChange={(e) => handleInputChange(index, 'name', e.target.value)} placeholder="짐 이름을 입력하세요" /></td>
              <td className="quantity-cell">
                <input type="text" value={row.quantity} onChange={(e) => handleInputChange(index, 'quantity', e.target.value)} placeholder="수량을 입력하세요" />
                <button className="Trdelete-row-button" onClick={() => deleteRow(index)}>×</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="form-actions">
        <button className="add-row-button" onClick={addRow}>+</button>
        <button className="delete-form-button" onClick={onDelete}>×</button>
      </div>
    </div>
  );
}
