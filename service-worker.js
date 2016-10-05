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