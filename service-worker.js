// INSTALL EVENT:
// Called only once, when browser sees this version of Service Worker
// for the first time
self.addEventListener('install', function(event){
	console.info('[SUCCESS] Service Worker Installed');
	
	event.waitUntil(

		// Opens a new cache
		caches.open('cache_v1').then(function(cache){
			return cache.addAll([

				// Load this array into cache
				'/'
				
			]);
		})
	);
});


// ACTIVATE EVENT:
// Activate the Service Worker
self.addEventListener('activate', function(event){

	console.info('[SUCCESS] Service Worker Activated');

});

self.addEventListener('fetch', function(event){
	console.info('[FETCH] ' + event.request.url);
	
	event.respondWith(
		// Fetch from Network:
	    fetch(event.request).then(function(response){

	      // User is Online but wrong URL and page not found
	      if(response.status === 404){

	        // Page Not Found - Return Custom Error Message:
	        return new Response('Whooops! You\'re looking for something that doesn\'t exist here.');

	      }

	      // User is Online, so return the response
	      return response;

	    }).catch(function(){

	      // User is Offline - Return custom Response
	      return new Response('You seem to be offline!');

	    })
	);
});