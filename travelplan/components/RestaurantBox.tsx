// components/RestaurantBox.tsx
'use client';

import { useState } from 'react';

export default function RestaurantBox({ onDelete }: { onDelete: () => void }) {
  const [rows, setRows] = useState([{ name: '', address: '', phone: '', hours: '', breakTime: '' }]);

  const addRow = () => {
    setRows([...rows, { name: '', address: '', phone: '', hours: '', breakTime: '' }]);
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
    <div className="restaurant-form">
      <h3>식당</h3>
      <table className="restaurant-table">
        <thead>
          <tr>
            <th>이름</th>
            <th>주소</th>
            <th>전화번호</th>
            <th>운영시간</th>
            <th>브레이크 타임</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td><input type="text" value={row.name} onChange={(e) => handleInputChange(index, 'name', e.target.value)} placeholder="이름을 입력하세요" /></td>
              <td><input type="text" value={row.address} onChange={(e) => handleInputChange(index, 'address', e.target.value)} placeholder="주소를 입력하세요" /></td>
              <td><input type="text" value={row.phone} onChange={(e) => handleInputChange(index, 'phone', e.target.value)} placeholder="전화번호를 입력하세요" /></td>
              <td><input type="text" value={row.hours} onChange={(e) => handleInputChange(index, 'hours', e.target.value)} placeholder="운영시간을 입력하세요" /></td>
              <td className="breaktime-cell">
                <input type="text" value={row.breakTime} onChange={(e) => handleInputChange(index, 'breakTime', e.target.value)} placeholder="브레이크 타임을 입력하세요" />
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
