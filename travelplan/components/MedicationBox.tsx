'use client';

import { useState } from 'react';

export default function MedicationBox({ onDelete }: { onDelete: () => void }) {
  const [rows, setRows] = useState([{ name: '', effect: '' }]);

  const addRow = () => {
    setRows([...rows, { name: '', effect: '' }]);
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
    <div className="medication-box">
      <h3>비상약 정보</h3>
      <table className="medication-table">
        <thead>
          <tr>
            <th>약이름</th>
            <th>효과</th>
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
                  placeholder="약이름을 입력하세요"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.effect}
                  onChange={(e) => handleInputChange(index, 'effect', e.target.value)}
                  placeholder="효과를 입력하세요"
                />
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
