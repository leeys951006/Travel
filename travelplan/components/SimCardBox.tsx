// components/SimCardBox.tsx
'use client';

import { useState } from 'react';

export default function SimCardBox({ onDelete }: { onDelete: () => void }) {
  const [rows, setRows] = useState([{ name: '', roamingMethod: '', roamingStatus: 'O' }]);

  const addRow = () => {
    setRows([...rows, { name: '', roamingMethod: '', roamingStatus: 'O' }]);
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
    <div className="sim-card-box">
      <h3>유심 정보</h3>
      <table className="sim-card-table">
        <thead>
          <tr>
            <th>이름</th>
            <th>로밍방법</th>
            <th>로밍 유무</th>
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
                <input
                  type="text"
                  value={row.roamingMethod}
                  onChange={(e) => handleInputChange(index, 'roamingMethod', e.target.value)}
                  placeholder="로밍 방법을 입력하세요"
                />
              </td>
              <td>
                <label htmlFor={`roamingStatus-${index}`} className="visually-hidden">로밍 유무</label>
                <select
                  id={`roamingStatus-${index}`}
                  value={row.roamingStatus}
                  onChange={(e) => handleInputChange(index, 'roamingStatus', e.target.value)}
                >
                  <option value="O">O</option>
                  <option value="X">X</option>
                </select>
                <button className="delete-row-button" onClick={() => deleteRow(index)}>✖︎</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="form-actions">
        <button className="add-row-button" onClick={addRow}>+</button>
        <button className="delete-form-button" onClick={onDelete}>✖︎</button>
      </div>
    </div>
  );
}
