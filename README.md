# 모바일 청첩장 (김영택 ♥ 정미영)

`index.html`을 브라우저로 열면 바로 보입니다. 빌드 과정은 없습니다.
(글꼴과 지도 미리보기는 인터넷이 연결되어 있어야 보입니다.)

## 폴더 구조

```
claude/web/
├─ index.html        페이지 뼈대
├─ css/style.css     디자인
├─ js/config.js      ★ 이름·날짜·장소·사진 목록·계좌 — 여기만 고치면 됩니다
├─ js/main.js        동작 (달력, D-day, 갤러리, 주소 복사 등)
└─ images/
   ├─ main.jpg       메인 사진
   ├─ map.jpg        오시는 길 지도 이미지
   ├─ parking.jpg    주차 안내 이미지
   ├─ og.jpg         카카오톡·문자 링크 미리보기 사진 (1200×630)
   └─ gallery/01.jpg ~ 09.jpg   갤러리 사진 (크게 볼 때)
      └─ thumb/      갤러리 칸에 보이는 작은 썸네일 (자동 생성)
tools/make_thumbs.py 썸네일 만드는 도구 (배포 안 됨)
.vercelignore        Vercel 에 올릴 파일 목록
```

## 사진 바꾸는 법

**방법 1 — 같은 이름으로 덮어쓰기 (가장 쉬움)**

- 메인 사진: `images/main.jpg` 를 새 사진으로 교체 (긴 변 1600~1800px 정도)
  - 메인 사진은 가로로 살짝 넓은 아치 안에 잘려 보입니다. 가로 사진이면 `js/config.js` 의 `mainPhotoFocus` 로 보여줄 위치를 맞추세요 (예: `'47% 50%'` = 두 사람 사이가 가운데 오도록 맞춘 값).
- 갤러리: `images/gallery/01.jpg` … `09.jpg` 를 교체한 뒤, 썸네일을 다시 만드세요.
  ```bash
  python3 tools/make_thumbs.py
  ```
  (갤러리 사진이 1600px 보다 크면 자동으로 줄이고, `thumb/` 에 같은 이름의 480px 썸네일을 만듭니다.
  썸네일이 없으면 큰 사진을 대신 쓰므로 화면이 깨지지는 않지만, 옛 썸네일이 남아 있으면 칸에는 예전 사진이 보입니다.)

**방법 2 — 사진 개수·순서 바꾸기**

`js/config.js` 의 `gallery` 배열을 수정합니다. 한 줄이 사진 한 장이고, 적힌 순서대로 보입니다.

```js
gallery: [
  'images/gallery/01.jpg',
  'images/gallery/새사진.jpg',   // 줄 추가 = 사진 추가
],
```

9장이 넘으면 "사진 더 보기" 버튼이 자동으로 생깁니다.

> 새 사진을 추가했다면 `python3 tools/make_thumbs.py` 를 한 번 실행하면 크기 줄이기와 썸네일이 한 번에 됩니다.

## Vercel 배포

- GitHub 저장소 [Taekr/20270313](https://github.com/Taekr/20270313)를 Vercel에서 Import 하면 됩니다. Root Directory 는 그대로(저장소 루트), Framework 는 Other, 빌드 명령은 비워 둡니다.
- 이후에는 GitHub 에 푸시할 때마다 Vercel 이 자동으로 다시 배포합니다.
- `.vercelignore` 때문에 `index.html`, `css/`, `js/`, `images/` 만 올라갑니다. 이 폴더의 원본 사진·README·tools 는 올라가지 않습니다. (원본 사진은 `.gitignore` 로 GitHub 에도 올리지 않습니다.)
- 배포 후 주소가 정해지면 `index.html` 위쪽의 `https://도메인` 두 곳을 실제 주소로 바꾸고 다시 배포하세요. 그래야 카카오톡으로 링크를 보낼 때 사진 미리보기가 나옵니다.
- 카카오톡은 미리보기를 저장해 두므로, 바꾼 뒤에도 예전 모습이 보이면 [카카오 공유 디버거](https://developers.kakao.com/tool/debugger/sharing)에서 주소를 넣고 "캐시 초기화"를 누르세요.

## 그 밖의 수정

- **계좌(마음 전하실 곳)**: `js/config.js` 의 `accounts` 에 `{ who, bank, number }` 를 넣으면 복사 버튼과 함께 표시됩니다. 지금은 비어 있어 "준비되면 표시" 안내만 보입니다.
- **예식장 전화번호**: `venue.tel`(보이는 글자), `venue.telLink`(실제로 걸리는 번호)
- **지도·주차 안내 이미지**: `images/map.jpg`, `images/parking.jpg` 를 같은 이름으로 덮어쓰면 바뀝니다. 주차 안내를 빼려면 `venue.parkingImage: ''`.
- **오시는 방법(지하철·자가용·버스)**: `venue.transit` — 한 줄은 문자열, 작은 안내는 `{ note }`, 버스 노선처럼 앞에 분류를 붙이려면 `{ tag, text }`
- **초대 문구 / 마무리 문구**: `index.html` 의 `#invitation`, `.closing` 부분

## 현재 들어 있는 샘플 사진

`청첩장 메인 사진_261107_1.jpeg`(메인, 이 폴더에 있는 원본), `claude/보정2_흑백.jpg`(갤러리 01), `drive-download-…/` 의 1·11·3·12·8·13·4·5(보정) 사진(갤러리 02~09)을 웹용으로 줄인 사본입니다. 원본 파일은 수정하지 않았습니다.
