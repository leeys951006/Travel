// components/PlanModal.tsx
'use client';

import React, { useState } from 'react';

export default function PlanModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>계획 추가</h2>
        <div className="modal-box">
          {/* 여기에 이메일 추가 입력란을 넣을 수 있습니다 */}
        </div>
        <div className="modal-buttons">
          <button className="modal-button email-add-button">이메일 추가</button>
          <button className="modal-button invite-email-button">초대 이메일 발송</button>
        </div>
        <button className="modal-close-button" onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}
