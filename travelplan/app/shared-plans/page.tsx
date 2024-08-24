// pages/page.tsx (또는 components/page.tsx)
'use client';

import './css/shared-plan.css';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import PlanModal from './components/PlanModal';
import Plans from '../../components/Plans';

export default function SharedPlans() {
  const { data: session, status } = useSession();  
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [plans, setPlans] = useState<{ name: string; emails: string[] }[]>([]);
  const [selectedPlanIndex, setSelectedPlanIndex] = useState<number | null>(null);

  const handleCreatePlan = (planName: string, emails: string[]) => {
    setPlans([...plans, { name: planName, emails }]);
    setIsModalOpen(false); // 모달 닫기
  };

  const handleSelectPlan = (index: number) => {
    setSelectedPlanIndex(index);
  };

  const handleGoBack = () => {
    setSelectedPlanIndex(null);
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login'); 
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>로딩 중...</div>;  
  }

  return (
    <div className="shared-plans-container">
      <div className="top-ad-space">{/* 상단 광고 배너 공간 */}</div>
      <div className="middle-content">
        <div className="ad-space left-ad-space">{/* 왼쪽 광고 배너 공간 */}</div>
        
        <div className="plans-container">
          {selectedPlanIndex === null ? (
            <>
              <div className="plan-section">
                <h2 className="plan-title">공유계획</h2>
                <div className="plan-box">
                  {plans.map((plan, index) => (
                    <div key={index} className="plan-item" onClick={() => handleSelectPlan(index)}>
                      <h3>{plan.name}</h3>
                    </div>
                  ))}
                  <button className="add-plan-button" onClick={() => setIsModalOpen(true)}>계획 추가</button>
                </div>
              </div>

              <div className="plan-section">
                <h2 className="plan-title">개인계획</h2>
                <div className="plan-box">
                  {/* 개인계획 컨텐츠 */}
                </div>
              </div>
            </>
          ) : (
            <>
              <button onClick={handleGoBack}>뒤로 가기</button>
              <Plans emails={plans[selectedPlanIndex].emails} />
            </>
          )}
        </div>

        <div className="ad-space right-ad-space">{/* 오른쪽 광고 배너 공간 */}</div>
      </div>

      <PlanModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onCreatePlan={handleCreatePlan} 
      />
    </div>
  );
}
