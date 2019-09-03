'use strict';

var cacheVersion = 3;
var currentCache = {
  offline: 'offline-cache' + cacheVersion
};
const offlineUrl = '/offline.html';

this.addEventListener('install', event => {
  event.waitUntil(
    caches.open(currentCache.offline).then(function(cache) {
      return cache.addAll([
          offlineUrl
      ]);
    }) 
  );
});

// this.addEventListener('fetch', event => {
//     // request.mode = navigate isn't supported in all browsers
//     // so include a check for Accept: text/html header.
//     if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
//           event.respondWith(
//             fetch(event.request.url).catch(error => {
//                 // Return the offline page
//                 return caches.match(offlineUrl);
//             })
//       );
//     }
//     else{
//           // Respond with everything else if we can
//           event.respondWith(caches.match(event.request)
//                           .then(function (response) {
//                           return response || fetch(event.request);
//                       })
//               );
//         }
//   });

this.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;     // if valid response is found in cache return it
        } else {
          return fetch(event.request)     //fetch from internet
            .then(function(res) {
              return caches.open(CACHE_DYNAMIC_NAME)
                .then(function(cache) {
                  cache.put(event.request.url, res.clone());    //save the response for future
                  return res;   // return the fetched data
                })
            })
            .catch(function(err) {       // fallback mechanism
              // return caches.open(CACHE_CONTAINING_ERROR_MESSAGES)
              //   .then(function(cache) {
                  return cache.match(offlineUrl);
                // });
            });
        }
      })
  );
});  


//   caches.keys().then(function(names) {
//     for (let name of names)
//         console.log(name);
//         caches.delete(name);
// })

// caches.delete(/*name*/);