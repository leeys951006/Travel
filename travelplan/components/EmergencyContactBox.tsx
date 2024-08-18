// components/EmergencyContactBox.tsx
'use client';

import { useState } from 'react';

export default function EmergencyContactBox({ onDelete }: { onDelete: () => void }) {
  const [rows, setRows] = useState([{ name: '', contact1: '', contact2: '' }]);

  const addRow = () => {
    setRows([...rows, { name: '', contact1: '', contact2: '' }]);
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
    <div className="emergency-contact-form">
      <h3>비상연락처</h3>
      <table className="emergency-contact-table">
        <thead>
          <tr>
            <th>이름</th>
            <th>비상연락처1</th>
            <th>비상연락처2</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td><input type="text" value={row.name} onChange={(e) => handleInputChange(index, 'name', e.target.value)} placeholder="이름을 입력하세요" /></td>
              <td><input type="text" value={row.contact1} onChange={(e) => handleInputChange(index, 'contact1', e.target.value)} placeholder="비상연락처1을 입력하세요" /></td>
              <td className="contact-cell">
                <input type="text" value={row.contact2} onChange={(e) => handleInputChange(index, 'contact2', e.target.value)} placeholder="비상연락처2을 입력하세요" />
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
