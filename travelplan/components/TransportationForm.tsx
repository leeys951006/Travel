// components/TransportationForm.tsx
'use client';

import { useState } from 'react';

interface TransportationFormProps {
  type: '자동차' | '대중교통';
  onDelete: () => void;
}

export default function TransportationForm({ type, onDelete }: TransportationFormProps) {
  const [rows, setRows] = useState([{ name: '', cost: '', transport: '', time: '', duration: '' }]);

  const addRow = () => {
    setRows([...rows, { name: '', cost: '', transport: '', time: '', duration: '' }]);
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
    <div className="transportation-form">
      <h3>{type} 정보</h3>
      <table className="transportation-table">
        <thead>
          <tr>
            {type === '자동차' ? (
              <>
                <th>이름</th>
                <th>비용</th>
              </>
            ) : (
              <>
                <th>교통편</th>
                <th>소요시간</th>
                <th>비용</th>
                <th>탑승시간</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {type === '자동차' ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={row.name}
                      onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                      placeholder="이름을 입력하세요"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.cost}
                      onChange={(e) => handleInputChange(index, 'cost', e.target.value)}
                      placeholder="비용을 입력하세요"
                    />
                  </td>
                </>
              ) : (
                <>
                  <td>
                    <input
                      type="text"
                      value={row.transport}
                      onChange={(e) => handleInputChange(index, 'transport', e.target.value)}
                      placeholder="교통편을 입력하세요"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.duration}
                      onChange={(e) => handleInputChange(index, 'duration', e.target.value)}
                      placeholder="소요시간을 입력하세요"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.cost}
                      onChange={(e) => handleInputChange(index, 'cost', e.target.value)}
                      placeholder="비용을 입력하세요"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.time}
                      onChange={(e) => handleInputChange(index, 'time', e.target.value)}
                      placeholder="탑승시간을 입력하세요"
                    />
                  </td>
                </>
              )}
              <td className="delete-row-button">
                <button onClick={() => deleteRow(index)}>×</button>
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
