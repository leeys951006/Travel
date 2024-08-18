// components/LocationForm.tsx
'use client';

import { useState } from 'react';

export default function LocationForm({ onDelete }: { onDelete: () => void }) {
  const [rows, setRows] = useState([{ name: '', address: '', hours: '' }]);

  const addRow = () => {
    setRows([...rows, { name: '', address: '', hours: '' }]);
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
    <div className="location-form">
      <h3>장소 정보</h3>
      <table className="location-table">
        <thead>
          <tr>
            <th>이름</th>
            <th>주소</th>
            <th>운영시간</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td><input type="text" value={row.name} onChange={(e) => handleInputChange(index, 'name', e.target.value)} placeholder="장소 이름을 입력하세요" /></td>
              <td><input type="text" value={row.address} onChange={(e) => handleInputChange(index, 'address', e.target.value)} placeholder="주소를 입력하세요" /></td>
              <td className="hours-cell">
                <input type="text" value={row.hours} onChange={(e) => handleInputChange(index, 'hours', e.target.value)} placeholder="운영시간을 입력하세요" />
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
