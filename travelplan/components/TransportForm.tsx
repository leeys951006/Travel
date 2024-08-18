// components/TransportForm.tsx
'use client';

import { useState } from 'react';

interface TransportFormProps {
  type: '자동차' | '대중교통';
  onDelete: () => void;
}

export default function TransportForm({ type, onDelete }: TransportFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    cost: '',
    transport: '',
    time: '',
    duration: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  return (
    <div className="transport-form">
      <button className="delete-transport-form-button" onClick={onDelete}>×</button>
      {type === '자동차' ? (
        <div>
          <input
            type="text"
            placeholder="이름을 입력하세요"
            value={formData.name}
            onChange={(e) => handleChange(e, 'name')}
          />
          <input
            type="text"
            placeholder="비용을 입력하세요"
            value={formData.cost}
            onChange={(e) => handleChange(e, 'cost')}
          />
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="교통편을 입력하세요"
            value={formData.transport}
            onChange={(e) => handleChange(e, 'transport')}
          />
          <input
            type="text"
            placeholder="탑승시간을 입력하세요"
            value={formData.time}
            onChange={(e) => handleChange(e, 'time')}
          />
          <input
            type="text"
            placeholder="소요시간을 입력하세요"
            value={formData.duration}
            onChange={(e) => handleChange(e, 'duration')}
          />
          <input
            type="text"
            placeholder="비용을 입력하세요"
            value={formData.cost}
            onChange={(e) => handleChange(e, 'cost')}
          />
        </div>
      )}
    </div>
  );
}
