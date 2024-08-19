// components/ItemList.tsx
'use client';

interface ItemListProps {
  items: string[];
  onDelete: (item: string) => void;
}

export default function ItemList({ items, onDelete }: ItemListProps) {
  return (
    <div className="box">
      {items.length > 0 ? (
        <div className="selected-locations">
          {items.map((item, index) => (
            <div key={index} className="selected-location-item">
              {item}
              <button onClick={() => onDelete(item)} className="delete-button">✖︎</button>
            </div>
          ))}
        </div>
      ) : (
        <p>추가된 항목이 없습니다.</p>
      )}
    </div>
  );
}
