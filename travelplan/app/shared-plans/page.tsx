// app/page.tsx
'use client';

import './css/shared-plan.css';
import { useState } from 'react';
import PlanModal from './components/PlanModal';

export default function SharedPlans() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="shared-plans-container">
      <div className="top-ad-space">{/* 상단 광고 배너 공간 */}</div>
      <div className="middle-content">
        <div className="ad-space left-ad-space">{/* 왼쪽 광고 배너 공간 */}</div>
        
        <div className="plans-container">
          <div className="plan-section">
            <h2 className="plan-title">공유계획</h2>
            <div className="plan-box">
              <button className="add-plan-button" onClick={openModal}>계획 추가</button>
            </div>
          </div>

          <div className="plan-section">
            <h2 className="plan-title">개인계획</h2>
            <div className="plan-box">
              {/* 개인계획 컨텐츠 */}
            </div>
          </div>
        </div>

        <div className="ad-space right-ad-space">{/* 오른쪽 광고 배너 공간 */}</div>
      </div>

      <PlanModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
