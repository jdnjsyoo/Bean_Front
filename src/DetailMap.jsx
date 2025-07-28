import React, { useEffect } from 'react';
const { kakao } = window;

function CafeDetail() {
  useEffect(() => {
    const container = document.getElementById('map');

    // 카페 주소
    const cafeAddress = '서울특별시 관악구 관악로 157';

    // 주소 → 좌표 변환
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(cafeAddress, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        const options = {
          center: coords,
          level: 2
        };

        const map = new kakao.maps.Map(container, options);

        // 기본 마커 생성
        new kakao.maps.Marker({
          map: map,
          position: coords
        });
      } else {
        console.error('주소 변환 실패:', status);
      }
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

export default CafeDetail;
