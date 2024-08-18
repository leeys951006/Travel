// components/AccommodationForm.tsx
'use client';

import { useState } from 'react';

export default function AccommodationForm({ onDelete }: { onDelete: () => void }) {
  const [rows, setRows] = useState([{ name: '', address: '', phone: '', checkIn: '', checkOut: '' }]);
  const [boxName, setBoxName] = useState(''); // Box 이름을 관리하는 상태

  const addRow = () => {
    setRows([...rows, { name: '', address: '', phone: '', checkIn: '', checkOut: '' }]);
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
    <div className="box1">
      <input
        type="text"
        value={boxName}
        onChange={(e) => setBoxName(e.target.value)}
        placeholder="박스 이름을 입력하세요"
        className="box-name-input"
      />
      <h3>{boxName || '숙소 정보'}</h3>
      <table className="location-table">
        <thead>
          <tr>
            <th>이름</th>
            <th>주소</th>
            <th>전화번호</th>
            <th>체크인</th>
            <th>체크아웃</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td><input type="text" value={row.name} onChange={(e) => handleInputChange(index, 'name', e.target.value)} placeholder="숙소 이름을 입력하세요" /></td>
              <td><input type="text" value={row.address} onChange={(e) => handleInputChange(index, 'address', e.target.value)} placeholder="주소를 입력하세요" /></td>
              <td><input type="text" value={row.phone} onChange={(e) => handleInputChange(index, 'phone', e.target.value)} placeholder="전화번호를 입력하세요" /></td>
              <td><input type="text" value={row.checkIn} onChange={(e) => handleInputChange(index, 'checkIn', e.target.value)} placeholder="체크인 시간을 입력하세요" /></td>
              <td className="hours-cell">
                <input type="text" value={row.checkOut} onChange={(e) => handleInputChange(index, 'checkOut', e.target.value)} placeholder="체크아웃 시간을 입력하세요" />
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
