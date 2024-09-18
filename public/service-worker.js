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
        // 캐시에서 찾으면 반환하고, 그렇지 않으면 네트워크 요청
        return response || fetch(event.request).catch(() => {
          // 네트워크 요청이 실패할 경우 기본적으로 캐시된 자원을 반환
          console.error('네트워크 요청 실패:', event.request.url);
          throw new Error('네트워크 요청 실패');
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