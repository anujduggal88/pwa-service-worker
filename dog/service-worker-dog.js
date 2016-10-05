'use strict';

importScripts('../serviceworker-cache-polyfill.js');

// INSTALL SERVICE WORKER:
self.addEventListener('install', function(event){
	console.info('[SUCCESS] service-worker-dog installed', + event);
});

// ACTIVATE SERVICE WORKER:
self.addEventListener('activate', function(event){
	console.info('[SUCCESS] service-worker-dog activated', + event);
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