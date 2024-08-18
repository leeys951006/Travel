'use client';

import { useState, useEffect } from 'react';

export default function BudgetBox({ onDelete }: { onDelete: () => void }) {
  const [rows, setRows] = useState([{ name: '', amount: '' }]);
  const [total, setTotal] = useState(0);

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

  useEffect(() => {
    const sum = rows.reduce((acc, row) => {
      const amount = parseFloat(row.amount.replace(/,/g, '')) || 0;
      return acc + amount;
    }, 0);
    setTotal(sum);
  }, [rows]);

  const formatAmount = (amount: string) => {
    return amount.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div className="budget-form">
      <h3>예산</h3>
      <table className="budget-table">
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
                  placeholder="항목 이름을 입력하세요"
                />
              </td>
              <td className="amount-cell">
                <input
                  type="text"
                  value={formatAmount(row.amount)}
                  onChange={(e) => handleInputChange(index, 'amount', e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="금액을 입력하세요"
                />
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
      <div className="total-amount">
        합계: {formatAmount(total.toString())}원
      </div>
    </div>
  );
}
