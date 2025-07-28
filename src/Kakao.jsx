import React, { useEffect } from 'react';
import cafe_list from './assets/cafe_list.jsx';
const { kakao } = window;

function Kakao() {
  useEffect(() => {
    const container = document.getElementById('map');

    const defaultCenter = new kakao.maps.LatLng(37.4781, 126.9527);
    const options = {
      center: defaultCenter,
      level: 3
    };
    const map = new kakao.maps.Map(container, options);
    // 지도 화면에서 모든 핀을 포함하도록
    const bounds = new kakao.maps.LatLngBounds();
    
    // fetch() 완료 추적을 위한 Promise 배열
    const fetchPromises = cafe_list.map((cafe) => {
      return fetch(`https://dapi.kakao.com/v2/local/search/keyword.json?query=${cafe}`, {
        headers: {
          Authorization: 'KakaoAK 85343d921113ffdf032722fcc089ebec'
        }
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data || !data.documents || data.documents.length === 0) {
            console.warn(`${cafe}에 대한 장소를 찾을 수 없습니다.`);
            return null;
          }

          const { x, y } = data.documents[0]; // x: 경도, y: 위도
          const position = new kakao.maps.LatLng(y, x);
          
          new kakao.maps.Marker({
            map: map,
            position: position
          });

          bounds.extend(position);
          return true;
        })
        .catch((error) => {
          console.error(`${cafe} 검색 중 오류 발생:`, error);
        });
    });

    // fetch가 끝난 뒤에 bounds 적용
    Promise.all(fetchPromises).then(() => {
      map.setBounds(bounds);
    });
  }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <div id="map" style={{
        width: '500px',
        height: '500px'
      }}></div>
    </div>
  );
}

export default Kakao;
