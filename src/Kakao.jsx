import React, { useEffect } from 'react';
const { kakao } = window;

function Kakao() {
  useEffect(() => {
    const container = document.getElementById('map');

    // 지도 기본 중심: 서울대입구역 근처 (예시)
    const defaultCenter = new kakao.maps.LatLng(37.4781, 126.9527);
    const options = {
      center: defaultCenter,
      level: 3
    };
    const map = new kakao.maps.Map(container, options);
    // 지도 화면에서 모든 핀을 포함하도록
    const bounds = new kakao.maps.LatLngBounds();
    // 카페 리스트
    const queries = [
      '투썸플레이스서울대입구역점',
      '스타벅스 관악서울대입구R점', 
      '내 사랑을 먹어주세요', 
      '커피빈 서울대입구역점', 
      '라치몬트', 
      '일커피 서울대입구점',
      '리멤버미 관악구',
      '카페폴', 
      'MYC커피',
      '데일리오아시스 샤로수길점' 
    ];
    
    // fetch() 완료 추적을 위한 Promise 배열
    const fetchPromises = queries.map((query) => {
      return fetch(`https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}`, {
        headers: {
          Authorization: 'KakaoAK 85343d921113ffdf032722fcc089ebec'
        }
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data || !data.documents || data.documents.length === 0) {
            console.warn(`${query}에 대한 장소를 찾을 수 없습니다.`);
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
          console.error(`${query} 검색 중 오류 발생:`, error);
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
