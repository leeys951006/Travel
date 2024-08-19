// components/TransportBox.tsx
'use client';

import { useState } from 'react';
import TransportModal from './TransportModal';

export default function TransportBox({ onDelete }: { onDelete: () => void }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transportType, setTransportType] = useState<'자동차' | '대중교통' | null>(null);
  const [rows, setRows] = useState<Array<{ [key: string]: string }>>([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSelect = (type: '자동차' | '대중교통') => {
    setTransportType(type);
    if (type === '자동차') {
      setRows([{ name: '', cost: '' }]);
    } else if (type === '대중교통') {
      setRows([{ transport: '', boardingTime: '', alightingTime: '', duration: '', cost: '' }]);
    }
    closeModal();
  };

  const addRow = () => {
    if (transportType === '자동차') {
      setRows([...rows, { name: '', cost: '' }]);
    } else if (transportType === '대중교통') {
      setRows([...rows, { transport: '', boardingTime: '', alightingTime: '', duration: '', cost: '' }]);
    }
  };

  const handleInputChange = (index: number, field: string, value: string) => {
    const newRows = [...rows];

    if (field === 'cost') {
      value = formatCost(value);
    }

    newRows[index] = { ...newRows[index], [field]: value };

    if (field === 'boardingTime' || field === 'alightingTime') {
      const boardingTime = field === 'boardingTime' ? value : newRows[index].boardingTime;
      const alightingTime = field === 'alightingTime' ? value : newRows[index].alightingTime;

      if (!boardingTime || !alightingTime) {
        newRows[index].duration = ''; // 필드가 비워졌을 때 소요시간을 초기화
      } else {
        const duration = calculateDuration(boardingTime, alightingTime);
        newRows[index].duration = duration;
      }
    }

    setRows(newRows);
  };

  const formatCost = (value: string): string => {
    // 숫자만 남기고 쉼표 제거 후 포맷팅
    const numericValue = value.replace(/\D/g, '');
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const deleteRow = (index: number) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const calculateDuration = (startTime: string, endTime: string): string => {
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);

    const startDate = new Date();
    const endDate = new Date();

    startDate.setHours(startHours, startMinutes);
    endDate.setHours(endHours, endMinutes);

    let duration = (endDate.getTime() - startDate.getTime()) / (1000 * 60); // 소요시간을 분 단위로 계산

    if (duration < 0) {
      duration += 24 * 60; // 음수인 경우 하루(24시간)를 더해줌
    }

    const hours = Math.floor(duration / 60);
    const minutes = Math.floor(duration % 60);

    return `${hours}시간 ${minutes}분`;
  };

  return (
    <div className="transport-box">
      <button className="delete-transport-button" onClick={onDelete}>✖︎</button>
      {!transportType && (
        <button className="add-transport-button" onClick={openModal}>+</button>
      )}
      {transportType && (
        <div>
          <h3>{transportType}</h3>
          {transportType === '대중교통' && <p>탑승시간과 하차시간을 HH:MM 형식으로 입력하세요.</p>}
          <table className="transport-table">
            <thead>
              <tr>
                {transportType === '자동차' ? (
                  <>
                    <th>이름</th>
                    <th>비용</th>
                  </>
                ) : (
                  <>
                    <th>교통편</th>
                    <th>탑승시간</th>
                    <th>하차시간</th>
                    <th>소요시간</th>
                    <th>비용</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  {transportType === '자동차' ? (
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
                        <button className="Trdelete-row-button" onClick={() => deleteRow(index)}>✖︎</button>
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
                          value={row.boardingTime}
                          onChange={(e) => handleInputChange(index, 'boardingTime', e.target.value)}
                          placeholder="HH:MM"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={row.alightingTime}
                          onChange={(e) => handleInputChange(index, 'alightingTime', e.target.value)}
                          placeholder="HH:MM"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={row.duration}
                          placeholder="자동 계산됨"
                          readOnly
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={row.cost}
                          onChange={(e) => handleInputChange(index, 'cost', e.target.value)}
                          placeholder="비용을 입력하세요"
                        />
                        <button className="Trdelete-row-button" onClick={() => deleteRow(index)}>✖︎</button>
                      </td>
                    </>
                  )}
                  
                </tr>
              ))}
            </tbody>
          </table>
          <button className="add-row-button" onClick={addRow}>+</button>
        </div>
      )}
      <TransportModal isOpen={isModalOpen} onClose={closeModal} onSelect={handleSelect} />
    </div>
  );
}
