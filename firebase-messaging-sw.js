importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBbsa1G4H9DlJ6GK6aNy4izJSiQ3EWqHK4",
  authDomain: "farmapaz-despachos.firebaseapp.com",
  projectId: "farmapaz-despachos",
  storageBucket: "farmapaz-despachos.firebasestorage.app",
  messagingSenderId: "3879404311",
  appId: "1:3879404311:web:5d9ca356a8161d2f24ad52"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const title = payload.notification?.title || 'Nuevo pedido Farmapaz';
  const body  = payload.notification?.body  || 'Tienes un pedido asignado';
  self.registration.showNotification(title, {
    body, icon: '/icon-192.png', badge: '/icon-192.png',
    vibrate: [300, 100, 300, 100, 500],
    requireInteraction: true, tag: 'farmapaz-pedido', renotify: true
  });
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(list) {
      for (const c of list) {
        if (c.url.includes('/piloto') && 'focus' in c) return c.focus();
      }
      if (clients.openWindow) return clients.openWindow('/piloto');
    })
  );
});
