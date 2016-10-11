'use strict';

importScripts('serviceworker-cache-polyfill.js');

// INSTALL EVENT:
// Called only once, when browser sees this version of Service Worker
// for the first time
self.addEventListener('install', function(event){
	console.info('[SUCCESS] Service Worker Installed');

	event.waitUntil(
		// Opens a new cache
		caches.open('cache_sw_root_1').then(function(cache){
			console.info('[SUCCESS] Loading into Cache');
			return cache.addAll([

				// Load this array into cache
				'/',
				'style.css',
				'img/AD.png',
				'https://fonts.gstatic.com/s/roboto/v15/2UX7WLTfW3W8TclTUvlFyQ.woff',
				new Request('https://farm6.staticflickr.com/5594/14749918329_888df4f2ef.jpg')
			]);
		}).catch(function(){
			console.info('[FAILURE] Loading Cache');
		})
	);
});


// ACTIVATE EVENT:
// Activate the Service Worker
self.addEventListener('activate', function(event){

	console.info('[SUCCESS] Service Worker Activated');

});


// FETCH EVENT:
// Fires up when Service Worker encounters a fetch request
self.addEventListener('fetch', function(event){
	console.info('[FETCH] ' + event.request.url);

	// Fetching from Cache:
	event.respondWith(
	    caches.match(event.request).then(function(response){

	       //Check if you get the match in the cache - return as such, else fetch from the network
	       return response || fetch(event.request);
	    })
	);
});
