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

// Manejar notificaciones cuando la app está en background
messaging.onBackgroundMessage(function(payload) {
  console.log('Notificación en background:', payload);
  const { title, body, icon } = payload.notification;
  self.registration.showNotification(title, {
    body,
    icon: icon || '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [200, 100, 200],
    data: payload.data,
    actions: [
      { action: 'ver', title: '👀 Ver pedido' }
    ]
  });
});

// Click en la notificación
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});
