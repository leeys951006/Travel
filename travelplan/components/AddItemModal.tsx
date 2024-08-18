// components/AddItemModal.tsx
'use client';

import { useState } from 'react';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: string) => void;
}

const koreanCities = [
  '서울특별시', '부산광역시', '대구광역시', '인천광역시', '광주광역시', '대전광역시', '울산광역시', '세종특별자치시',
  '수원시', '성남시', '안양시', '안산시', '용인시', '평택시', '과천시', '의왕시', '구리시', '남양주시', '오산시',
  '시흥시', '군포시', '의정부시', '김포시', '광명시', '광주시', '이천시', '양주시', '여주시', '고양시', '파주시',
  '양평군', '하남시', '동두천시', '안성시', '포천시', '화성시', '강릉시', '원주시', '속초시', '동해시', '삼척시',
  '태백시', '정선군', '철원군', '화천군', '양구군', '인제군', '고성군', '양양군', '청주시', '충주시', '제천시',
  '보은군', '옥천군', '영동군', '진천군', '괴산군', '음성군', '단양군', '천안시', '공주시', '보령시', '아산시',
  '서산시', '논산시', '계룡시', '당진시', '금산군', '부여군', '서천군', '청양군', '홍성군', '예산군', '태안군',
  '전주시', '군산시', '익산시', '정읍시', '남원시', '김제시', '완주군', '진안군', '무주군', '장수군', '임실군',
  '순창군', '고창군', '부안군', '목포시', '여수시', '순천시', '나주시', '광양시', '담양군', '곡성군', '구례군',
  '고흥군', '보성군', '화순군', '장흥군', '강진군', '해남군', '영암군', '무안군', '함평군', '영광군', '장성군',
  '완도군', '진도군', '신안군', '포항시', '경주시', '김천시', '안동시', '구미시', '영주시', '영천시', '상주시',
  '문경시', '경산시', '군위군', '의성군', '청송군', '영양군', '영덕군', '청도군', '고령군', '성주군', '칠곡군',
  '예천군', '봉화군', '울진군', '울릉군', '창원시', '진주시', '통영시', '사천시', '김해시', '밀양시', '거제시',
  '양산시', '의령군', '함안군', '창녕군', '고성군', '남해군', '하동군', '산청군', '함양군', '거창군', '합천군',
  '제주시', '서귀포시'
];

const worldCountries = [
  '가나', '가봉', '가이아나', '감비아', '과테말라', '괌', '그레나다', '그루지야', '그리스', '기니', '기니비사우',
  '나미비아', '나우루', '나이지리아', '남수단', '남아프리카공화국', '네덜란드', '네팔', '노르웨이', '뉴질랜드',
  '니우에', '니제르', '니카라과', '대만', '덴마크', '도미니카공화국', '독일', '동티모르', '라오스', '라이베리아',
  '라트비아', '러시아', '레바논', '레소토', '루마니아', '룩셈부르크', '르완다', '리비아', '리투아니아', '리히텐슈타인',
  '마다가스카르', '마셜제도', '마요트', '말라위', '말레이시아', '말리', '멕시코', '모나코', '모로코', '모리셔스',
  '모리타니', '모잠비크', '몬테네그로', '몰도바', '몰디브', '몰타', '몽골', '미국', '미얀마', '바누아투',
  '바레인', '바베이도스', '바티칸', '바하마', '방글라데시', '버뮤다', '베냉', '베네수엘라', '베트남', '벨기에',
  '벨라루스', '벨리즈', '보스니아 헤르체고비나', '보츠와나', '볼리비아', '부룬디', '부르키나파소', '부탄', '북마케도니아',
  '불가리아', '브라질', '브루나이', '사모아', '사우디아라비아', '산마리노', '상투메프린시페', '세네갈', '세르비아',
  '세인트루시아', '세인트빈센트그레나딘', '세인트키츠네비스', '소말리아', '솔로몬제도', '수단', '수리남', '스리랑카',
  '스웨덴', '스위스', '스페인', '슬로바키아', '슬로베니아', '시리아', '시에라리온', '싱가포르', '아랍에미리트',
  '아르메니아', '아르헨티나', '아이슬란드', '아이티', '아일랜드', '아제르바이잔', '아프가니스탄', '안도라', '알바니아',
  '알제리', '앙골라', '앤티가바부다', '에리트레아', '에스토니아', '에스와티니', '에콰도르', '에티오피아', '엘살바도르',
  '영국', '예멘', '오만', '오스트레일리아', '오스트리아', '온두라스', '요르단', '우간다', '우루과이', '우즈베키스탄',
  '우크라이나', '이라크', '이란', '이스라엘', '이집트', '이탈리아', '인도', '인도네시아', '일본', '자메이카',
  '잠비아', '적도기니', '조지아', '중앙아프리카공화국', '중국', '지부티', '짐바브웨', '차드', '체코', '칠레',
  '카메룬', '카타르', '캄보디아', '캐나다', '케냐', '코모로', '코스타리카', '코트디부아르', '콜롬비아', '콩고공화국',
  '콩고민주공화국', '쿠바', '쿠웨이트', '쿡제도', '크로아티아', '키르기스스탄', '키리바시', '키프로스', '타지키스탄',
  '탄자니아', '태국', '터키', '토고', '통가', '투르크메니스탄', '투발루', '튀니지', '트리니다드토바고', '파나마',
  '파라과이', '파키스탄', '파푸아뉴기니', '팔라우', '페루', '포르투갈', '폴란드', '프랑스', '피지', '핀란드', '필리핀',
  '헝가리'
];

export default function AddItemModal({ isOpen, onClose, onAdd }: AddItemModalProps) {
  const [selectedType, setSelectedType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState<string[]>([]);

  const handleAddItem = (item: string) => {
    if (item) {
      onAdd(item);
      setSelectedType('');
      setSearchTerm('');
      setFilteredItems([]);
      onClose();
    }
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    setSearchTerm('');
    if (type === 'domestic') {
      setFilteredItems(koreanCities);
    } else if (type === 'international') {
      setFilteredItems(worldCountries);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    const items = selectedType === 'domestic'
      ? koreanCities.filter((city) => city.startsWith(term))
      : worldCountries.filter((country) => country.startsWith(term));

    setFilteredItems(items);
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>여행 지역,국가 추가</h2>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="domestic"
              checked={selectedType === 'domestic'}
              onChange={() => handleTypeChange('domestic')}
            />
            국내
          </label>
          <label>
            <input
              type="radio"
              value="international"
              checked={selectedType === 'international'}
              onChange={() => handleTypeChange('international')}
            />
            해외
          </label>
        </div>

        {selectedType && (
          <div className="search-container">
            <input
              type="text"
              placeholder={selectedType === 'domestic' ? '국내 지역 검색' : '해외 국가 검색'}
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            {filteredItems.length > 0 && (
              <ul className="location-list">
                {filteredItems.map((item, index) => (
                  <li
                    key={index}
                    className="location-item"
                    onClick={() => handleAddItem(item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
