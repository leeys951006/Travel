'use client';

import { useState } from 'react';

export default function VisaBox({ onDelete }: { onDelete: () => void }) {
  const [rows, setRows] = useState([{ name: '', visaRequired: 'O' }]);

  const addRow = () => {
    setRows([...rows, { name: '', visaRequired: 'O' }]);
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
    <div className="visa-box">
      <h3>비자 정보</h3>
      <table className="visa-table">
        <thead>
          <tr>
            <th>이름</th>
            <th>비자 유무</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={row.name}
                  onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                  placeholder="이름을 입력하세요"
                />
              </td>
              <td>
                <select
                  aria-label="비자 유무 선택" 
                  value={row.visaRequired}
                  onChange={(e) => handleInputChange(index, 'visaRequired', e.target.value)}
                >
                  <option value="O">O</option>
                  <option value="X">X</option>
                </select>
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
