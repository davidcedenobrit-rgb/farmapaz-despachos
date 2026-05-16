self.addEventListener('push', event => {
  const data = event.data?.json() || {};
  event.waitUntil(
    self.registration.showNotification(data.title || '🏍️ Farmapaz', {
      body: data.body || 'Tienes un nuevo pedido asignado',
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      data: { url: data.url || '/piloto' },
      requireInteraction: true,
      vibrate: [300, 100, 300, 100, 500],
      tag: 'nuevo-pedido',
      renotify: true
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      for (const client of list) {
        if (client.url.includes('/piloto')) return client.focus();
      }
      return clients.openWindow(event.notification.data?.url || '/piloto');
    })
  );
});
