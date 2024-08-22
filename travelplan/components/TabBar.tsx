// components/TabBar.tsx
'use client';

import { useState, useEffect } from 'react';

export default function TabBar({ tabs }: { tabs: { id: string, label: string }[] }) {
  return (
    <div className="tab-bar">
      {tabs.map((tab) => (
        <a key={tab.id} href={`#${tab.id}`} className="tab-link">
          {tab.label}
        </a>
      ))}
    </div>
  );
}
