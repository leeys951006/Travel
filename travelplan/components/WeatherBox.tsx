// WeatherBox.tsx
import React, { useState, useEffect } from 'react';

interface WeatherBoxProps {
  location: string;
}

const WeatherBox: React.FC<WeatherBoxProps> = ({ location }) => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8000/weather?location=${encodeURIComponent(location)}&base_date=20210628&base_time=0630&nx=55&ny=127`
        );
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [location]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!weatherData) {
    return <div>날씨 정보를 가져올 수 없습니다.</div>;
  }

  return (
    <div className="weather-box">
      <h3>{location}의 날씨</h3>
      {/* 날씨 데이터 출력 (예시) */}
      {weatherData.item.map((item: any, index: number) => (
        <p key={index}>{item.category}: {item.fcstValue}</p>
      ))}
    </div>
  );
};

export default WeatherBox;
