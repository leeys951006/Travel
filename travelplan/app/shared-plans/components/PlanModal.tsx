// components/PlanModal.tsx
'use client';

import React, { useState } from 'react';
import EmailInputModal from './EmailInputModal';

interface PlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePlan: (planName: string, emails: string[]) => void;
}

export default function PlanModal({ isOpen, onClose, onCreatePlan }: PlanModalProps) {
  const [planName, setPlanName] = useState('');
  const [emails, setEmails] = useState<string[]>([]);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const handleOpenEmailModal = () => {
    setIsEmailModalOpen(true);
  };

  const handleCloseEmailModal = () => {
    setIsEmailModalOpen(false);
  };

  const handleAddEmail = (email: string) => {
    setEmails((prevEmails) => [...prevEmails, email]);
  };

  const handleDeleteEmail = (emailToDelete: string) => {
    setEmails((prevEmails) => prevEmails.filter(email => email !== emailToDelete));
  };

  const handleCreate = () => {
    if (planName && emails.length > 0) {
      onCreatePlan(planName, emails);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>계획 추가</h2>
        <input
          type="text"
          value={planName}
          onChange={(e) => setPlanName(e.target.value)}
          placeholder="공유 계획 이름을 지정해주세요"
          className="modal-input"
        />
        <div className="modal-box">
          <ul className="email-list">
            {emails.map((email, index) => (
              <li key={index} className="email-item">
                {email}
                <button className="delete-email-button" onClick={() => handleDeleteEmail(email)}>✖︎</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="modal-buttons">
          <button className="modal-button email-add-button" onClick={handleOpenEmailModal}>이메일 추가</button>
          <button className="modal-button invite-email-button" onClick={handleCreate}>초대 이메일 발송</button>
        </div>
        <button className="modal-close-button" onClick={onClose}>닫기</button>
      </div>

      <EmailInputModal
        isOpen={isEmailModalOpen}
        onClose={handleCloseEmailModal}
        onAddEmail={handleAddEmail}
      />
    </div>
  );
}
