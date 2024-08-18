// components/AllergyBox.tsx
'use client';

import { useState } from 'react';

export default function AllergyBox({ onDelete }: { onDelete: () => void }) {
  const [rows, setRows] = useState([{ name: '', caution: '' }]);

  const addRow = () => {
    setRows([...rows, { name: '', caution: '' }]);
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
    <div className="allergy-box">
      <h3>알레르기 정보</h3>
      <table className="allergy-table">
        <thead>
          <tr>
            <th>이름</th>
            <th>조심해야 하는 것</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td><input type="text" value={row.name} onChange={(e) => handleInputChange(index, 'name', e.target.value)} placeholder="이름을 입력하세요" /></td>
              <td className="caution-cell">
                <input type="text" value={row.caution} onChange={(e) => handleInputChange(index, 'caution', e.target.value)} placeholder="조심해야 하는 것을 입력하세요" />
                <button className="delete-row-button" onClick={() => deleteRow(index)}>×</button>
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
