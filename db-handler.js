;(function() {
   var db;

   initIndexedDb();
   
   function initIndexedDb() {
      var openDbRequest = indexedDB.open('app', 1)

      // when the connection to db works?
      openDbRequest.onsuccess = function(e) {
         db = e.target.result;
      };

      // when db is first created, or version bumped? 
      openDbRequest.onupgradeneeded = function(e) {
         console.log('Upgrading');

         var thisDb = e.target.result;

         if ( !thisDb.objectStoreNames.contains('images') ) {
            thisDb.createObjectStore('images', { autoIncrement: true });
         }
      };

      openDbRequest.onerror = function(e) {};
   } // end of initIndexedDb)

   window.addImage = addImage;
   function addImage(arrayBuffer) {
      var transaction = db.transaction(['images'], 'readwrite');
      var store = transaction.objectStore('images');
      var request = store.put( arrayBuffer );

      request.onsuccess = function() {
         console.log('Image added');
      };

      request.onerror = function() {
         console.log('Something failed', arguments);
      };
   }

   window.getImages = getImages;
   function getImages(cb) {
      var transaction = db.transaction(['images'], 'readonly');
      var store = transaction.objectStore('images');

      var cursor = store.openCursor(); 

      cursor.onsuccess = function(e) {
         var URL = window.URL || window.webkitURL;

         var addedImagesUl = document.getElementById('added-images');
         var li = document.createElement('li');
         var result = e.target.result;

         if (result) {
            var blob = new Blob([ result.value ], { type: 'image/jpeg' });

            var imgURL = URL.createObjectURL( blob );

            var img = document.createElement('img');
            img.setAttribute('src', imgURL);
            li.appendChild( img );
            addedImagesUl.appendChild(li)

            result.continue();
         }
      };
   }
})();
