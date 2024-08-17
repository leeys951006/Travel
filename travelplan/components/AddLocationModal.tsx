// components/AddLocationModal.tsx
'use client';

import { useState } from 'react';

interface AddLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (location: string) => void;
}

const koreanCities = [
  '서울특별시', '부산광역시', '대구광역시', '인천광역시', '광주광역시', '대전광역시', '울산광역시', '세종특별자치시',
  '경기도', '강원도', '충청북도', '충청남도', '전라북도', '전라남도', '경상북도', '경상남도', '제주특별자치도'
];

const worldCountries = [
  'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'China', 'Japan', 'Australia',
  'India', 'Brazil', 'Russia', 'South Korea', 'Mexico', 'Italy', 'Spain', 'Netherlands', 'Sweden'
  // 실제로는 모든 국가를 포함하도록 추가해야 합니다.
];

export default function AddLocationModal({ isOpen, onClose, onAdd }: AddLocationModalProps) {
  const [selectedType, setSelectedType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showList, setShowList] = useState(false);

  const handleAddLocation = (location: string) => {
    if (location) {
      onAdd(location);
      setSelectedType('');
      setSearchTerm('');
      setShowList(false);
      onClose();
    }
  };

  const filteredLocations =
    selectedType === 'domestic'
      ? koreanCities.filter((city) => city.includes(searchTerm))
      : worldCountries.filter((country) => country.toLowerCase().includes(searchTerm.toLowerCase()));

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>여행 지역, 국가 추가</h2>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="domestic"
              checked={selectedType === 'domestic'}
              onChange={() => {
                setSelectedType('domestic');
                setShowList(false);
                setSearchTerm('');
              }}
            />
            국내
          </label>
          <label>
            <input
              type="radio"
              value="international"
              checked={selectedType === 'international'}
              onChange={() => {
                setSelectedType('international');
                setShowList(false);
                setSearchTerm('');
              }}
            />
            해외
          </label>
        </div>

        {selectedType && (
          <>
            <input
              type="text"
              placeholder="검색"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowList(true);
              }}
              onFocus={() => setShowList(true)}
              className="search-input"
            />
            {showList && (
              <ul className="location-list">
                {filteredLocations.map((location) => (
                  <li
                    key={location}
                    className="location-item"
                    onClick={() => handleAddLocation(location)}
                  >
                    {location}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        <button onClick={onClose}>취소</button>
      </div>
    </div>
  );
}
