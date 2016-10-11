'use strict';

importScripts('serviceworker-cache-polyfill.js');

// INSTALL EVENT:
// Called only once, when browser sees this version of Service Worker
// for the first time
self.addEventListener('install', function(event){
	console.info('[SUCCESS] Service Worker Installed');

	event.waitUntil(
		// Opens a new cache
		caches.open('cache_sw_horse').then(function(cache){
			console.info('[SUCCESS] Loading into Cache');
			return cache.addAll([

				// Load this array into cache
				'/',
				"/index.html",
				'style.css',
				'img/AD.png',
				'https://www.scienceabc.com/wp-content/uploads/2016/05/horse-running.jpg'
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

	// DEFINE RULES:

	// RULE #1 - FETCH FROM NETWORK

	// event.respondWith(
	//
	// 	// Fetch from Network:
	// 	fetch(event.request).then(function(response){
	// 		console.log('[NETWORK] Fetched from Internet');
	// 		return response;
	// 	}).catch(function(){
	//
	// 		// Log message and return custom response:
	// 		console.log('[OFFLINE] Unable to fetch the request from Internet');
	// 		return new Response('Unable to fetch from Internet');
	// 	})
	// );

	// RULE #2 - FETCH FROM CACHE

	// event.respondWith(
	//
	// 	//Fetch from Cache:
	// 	caches.match(event.request).then(function(response){
	// 		 console.log('[CACHE] Reading from Cache');
	// 		 return response;
	// 	}).catch(function(){
	// 		 // Respond Offline:
	// 		 console.log('[OFFLINE] Unable to fetch from cache');
	// 		 return new Response('Unable to fetch from Cache');
	// 	})
	// );

	// RULE #3 - FETCH FROM CACHE/INTERNET/OFFLINE
	event.respondWith(

		//Fetch from Cache/Network:
		caches.match(event.request).then(function(response){
			 console.log('[CACHE/NETWORK] Reading from Cache/Internet');
			 return response || fetch(event.request);
		}).catch(function(){
			 // Respond Offline:
			 console.log('[OFFLINE] Unable to fetch from cache');
			 return new Response('Unable to fetch from Cache');
		})
	);
});
