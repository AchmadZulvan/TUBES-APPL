// Service Worker untuk Lapor Mangan! PWA
// NOTE: Project ini berjalan di GitHub Pages (sub-path), jadi semua URL asset
// harus disusun berdasarkan scope service worker agar cache tidak salah alamat.

const SW_VERSION = '1.0.3';
const CACHE_NAME = `lapor-mangan-v${SW_VERSION}`;

const SCOPE_BASE = new URL(self.registration.scope);
const scopedUrl = (path) => new URL(String(path || '').replace(/^\//, ''), SCOPE_BASE).toString();

const OFFLINE_URL = scopedUrl('offline.html');

// File yang akan di-cache untuk offline access
const ASSETS_TO_CACHE = [
    scopedUrl(''),
    scopedUrl('index.html'),
    scopedUrl('style.css'),
    scopedUrl('script.js'),
    scopedUrl('chatbot.js'),
    scopedUrl('knowledge-base.js'),
    scopedUrl('manifest.json'),
    OFFLINE_URL,
    // External resources
    'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap',
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
    console.log('[ServiceWorker] Installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[ServiceWorker] Caching app shell');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => {
                console.log('[ServiceWorker] Installed successfully');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('[ServiceWorker] Install failed:', error);
            })
    );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
    console.log('[ServiceWorker] Activating...');
    
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[ServiceWorker] Removing old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('[ServiceWorker] Activated successfully');
            return self.clients.claim();
        })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') return;
    
    // Skip chrome-extension and other non-http requests
    if (!event.request.url.startsWith('http')) return;

    const request = event.request;
    const isNavigation = request.mode === 'navigate' || request.destination === 'document';

    // Network-first untuk dokumen (HTML) agar perubahan UI (mis. tombol +) tidak "nyangkut" di cache.
    if (isNavigation) {
        event.respondWith(
            (async () => {
                try {
                    const response = await fetch(request);
                    if (response && response.status === 200) {
                        const cache = await caches.open(CACHE_NAME);
                        cache.put(request, response.clone());
                    }
                    return response;
                } catch {
                    const cached = await caches.match(request);
                    return cached || caches.match(OFFLINE_URL);
                }
            })()
        );
        return;
    }
    
    event.respondWith(
        caches.match(request)
            .then((cachedResponse) => {
                // Return cached version if available
                if (cachedResponse) {
                    // Fetch updated version in background
                    fetchAndUpdate(request);
                    return cachedResponse;
                }
                
                // Otherwise fetch from network
                return fetchAndCache(request);
            })
            .catch(() => {
                // If both cache and network fail, show offline page
                if (request.mode === 'navigate') {
                    return caches.match(OFFLINE_URL);
                }
                
                // For images, return placeholder
                if (request.destination === 'image') {
                    return new Response(
                        '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><text x="50%" y="50%" text-anchor="middle" fill="#999">Offline</text></svg>',
                        { headers: { 'Content-Type': 'image/svg+xml' } }
                    );
                }
                
                return new Response('Offline', { status: 503 });
            })
    );
});

// Fetch and cache new resources
async function fetchAndCache(request) {
    try {
        const response = await fetch(request);
        
        // Only cache successful responses
        if (response.status === 200) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, response.clone());
        }
        
        return response;
    } catch (error) {
        throw error;
    }
}

// Fetch and update cache in background
async function fetchAndUpdate(request) {
    try {
        const response = await fetch(request);
        
        if (response.status === 200) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, response.clone());
        }
    } catch (error) {
        // Silently fail - user will see cached version
        console.log('[ServiceWorker] Background update failed:', error);
    }
}

// Handle push notifications
self.addEventListener('push', (event) => {
    console.log('[ServiceWorker] Push received');
    
    const data = event.data ? event.data.json() : {};
    const title = data.title || 'Lapor Mangan!';
    const options = {
        body: data.body || 'Ada update kuliner baru!',
        icon: '/icons/icon-192.png',
        badge: '/icons/badge-72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: data.primaryKey || 1
        },
        actions: [
            { action: 'explore', title: 'Lihat Sekarang', icon: '/icons/checkmark.png' },
            { action: 'close', title: 'Tutup', icon: '/icons/xmark.png' }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    console.log('[ServiceWorker] Notification clicked');
    
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Handle background sync
self.addEventListener('sync', (event) => {
    console.log('[ServiceWorker] Sync event:', event.tag);
    
    if (event.tag === 'sync-reviews') {
        event.waitUntil(syncReviews());
    }
    
    if (event.tag === 'sync-favorites') {
        event.waitUntil(syncFavorites());
    }
});

// Sync pending reviews when online
async function syncReviews() {
    try {
        const pendingReviews = await getPendingReviews();
        
        for (const review of pendingReviews) {
            // In real app, send to server
            console.log('[ServiceWorker] Syncing review:', review);
        }
        
        // Clear pending reviews after sync
        await clearPendingReviews();
        
        console.log('[ServiceWorker] Reviews synced successfully');
    } catch (error) {
        console.error('[ServiceWorker] Review sync failed:', error);
    }
}

// Sync favorites when online
async function syncFavorites() {
    try {
        console.log('[ServiceWorker] Syncing favorites...');
        // In real app, sync with server
    } catch (error) {
        console.error('[ServiceWorker] Favorites sync failed:', error);
    }
}

// Helper functions for IndexedDB operations
async function getPendingReviews() {
    // Placeholder - in real app, read from IndexedDB
    return [];
}

async function clearPendingReviews() {
    // Placeholder - in real app, clear IndexedDB
    return true;
}

// Log service worker status
console.log('[ServiceWorker] Script loaded');
