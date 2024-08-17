// components/EmailList.tsx
'use client';

import { useState } from 'react';

interface EmailListProps {
  emails: string[];
  onDelete: (email: string) => void;
}

export default function EmailList({ emails, onDelete }: EmailListProps) {
  return (
    <div className="box">
      {emails.map((email) => (
        <div key={email} className="email-item">
          {email}
          <button className="delete-button" onClick={() => onDelete(email)}>
            X
          </button>
        </div>
      ))}
    </div>
  );
}
