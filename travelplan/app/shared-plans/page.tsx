'use client';

import './css/shared-plan.css';
import { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import PlanModal from './components/PlanModal';

export default function SharedPlans() {
  const { data: session, status } = useSession();  // 로그인 상태 가져오기
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');  // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>로딩 중...</div>;  // 로그인 상태 확인 중에는 로딩 화면 표시
  }

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
