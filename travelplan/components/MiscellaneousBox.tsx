'use client';

export default function MiscellaneousBox({ onDelete }: { onDelete: () => void }) {
  return (
    <div className="miscellaneous-box">
      <h3>기타 항목</h3>
      <div className="form-actions">
        <button className="add-row-button">+</button>
        <button className="delete-form-button" onClick={onDelete}>
          ✖︎
        </button>
      </div>
    </div>
  );
}
