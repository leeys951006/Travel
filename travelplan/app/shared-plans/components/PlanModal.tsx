// components/PlanModal.tsx
'use client';

import React, { useState } from 'react';
import EmailInputModal from './EmailInputModal';

export default function PlanModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
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

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>계획 추가</h2>
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
          <button className="modal-button invite-email-button">초대 이메일 발송</button>
        </div>
        <button className="modal-close-button" onClick={onClose}>✖︎</button>
      </div>

      <EmailInputModal
        isOpen={isEmailModalOpen}
        onClose={handleCloseEmailModal}
        onAddEmail={handleAddEmail} // 이 부분이 정상적으로 작동합니다.
      />
    </div>
  );
}
