// components/ItemWeatherBox.tsx
'use client';

import { useEffect, useState } from 'react';
import xml2js from 'xml2js';

interface ItemWeatherBoxProps {
  selectedLocations: string[];
}

interface WeatherData {
  location: string;
  temperature: string;
}

export default function ItemWeatherBox({ selectedLocations }: ItemWeatherBoxProps) {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const promises = selectedLocations.map(async (location) => {
        const apiUrl = `https://apihub.kma.go.kr/api/typ01/cgi-bin/url/nph-dfs_vsrt_grd?tmfc=202403011010&tmef=2024030111&vars=T1H&authKey=nZTiqp13RDWU4qqdd3Q1AA`;
        try {
          const response = await fetch(apiUrl);
          const textData = await response.text(); // XML 데이터를 텍스트로 가져옴
          
          const parser = new xml2js.Parser();
          const jsonData = await parser.parseStringPromise(textData); // XML을 JSON으로 변환

          // 필요한 데이터를 jsonData에서 추출 (예시)
          const temperature = jsonData?.response?.body?.items?.item?.[0]?.obsrValue || '데이터 없음';

          return {
            location,
            temperature,
          };
        } catch (error) {
          console.error('Error fetching weather data:', error);
          return { location, temperature: '데이터 없음' };
        }
      });

      const results = await Promise.all(promises);
      setWeatherData(results);
    };

    if (selectedLocations.length > 0) {
      fetchWeatherData();
    }
  }, [selectedLocations]);

  return (
    <div className="weather-box">
      <h3>날씨 정보</h3>
      {weatherData.length > 0 ? (
        <ul>
          {weatherData.map((data, index) => (
            <li key={index}>
              {data.location}: {data.temperature}°C
            </li>
          ))}
        </ul>
      ) : (
        <p>선택된 지역이 없습니다.</p>
      )}
    </div>
  );
}
