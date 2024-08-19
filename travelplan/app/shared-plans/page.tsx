// app/shared-plans/page.tsx
'use client';

import './shared-plans.css';
import { useState } from 'react';
import EmailList from '../../components/EmailList';
import AddEmailModal from '../../components/AddEmailModal';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal';
import AddItemModal from '../../components/AddItemModal';
import ItemList from '../../components/ItemList';
import AddBox from '../../components/AddBox'; // AddBox 컴포넌트 추가

export default function SharedPlans() {
  const [emails, setEmails] = useState<string[]>([]);
  const [items, setItems] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [emailToDelete, setEmailToDelete] = useState<string | null>(null);

  const addEmail = (email: string) => {
    if (email && !emails.includes(email)) {
      setEmails([...emails, email]);
    }
  };

  const addItem = (item: string) => {
    if (item && !items.includes(item)) {
      setItems([...items, item]);
    }
  };

  const deleteEmail = () => {
    if (emailToDelete) {
      setEmails(emails.filter((e) => e !== emailToDelete));
      setEmailToDelete(null);
    }
  };

  const deleteItem = (item: string) => {
    setItems(items.filter((i) => i !== item));
  };

  return (
    <div className="shared-plans-container">
      <div className="top-ad-space">{/* 상단 광고 배너 공간 */}</div>
      <div className="middle-content">
        <div className="ad-space left-ad-space">{/* 왼쪽 광고 배너 공간 */}</div>
        <div className="content">
          <h1>공유계획 페이지</h1>

          {/* 이메일 목록 */}
          <EmailList emails={emails} onDelete={(email) => setEmailToDelete(email)} />
          <button className="member-button" onClick={() => setIsModalOpen(true)}>
            멤버 추가
          </button>

          <ItemList items={items} onDelete={deleteItem} />
          <button className="location-button" onClick={() => setIsItemModalOpen(true)}>
            여행 지역,국가 추가
          </button>

          {/* 새로운 AddBox 컴포넌트 */}
          <AddBox />

          {/* 모달 창 */}
          <AddEmailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={addEmail} />
          <AddItemModal isOpen={isItemModalOpen} onClose={() => setIsItemModalOpen(false)} onAdd={addItem} />
          <DeleteConfirmationModal emailToDelete={emailToDelete} onConfirm={deleteEmail} onCancel={() => setEmailToDelete(null)} />
        </div>
        <div className="ad-space right-ad-space">{/* 오른쪽 광고 배너 공간 */}</div>
      </div>
    </div>
  );
}
