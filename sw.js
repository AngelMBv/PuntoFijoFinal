// Estrategia 0: only net
//Estrategia 1: Only Cache
//Estrategia 2: 2 first cache then network
// Estrategia 3: first network then cache
self.addEventListener('install', e => {

    const imagenes = caches.open('newcache').then(cache => {
        cache.add('/'),
            cache.add('img/pf1.png'),
            cache.add('img/pf2.png'),
            cache.add('img/pf3.png'),
            cache.add('img/pf4.png'),
            cache.add('img/pf5.png'),
            cache.add('index.html'),
            cache.add('PuntoFijo.html'),
            cache.add('PuntoFijo2.html'),
            cache.add('nosotros.html'),
            cache.add('js/app.js'),
            cache.add('js/app2.js'),
            cache.add('style1.css'),
            cache.add('style2.css'),
            cache.add('sw.js'),
            cache.add('manifest.json'),
            cache.add('img/calculador.png')
            
    })
  });  
  
self.addEventListener("fetch", (event) => {
  const respuesta = fetch(event.request).then((newResp) => {
    caches.open("newcache").then((cache) => {
      cache.put(event.request, newResp);
    });
    return newResp.clone();
  }).catch(err=>{
    return caches.match(event.request); 
  })
  event.respondWith(respuesta);
  });