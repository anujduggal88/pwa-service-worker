'use strict';

importScripts('../serviceworker-cache-polyfill.js');

// INSTALL SERVICE WORKER:
self.addEventListener('install', function(event){
	console.info('[SUCCESS] service-worker-cat installed', + event);

	event.waitUntil(

		// Opens a new cache
		caches.open('cache_sw_root_cat').then(function(cache){
			console.info('[SUCCESS] Loading Cache');
			return cache.addAll([

				// Load this array into cache
				'/',
				'../style.css',
				new Request('https://farm6.staticflickr.com/5594/14749918329_888df4f2ef.jpg')
			]);
		}).catch(function(){
			console.info('[FAILURE] Loading Cache');
		})
	);
});

// ACTIVATE SERVICE WORKER:
self.addEventListener('activate', function(event){
	console.info('[SUCCESS] service-worker-cat activated', + event);
});

// FETCH EVENT:
self.addEventListener('fetch', function(event){
	console.info('[FETCH] ' + event.request.url);

	// event.respondWith(

	//     // Fetch from Network:
	//     fetch(event.request).then(function(response){

	//       // User is Online but wrong URL and page not found
	//       if(response.status === 404){

	//         // Page Not Found - Return Custom Error Message:
	//         return new Response('Whooops! You\'re looking for something that doesn\'t exist here.');

	//       }

	//       // User is Online, so return the response
	//       return response;

	//     }).catch(function(){

	//       // User is Offline - Return custom Response
	//       return new Response('You seem to be offline!');

	//     })
 //  	);

	// Fetching from Cache:
	event.respondWith(
	    caches.match(event.request).then(function(response){

	       //Check if you get the match in the cache - return as such, else fetch from the network
	       if(response) return response;

	       //return from Network if no match from Cache
	       return fetch(event.request);
	    })
	);
});
