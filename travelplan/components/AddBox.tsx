// components/AddBox.tsx
'use client';

import { useState } from 'react';
import FeatureSelectionModal from './FeatureSelectionModal';
import TransportBox from './TransportBox';
import LocationBox from './LocationBox';
import AccommodationBox from './AccommodationBox';
import LuggageBox from './LuggageBox';
import ShoppingCartBox from './ShoppingCartBox';
import TicketBox from './TicketBox';
import RestaurantBox from './RestaurantBox';
import EmergencyContactBox from './EmergencyContactBox';
import BudgetBox from './BudgetBox';
import SouvenirBox from './SouvenirBox';
import AllergyBox from './AllergyBox';
import InsuranceBox from './InsuranceBox';
import SimCardBox from './SimCardBox';
import ExchangeBox from './ExchangeBox';
import VisaBox from './VisaBox';
import MedicationBox from './MedicationBox';
import MiscellaneousBox from './MiscellaneousBox';

export default function AddBox({ onAddTab, onRemoveTab }: { onAddTab: (id: string, label: string) => void; onRemoveTab: (id: string) => void }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [features, setFeatures] = useState<{ type: string; key: number }[]>([]);
  const [featureKey, setFeatureKey] = useState(0);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFeatureSelect = (feature: string) => {
    const key = featureKey;
    setFeatures([...features, { type: feature, key }]);
    setFeatureKey(key + 1);
    closeModal();

    // 섹션이 추가될 때 탭 추가
    onAddTab(`feature-${key}`, feature);
  };

  const deleteFeature = (key: number) => {
    // 섹션 삭제 시 탭도 함께 삭제
    onRemoveTab(`feature-${key}`);
    setFeatures(features.filter((feature) => feature.key !== key));
  };

  return (
    <div className="feature-container">
      {features.map(({ type, key }) => (
        <div id={`feature-${key}`} key={key} className="feature-section">
          {type === '장소' ? (
            <LocationBox onDelete={() => deleteFeature(key)} />
          ) : type === '숙소' ? (
            <AccommodationBox onDelete={() => deleteFeature(key)} />
          ) : type === '짐' ? (
            <LuggageBox onDelete={() => deleteFeature(key)} />
          ) : type === '장바구니' ? (
            <ShoppingCartBox onDelete={() => deleteFeature(key)} />
          ) : type === '티켓' ? (
            <TicketBox onDelete={() => deleteFeature(key)} />
          ) : type === '식당' ? (
            <RestaurantBox onDelete={() => deleteFeature(key)} />
          ) : type === '비상연락처' ? (
            <EmergencyContactBox onDelete={() => deleteFeature(key)} />
          ) : type === '예산' ? (
            <BudgetBox onDelete={() => deleteFeature(key)} />
          ) : type === '기념품' ? (
            <SouvenirBox onDelete={() => deleteFeature(key)} />
          ) : type === '알레르기' ? (
            <AllergyBox onDelete={() => deleteFeature(key)} />
          ) : type === '여행자보험' ? (
            <InsuranceBox onDelete={() => deleteFeature(key)} />
          ) : type === '유심' ? (
            <SimCardBox onDelete={() => deleteFeature(key)} />
          ) : type === '환전' ? (
            <ExchangeBox onDelete={() => deleteFeature(key)} />
          ) : type === '비자' ? (
            <VisaBox onDelete={() => deleteFeature(key)} />
          ) : type === '비상약' ? (
            <MedicationBox onDelete={() => deleteFeature(key)} />
          ) : type === '기타' ? (
            <MiscellaneousBox onDelete={() => deleteFeature(key)} />
          ) : (
            <TransportBox onDelete={() => deleteFeature(key)} />
          )}
        </div>
      ))}

      <div className="add-box">
        <button className="add-button" onClick={openModal}>
          +
        </button>
        <FeatureSelectionModal isOpen={isModalOpen} onClose={closeModal} onSelect={handleFeatureSelect} />
      </div>
    </div>
  );
}
