/* 청첩장 동작 스크립트 — 내용 수정은 js/config.js 에서 하세요. */
(function () {
  'use strict';
  var C = window.WEDDING;
  var $ = function (id) { return document.getElementById(id); };
  var DOW_KO = ['일', '월', '화', '수', '목', '금', '토'];
  var DOW_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  document.documentElement.classList.add('js');

  var d = C.date;
  var when = new Date(d.year, d.month - 1, d.day, d.hour, d.minute);
  var dow = when.getDay();
  var h12 = d.hour % 12 || 12;
  var ampm = d.hour < 12 ? '오전' : '오후';
  var timeKo = ampm + ' ' + h12 + '시' + (d.minute ? ' ' + d.minute + '분' : '');
  var dateKo = d.year + '년 ' + d.month + '월 ' + d.day + '일 ' + DOW_KO[dow] + '요일';
  var pad = function (n) { return String(n).padStart(2, '0'); };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  var V = C.venue;
  var venueFull = V.name + ' ' + V.hall + (V.floor ? ' ' + V.floor : '');

  /* ---------- 메인 ---------- */
  $('heroDate').textContent = pad(d.month) + ' . ' + pad(d.day);
  $('mainPhoto').src = C.mainPhoto;
  if (C.mainPhotoFocus) $('mainPhoto').style.objectPosition = C.mainPhotoFocus;
  $('heroGroom').textContent = C.groom.nameKo;
  $('heroBride').textContent = C.bride.nameKo;
  $('heroNamesEn').textContent = C.groom.nameEn + '  &  ' + C.bride.nameEn;
  $('heroInfo').innerHTML = esc(dateKo + ' ' + timeKo) + '<br>' + esc(V.name + ' ' + V.hall);
  $('closingSign').textContent = C.groom.firstKo + ' & ' + C.bride.firstKo;

  /* ---------- 혼주 ---------- */
  function familyRow(p) {
    return '<span class="parents">' + esc(p.father) + '<span class="dot">·</span>' + esc(p.mother) +
      '</span><span class="rel">의 ' + esc(p.relation) + '</span><span class="name">' + esc(p.firstKo) + '</span>';
  }
  $('familyGroom').innerHTML = familyRow(C.groom);
  $('familyBride').innerHTML = familyRow(C.bride);

  /* ---------- 일시 · 달력 ---------- */
  $('whenTitle').textContent = dateKo + ' ' + timeKo;
  $('whenSub').textContent = d.year + '. ' + pad(d.month) + '. ' + pad(d.day) + ' ' +
    DOW_EN[dow].toUpperCase() + '  ·  ' + (d.hour < 12 ? 'AM ' : 'PM ') + h12 + ':' + pad(d.minute);

  (function calendar() {
    var first = new Date(d.year, d.month - 1, 1).getDay();
    var days = new Date(d.year, d.month, 0).getDate();
    var head = DOW_KO.map(function (w, i) {
      return '<span class="' + (i === 0 ? 'sun' : '') + '">' + w + '</span>';
    }).join('');
    var cells = '';
    for (var i = 0; i < first; i++) cells += '<span></span>';
    for (var n = 1; n <= days; n++) {
      var wd = (first + n - 1) % 7;
      var cls = [wd === 0 ? 'sun' : '', wd === 6 ? 'sat' : '', n === d.day ? 'day' : ''].join(' ').trim();
      cells += '<span class="' + cls + '"><i>' + n + '</i></span>';
    }
    $('calendar').innerHTML = '<div class="cal-head">' + head + '</div><div class="cal-grid">' + cells + '</div>';
  })();

  (function countdown() {
    var box = $('countdown');
    var out = {};
    box.querySelectorAll('b').forEach(function (b) { out[b.dataset.k] = b; });
    var couple = C.groom.firstKo + ', ' + C.bride.firstKo;
    function tick() {
      var diff = when - new Date();
      var msg;
      if (diff <= 0) {
        box.hidden = true;
        var sameDay = new Date().toDateString() === when.toDateString();
        msg = sameDay ? '오늘은 ' + couple + '의 결혼식 날입니다.' : couple + '의 결혼식에 와 주셔서 감사합니다.';
        $('ddayText').innerHTML = esc(msg);
        return false;
      }
      var s = Math.floor(diff / 1000);
      out.d.textContent = Math.floor(s / 86400);
      out.h.textContent = pad(Math.floor(s % 86400 / 3600));
      out.m.textContent = pad(Math.floor(s % 3600 / 60));
      out.s.textContent = pad(s % 60);
      var dday = Math.ceil(diff / 86400000);
      $('ddayText').innerHTML = esc(couple) + '의 결혼식이 <em>' + dday + '일</em> 남았습니다.';
      return true;
    }
    if (tick()) var t = setInterval(function () { if (!tick()) clearInterval(t); }, 1000);
  })();

  /* ---------- 갤러리 ---------- */
  var PAGE = 9;
  var shown = 0;
  var grid = $('galleryGrid');
  function thumbOf(path) {
    var slash = path.lastIndexOf('/');
    var name = path.slice(slash + 1).replace(/\.[^.]+$/, '.jpg');
    return path.slice(0, slash + 1) + 'thumb/' + name;
  }
  function addPhotos(count) {
    var end = Math.min(C.gallery.length, shown + count);
    for (; shown < end; shown++) {
      var b = document.createElement('button');
      b.type = 'button';
      b.dataset.i = shown;
      b.setAttribute('aria-label', '사진 ' + (shown + 1) + ' 크게 보기');
      var img = document.createElement('img');
      // 칸에는 작은 썸네일(gallery/thumb/같은이름.jpg)을 쓰고, 없으면 큰 사진으로 대신합니다.
      img.src = thumbOf(C.gallery[shown]);
      img.dataset.full = C.gallery[shown];
      img.onerror = function () {
        if (this.src.indexOf('/thumb/') !== -1) { this.onerror = null; this.src = this.dataset.full; }
      };
      img.alt = '';
      img.loading = 'lazy';
      img.decoding = 'async';
      b.appendChild(img);
      grid.appendChild(b);
    }
    $('galleryMore').hidden = shown >= C.gallery.length;
  }
  addPhotos(PAGE);
  $('galleryMore').addEventListener('click', function () { addPhotos(C.gallery.length); });
  if (!C.gallery.length) $('gallery').hidden = true;

  var lb = $('lightbox'), lbImg = $('lbImg'), cur = 0;
  function show(i) {
    cur = (i + C.gallery.length) % C.gallery.length;
    lbImg.src = C.gallery[cur];
    $('lbCount').textContent = (cur + 1) + ' / ' + C.gallery.length;
    // 옆 사진을 미리 받아 두어 넘길 때 바로 보이게 합니다.
    [cur + 1, cur - 1].forEach(function (j) {
      new Image().src = C.gallery[(j + C.gallery.length) % C.gallery.length];
    });
  }
  function openLb(i) { show(i); lb.hidden = false; document.body.style.overflow = 'hidden'; $('lbClose').focus(); }
  function closeLb() { lb.hidden = true; document.body.style.overflow = ''; }
  grid.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (b) openLb(+b.dataset.i);
  });
  $('lbClose').addEventListener('click', closeLb);
  $('lbPrev').addEventListener('click', function () { show(cur - 1); });
  $('lbNext').addEventListener('click', function () { show(cur + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') show(cur - 1);
    if (e.key === 'ArrowRight') show(cur + 1);
  });
  var x0 = null;
  lb.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) show(cur + (dx < 0 ? 1 : -1));
    x0 = null;
  });

  /* ---------- 오시는 길 ---------- */
  $('venueName').textContent = venueFull;
  $('venueAddr').textContent = V.addressKo;
  $('venueAddrEn').textContent = V.addressEn;
  $('copyAddr').addEventListener('click', function () {
    copy(V.addressKo + ' ' + V.name + ' ' + V.hall + ' ' + V.floor, '주소가 복사되었습니다.');
  });

  var q = encodeURIComponent(V.mapQuery);
  var naverUrl = 'https://map.naver.com/p/search/' + q;

  if (V.mapImage) {
    $('mapWrap').innerHTML = '<a href="' + naverUrl + '" target="_blank" rel="noopener" aria-label="네이버지도에서 크게 보기">' +
      '<img src="' + esc(V.mapImage) + '" alt="예식장 주변 지도 (양재역 9번 출구 옆 엘블레스)" loading="lazy"></a>';
  } else if (V.showMapPreview) {
    var f = document.createElement('iframe');
    f.title = '예식장 위치 지도';
    f.loading = 'lazy';
    f.referrerPolicy = 'no-referrer-when-downgrade';
    f.src = 'https://maps.google.com/maps?q=' + encodeURIComponent(V.addressKo.replace('서울시', '서울')) + '&z=16&hl=ko&output=embed';
    $('mapWrap').appendChild(f);
  }

  $('linkNaver').href = naverUrl;
  $('linkKakao').href = 'https://map.kakao.com/link/search/' + q;
  $('linkTmap').href = 'tmap://search?name=' + q;
  $('linkTmap').addEventListener('click', function () {
    // 티맵은 앱 전용 링크라 앱이 없으면 아무 일도 일어나지 않으므로 안내를 띄웁니다.
    var start = Date.now();
    setTimeout(function () {
      if (!document.hidden && Date.now() - start < 2500) toast('티맵 앱이 설치된 휴대폰에서 열 수 있어요.');
    }, 1500);
  });

  function transitLine(l) {
    if (typeof l === 'string') return '<p>' + esc(l) + '</p>';
    if (l.note) return '<p class="t-note">' + esc(l.note) + '</p>';
    return '<p class="t-route"><span class="t-tag">' + esc(l.tag) + '</span><span>' + esc(l.text) + '</span></p>';
  }
  var telRow = V.tel
    ? '<div><dt>전화</dt><dd><p><a class="t-tel" href="tel:' + esc(V.telLink || V.tel) + '">' + esc(V.tel) + '</a></p></dd></div>'
    : '';
  $('transit').innerHTML = telRow + V.transit.map(function (t) {
    return '<div><dt>' + esc(t.label) + '</dt><dd>' + t.lines.map(transitLine).join('') + '</dd></div>';
  }).join('');

  if (V.parkingImage) {
    $('parkingWrap').innerHTML = '<p class="parking-title">주차 안내</p>' +
      '<a href="' + esc(V.parkingImage) + '" target="_blank" rel="noopener" aria-label="주차 안내 이미지 크게 보기">' +
      '<img src="' + esc(V.parkingImage) + '" alt="주차 안내: 양재역 공영 주차장에 주차 후 옆 건물 스포타임 지하 1층 엘블레스로 이동" loading="lazy"></a>' +
      '<p class="parking-hint">이미지를 누르면 크게 볼 수 있습니다.</p>';
  }

  /* ---------- 마음 전하실 곳 ---------- */
  function accGroup(title, list) {
    var body = list.length
      ? list.map(function (a, i) {
          return '<div class="acc-item"><div>' + esc(a.who) + '<small>' + esc(a.bank) + ' ' + esc(a.number) +
            '</small></div><button class="btn-chip" type="button" data-acc="' + esc(a.bank + ' ' + a.number) + '">복사</button></div>';
        }).join('')
      : '<p class="acc-empty">계좌 정보가 준비되면 이곳에 표시됩니다.</p>';
    return '<details class="acc-group"><summary>' + title + '</summary>' + body + '</details>';
  }
  $('accounts').innerHTML = accGroup('신랑측에게', C.accounts.groom) + accGroup('신부측에게', C.accounts.bride);
  $('accounts').addEventListener('click', function (e) {
    var b = e.target.closest('[data-acc]');
    if (b) copy(b.dataset.acc, '계좌번호가 복사되었습니다.');
  });

  /* ---------- 공유 ---------- */
  $('shareBtn').addEventListener('click', function () {
    var data = { title: document.title, text: dateKo + ' ' + timeKo + ' · ' + V.name + ' ' + V.hall, url: location.href };
    if (navigator.share && /^https?:/.test(location.protocol)) {
      navigator.share(data).catch(function () {});
    } else {
      copy(location.href, '청첩장 링크가 복사되었습니다.');
    }
  });

  /* ---------- 유틸 ---------- */
  function copy(text, msg) {
    var done = function () { toast(msg); };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, function () { legacyCopy(text); done(); });
    } else { legacyCopy(text); done(); }
  }
  function legacyCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) { /* 무시 */ }
    document.body.removeChild(ta);
  }
  var toastTimer;
  function toast(msg) {
    var t = $('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, 2000);
  }

  /* ---------- 스크롤 등장 효과 ---------- */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }
})();
