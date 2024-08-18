// components/AddBox.tsx
'use client';

import { useState } from 'react';
import FeatureSelectionModal from './FeatureSelectionModal';
import TransportBox from './TransportBox';
import PlaceBox from './PlaceBox';
import AccommodationBox from './AccommodationBox';
import LuggageBox from './LuggageBox';
import ShoppingCartBox from './ShoppingCartBox';
import TicketBox from './TicketBox';
import RestaurantBox from './RestaurantBox';
import EmergencyContactBox from './EmergencyContactBox';
import BudgetBox from './BudgetBox';
import SouvenirBox from './SouvenirBox';
import AllergyBox from './AllergyBox';
import InsuranceBox from './InsuranceBox';// 여행자보험 컴포넌트 추가

export default function AddBox() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [features, setFeatures] = useState<{ type: string; key: number }[]>([]);
  const [featureKey, setFeatureKey] = useState(0);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFeatureSelect = (feature: string) => {
    setFeatures([...features, { type: feature, key: featureKey }]);
    setFeatureKey(featureKey + 1);
    closeModal();
  };

  const deleteFeature = (key: number) => {
    setFeatures(features.filter((feature) => feature.key !== key));
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
        ) : type === '티켓' ? (
          <TicketBox key={key} onDelete={() => deleteFeature(key)} />
        ) : type === '식당' ? (
          <RestaurantBox key={key} onDelete={() => deleteFeature(key)} />
        ) : type === '비상연락처' ? (
          <EmergencyContactBox key={key} onDelete={() => deleteFeature(key)} />
        ) : type === '예산' ? (
          <BudgetBox key={key} onDelete={() => deleteFeature(key)} />
        ) : type === '기념품' ? (
          <SouvenirBox key={key} onDelete={() => deleteFeature(key)} />
        ) : type === '알레르기' ? (
          <AllergyBox key={key} onDelete={() => deleteFeature(key)} />
        ) : type === '여행자보험' ? ( // 여행자보험 추가
          <InsuranceBox key={key} onDelete={() => deleteFeature(key)} />
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
