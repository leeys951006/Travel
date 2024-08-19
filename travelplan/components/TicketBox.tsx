// components/TicketBox.tsx
'use client';

import { useState, useEffect } from 'react';

export default function TicketBox({ onDelete }: { onDelete: () => void }) {
  const [rows, setRows] = useState([{ name: '', quantity: '', price: '' }]);
  const [total, setTotal] = useState(0);

  const addRow = () => {
    setRows([...rows, { name: '', quantity: '', price: '' }]);
  };

  const handleInputChange = (index: number, field: string, value: string) => {
    const newRows = [...rows];
    if (field === 'price') {
      // 가격 입력 시 , 자동 처리
      value = value.replace(/[^0-9]/g, ''); // 숫자만 남기기
      newRows[index] = { ...newRows[index], [field]: Number(value).toLocaleString() };
    } else {
      newRows[index] = { ...newRows[index], [field]: value };
    }
    setRows(newRows);
  };

  const deleteRow = (index: number) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  useEffect(() => {
    const calculatedTotal = rows.reduce((sum, row) => {
      const price = parseInt(row.price.replace(/,/g, '')) || 0; // , 제거 후 숫자 변환
      const quantity = parseInt(row.quantity) || 0;
      return sum + price * quantity;
    }, 0);
    setTotal(calculatedTotal);
  }, [rows]);

  return (
    <div className="ticket-form">
      <h3>티켓</h3>
      <table className="ticket-table">
        <thead>
          <tr>
            <th>이름</th>
            <th>수량</th>
            <th>가격</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td><input type="text" value={row.name} onChange={(e) => handleInputChange(index, 'name', e.target.value)} placeholder="이름을 입력하세요" /></td>
              <td><input type="text" value={row.quantity} onChange={(e) => handleInputChange(index, 'quantity', e.target.value)} placeholder="수량을 입력하세요" /></td>
              <td className="price-cell">
                <input type="text" value={row.price} onChange={(e) => handleInputChange(index, 'price', e.target.value)} placeholder="가격을 입력하세요" />
                <button className="Trdelete-row-button" onClick={() => deleteRow(index)}>✖︎</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="form-actions">
        <button className="add-row-button" onClick={addRow}>+</button>
        <button className="delete-form-button" onClick={onDelete}>✖︎</button>
      </div>
      <div className="total-amount">
        합계: {total.toLocaleString()} 원
      </div>
    </div>
  );
}
