// components/AddBox.tsx
'use client';

import { useState } from 'react';
import FeatureSelectionModal from './FeatureSelectionModal';
import TransportBox from './TransportBox';
import PlaceBox from './PlaceBox';
import AccommodationBox from './AccommodationBox';
import LuggageBox from './LuggageBox';
import ShoppingCartBox from './ShoppingCartBox'; // 새로 추가된 컴포넌트 임포트

export default function AddBox() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [features, setFeatures] = useState<{ type: string; key: number }[]>([]); // 생성된 feature 관리
  const [featureKey, setFeatureKey] = useState(0); // 각 feature에 고유한 키를 부여

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFeatureSelect = (feature: string) => {
    setFeatures([...features, { type: feature, key: featureKey }]); // 새로운 feature 추가
    setFeatureKey(featureKey + 1); // 키 증가
    closeModal(); // 모달 닫기
  };

  const deleteFeature = (key: number) => {
    setFeatures(features.filter((feature) => feature.key !== key)); // 특정 feature 삭제
  };

  return (
    <div className="feature-container">
      {features.map(({ type, key }) => (
        type === '장소' ? (
          <PlaceBox key={key} onDelete={() => deleteFeature(key)} />
        ) : type === '숙소' ? (
          <AccommodationBox key={key} onDelete={() => deleteFeature(key)} />
        ) : type === '짐' ? (
          <LuggageBox key={key} onDelete={() => deleteFeature(key)} />
        ) : type === '장바구니' ? (
          <ShoppingCartBox key={key} onDelete={() => deleteFeature(key)} />
        ) : (
          <TransportBox key={key} onDelete={() => deleteFeature(key)} />
        )
      ))}

      <div className="add-box">
        <button className="add-button" onClick={openModal}>+</button>
        <FeatureSelectionModal isOpen={isModalOpen} onClose={closeModal} onSelect={handleFeatureSelect} />
      </div>
    </div>
  );
}
