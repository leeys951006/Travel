// components/DeleteConfirmationModal.tsx
'use client';

interface DeleteConfirmationModalProps {
  emailToDelete: string | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmationModal({
  emailToDelete,
  onConfirm,
  onCancel,
}: DeleteConfirmationModalProps) {
  if (!emailToDelete) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>정말 삭제하시겠습니까?</h2>
        <button onClick={onConfirm}>예</button>
        <button onClick={onCancel}>아니오</button>
      </div>
    </div>
  );
}
