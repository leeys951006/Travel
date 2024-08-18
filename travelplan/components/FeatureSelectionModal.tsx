// components/FeatureSelectionModal.tsx
'use client';

import { useState } from 'react';

interface FeatureSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (feature: string) => void;
}

export default function FeatureSelectionModal({ isOpen, onClose, onSelect }: FeatureSelectionModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<'domestic' | 'international' | null>(null);

  const domesticFeatures = [
    '장소', '교통', '숙소', '짐', '장바구니', '지도', '티켓', '식당', '비상연락처', '예산',
    '기념품', '알레르기', '기타'
  ];

  const internationalFeatures = [
    '장소', '교통', '숙소', '짐', '장바구니', '지도', '티켓', '식당', '비상연락처', '예산',
    '여행자보험', '유심', '환전', '기념품', '비자', '비상약', '알레르기', '환율', '기타'
  ];

  const features = selectedCategory === 'domestic' ? domesticFeatures : internationalFeatures;

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content feature-modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>기능 선택</h2>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="domestic"
              checked={selectedCategory === 'domestic'}
              onChange={() => setSelectedCategory('domestic')}
            />
            국내
          </label>
          <label>
            <input
              type="radio"
              value="international"
              checked={selectedCategory === 'international'}
              onChange={() => setSelectedCategory('international')}
            />
            해외
          </label>
        </div>

        {selectedCategory && (
          <ul className="feature-list">
            {features.map((feature, index) => (
              <li
                key={index}
                className="feature-item"
                onClick={() => {
                  onSelect(feature);
                  onClose();
                }}
              >
                {feature}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
