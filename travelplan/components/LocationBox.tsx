// // components/LocationBox.tsx
// 'use client';

// interface LocationBoxProps {
//   locations: string[];
// }

// export default function LocationBox({ locations }: LocationBoxProps) {
//   return (
//     <div className="box">
//       <p>여행 지역 및 국가:</p>
//       {locations.length > 0 ? (
//         <ul className="selected-locations">
//           {locations.map((location, index) => (
//             <li key={index} className="selected-location-item">
//               {location}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>추가된 지역 또는 국가가 없습니다.</p>
//       )}
//     </div>
//   );
// }
