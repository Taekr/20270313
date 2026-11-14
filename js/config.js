/*
 * 청첩장 설정 파일 — 글자·사진·계좌는 여기만 고치면 됩니다.
 *
 * [사진 바꾸는 법]
 *  1) 가장 쉬운 방법: web/images/ 안의 파일을 같은 이름으로 덮어쓰기
 *     - 메인 사진:   images/main.jpg   (정사각형 권장, 긴 변 1400px 정도)
 *     - 갤러리 사진: images/gallery/1.jpg, 2.jpg, ... (긴 변 1600px 정도)
 *  2) 사진 개수를 늘리거나 줄이려면 아래 gallery 배열에 줄을 추가/삭제하세요.
 *     순서 = 화면에 보이는 순서입니다. 파일 이름은 자유롭게 써도 됩니다.
 *  ※ 큰 원본(수십 MB)을 그대로 넣으면 모바일에서 느려지니 줄여서 넣으세요.
 */
window.WEDDING = {
  groom: {
    nameKo: '김영택',
    firstKo: '영택',
    nameEn: 'Kim YoungTaek',
    father: '김원태',
    mother: '이우남',
    relation: '장남',
  },
  bride: {
    nameKo: '정미영',
    firstKo: '미영',
    nameEn: 'Jeong MeeYoung',
    father: '정순필',
    mother: '허성순',
    relation: '차녀',
  },

  // 예식 일시 (24시간제). 14:00 = 오후 2시
  date: { year: 2027, month: 3, day: 13, hour: 14, minute: 0 },

  venue: {
    name: '엘블레스',
    hall: '다이아몬드홀',
    floor: '지하 1층(LL층)',
    addressKo: '서울시 서초구 강남대로 213',
    addressEn: '213, Gangnam-daero, Seocho-gu, Seoul, LL Floor',
    // 예식장 전화번호 (누르면 전화 걸기). telLink 는 실제로 걸리는 번호입니다.
    tel: '02-526-0300~3',
    telLink: '025260300',
    // 오시는 방법 — 한 줄은 문자열, 버스 노선처럼 앞에 작은 분류를 붙이려면 { tag, text }
    transit: [
      {
        label: '지하철',
        lines: ['3호선 양재역 / 신분당선 양재역', '9번 출구 바로 연결'],
      },
      {
        label: '자가용',
        lines: [
          '엘블레스 옆 양재역 공영 주차장 이용 (서초구 강남대로 221)',
          { note: '양재역 주차장에 주차하신 후 옆 건물 스포타임으로 이동하시면 됩니다.' },
          { note: '스포타임 건물 지하 1층에 엘블레스가 위치하고 있습니다.' },
        ],
      },
      {
        label: '버스',
        lines: [
          '양재역, 서초문화예술회관에서 하차',
          { tag: '지선', text: '0411, 4432, 4435' },
          { tag: '간선', text: '140, 341, 400, 405, 421, 440, 441, 452, 470, 542, 741' },
          { tag: '광역', text: '9404, 9408, 9409, 9500, 9501, 9711, 9802, M4403, M4434, M4448, M4449, M5422, M5438, M5443, M6410, M6450' },
          { tag: '마을', text: '서초09, 서초18, 서초18-1, 서초20' },
          { tag: '일반', text: '6, 11-3, 917' },
          { tag: '직행', text: '1006, 1311, 3000, 3002, 3003, 3007, 3008, 3030, 3100, 3101, 3102, 3201, 3800, 5200, 5300, 9202, 9400, 9700, G1003, G3900, G8157, G9633' },
        ],
      },
    ],
    // 지도 앱에서 검색할 이름
    mapQuery: '엘블레스',
    // 지도 이미지 — 파일을 같은 이름으로 바꾸면 교체됩니다. 누르면 네이버지도가 열립니다.
    mapImage: 'images/map.jpg',
    // 주차 안내 이미지 — 필요 없으면 '' 로 비우세요. 누르면 크게 열립니다.
    parkingImage: 'images/parking.jpg',
    // mapImage 를 '' 로 비웠을 때만 쓰는 구글 지도 미리보기. 끄려면 false
    showMapPreview: true,
  },

  // 메인 사진 (원본: 청첩장 메인 사진_261107_1.jpeg 를 웹용으로 줄인 사본)
  mainPhoto: 'images/main.jpg',
  // 메인 사진은 가로로 살짝 넓은 아치(6:5) 안에 잘려 보입니다. 가로 사진이면 어느 쪽을 보여줄지
  // '가로% 세로%' 로 정하세요. 0% = 왼쪽/위, 50% = 가운데, 100% = 오른쪽/아래
  mainPhotoFocus: '47% 50%',

  // 갤러리 사진 목록 — 줄을 추가/삭제/순서 변경하면 그대로 반영됩니다.
  gallery: [
    'images/gallery/1.jpg',
    'images/gallery/2.jpg',
    'images/gallery/3.jpg',
    'images/gallery/4.jpg',
    'images/gallery/5.jpg',
    'images/gallery/6.jpg',
    'images/gallery/7.jpg',
    'images/gallery/8.jpg',
    'images/gallery/9.jpg',
  ],

  // 마음 전하실 곳 — 아직 정보가 없어 비워 두었습니다.
  // 예: { who: '신랑 김영택', bank: '○○은행', number: '000-000-000000' }
  accounts: {
    groom: [],
    bride: [],
  },
};
