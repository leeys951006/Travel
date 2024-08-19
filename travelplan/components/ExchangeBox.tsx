'use client';

import { useState } from 'react';

export default function ExchangeBox({ onDelete }: { onDelete: () => void }) {
  const [rows, setRows] = useState([{ name: '', amount: '' }]);

  const addRow = () => {
    setRows([...rows, { name: '', amount: '' }]);
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
    <div className="exchange-box">
      <h3>환전 정보</h3>
      <table className="exchange-table">
        <thead>
          <tr>
            <th>이름</th>
            <th>금액</th>
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
              <td className="amount-cell">
                <input
                  type="text"
                  value={row.amount}
                  onChange={(e) => handleInputChange(index, 'amount', e.target.value)}
                  placeholder="금액을 입력하세요"
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
