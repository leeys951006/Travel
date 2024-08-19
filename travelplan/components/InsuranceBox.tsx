// components/InsuranceBox.tsx
'use client';

import { useState } from 'react';

export default function InsuranceBox({ onDelete }: { onDelete: () => void }) {
  const [rows, setRows] = useState([{ name: '', company: '', coverage: 'O' }]);

  const addRow = () => {
    setRows([...rows, { name: '', company: '', coverage: 'O' }]);
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
    <div className="insurance-box">
      <h3>여행자보험 정보</h3>
      <table className="insurance-table">
        <thead>
          <tr>
            <th>보험 이름</th>
            <th>보험 회사</th>
            <th>보험 유무</th>
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
                  placeholder="보험 이름을 입력하세요"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.company}
                  onChange={(e) => handleInputChange(index, 'company', e.target.value)}
                  placeholder="보험 회사를 입력하세요"
                />
              </td>
              <td>
                <label htmlFor={`coverage-${index}`} className="visually-hidden">보험 유무</label>
                <select
                  id={`coverage-${index}`}
                  value={row.coverage}
                  onChange={(e) => handleInputChange(index, 'coverage', e.target.value)}
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
