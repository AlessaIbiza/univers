const SHELL="karma-le-film-shell-v2",FILM="karma-le-film-film-v1",FILES=["./","index.html","cover.jpg","fond.jpg","poster.jpg","icon-192.png","manifest.json","hls.min.js","../fonts/grandcentral.woff"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(SHELL).then(c=>c.addAll(FILES)).catch(()=>{}));self.skipWaiting()});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n.startsWith("karma-le-film-shell")&&n!==SHELL).map(n=>caches.delete(n)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(e.request.method!=="GET")return;
 // Le film gardé : la liste et les morceaux viennent de la mémoire du téléphone, sans réseau
 if(/\/media\/karma-le-film\/.+\.(m3u8|ts)$/.test(u.pathname)){const k=u.origin+u.pathname;
  e.respondWith(caches.open(FILM).then(c=>c.match(k)).then(r=>r||fetch(e.request)));return}
 if(u.origin!==location.origin||/\.(mp3|m4a|mp4)$/.test(u.pathname))return;
 e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(SHELL).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request)))});
