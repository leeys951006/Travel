'use client';

import { useState, useEffect } from 'react';

export default function SouvenirBox({ onDelete }: { onDelete: () => void }) {
  const [rows, setRows] = useState([{ name: '', quantity: '', price: '' }]);
  const [total, setTotal] = useState(0);

  const addRow = () => {
    setRows([...rows, { name: '', quantity: '', price: '' }]);
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

  useEffect(() => {
    const sum = rows.reduce((acc, row) => {
      const quantity = parseInt(row.quantity, 10) || 0;
      const price = parseFloat(row.price.replace(/,/g, '')) || 0;
      return acc + quantity * price;
    }, 0);
    setTotal(sum);
  }, [rows]);

  const formatPrice = (price: string) => {
    return price.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div className="souvenir-form">
      <h3>기념품</h3>
      <table className="souvenir-table">
        <thead>
          <tr>
            <th>품명</th>
            <th>수량</th>
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
                  placeholder="품명을 입력하세요"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.quantity}
                  onChange={(e) => handleInputChange(index, 'quantity', e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="수량을 입력하세요"
                />
              </td>
              <td className="price-cell">
                <input
                  type="text"
                  value={formatPrice(row.price)}
                  onChange={(e) => handleInputChange(index, 'price', e.target.value.replace(/[^0-9]/g, ''))}
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
      <div className="total-amount">
        합계: {formatPrice(total.toString())}원
      </div>
    </div>
  );
}
