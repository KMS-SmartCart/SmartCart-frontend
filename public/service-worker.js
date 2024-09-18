const CACHE_NAME = 'smartcart-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/manifest.json',
  '/carticon128.png',
  '/carticon192.png',
  '/carticon512.png',
  '/linkthumbnail.png'
];

// 서비스 워커 설치 및 파일 캐싱
/* eslint-disable no-restricted-globals */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 캐시에서 파일 가져오기
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // 캐시에서 찾은 경우 반환
        }

        return fetch(event.request).then(networkResponse => {
          // 네트워크 요청이 성공하면 캐시에 저장
          if (networkResponse.status === 404) {
            console.log("서비스워커 캐시 - 404")
            return caches.match('/index.html'); // 404일 경우 기본 페이지 반환
          }
          return networkResponse;
        }).catch(() => {
          // 네트워크 요청이 실패할 경우 기본 페이지를 반환
          console.log("서비스워커 실패 - ERROR");
          return caches.match('/index.html');
        });
      })
  );
});

// 오래된 캐시 삭제
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (!cacheWhitelist.includes(key)) {
          return caches.delete(key);
        }
      }));
    })
  );
});