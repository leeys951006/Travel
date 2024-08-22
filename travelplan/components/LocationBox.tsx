// components/LocationBox.tsx
'use client';

import LocationForm from './LocationForm';

export default function LocationBox({ onDelete }: { onDelete: () => void }) {
  return (
    <div className="location-box">
      {/* <button className="delete-location-button" onClick={onDelete}>×</button> */}
      <LocationForm onDelete={onDelete} />
    </div>
  );
}
