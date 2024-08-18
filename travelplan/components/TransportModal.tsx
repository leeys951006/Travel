// components/TransportModal.tsx
'use client';

interface TransportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (type: '자동차' | '대중교통') => void;
}

export default function TransportModal({ isOpen, onClose, onSelect }: TransportModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>교통 선택</h2>
        <div className="option-buttons">
          <button onClick={() => onSelect('자동차')} className="transport-option">자동차</button>
          <button onClick={() => onSelect('대중교통')} className="transport-option">대중교통</button>
        </div>
      </div>
    </div>
  );
}
