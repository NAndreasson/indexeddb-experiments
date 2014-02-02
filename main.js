;(function() {

   document.getElementById('get-images-btn').addEventListener('click', getImages);

   var dropFileArea = document.getElementById('drop-file-area');

   dropFileArea.addEventListener('dragover', function(e) {
      e.preventDefault();
   });

   dropFileArea.addEventListener('drop', function(e) {
      e.preventDefault();

      var filereader = new FileReader();

      filereader.onload = function(e) {
         var arrayBuffer = filereader.result;

         addImage( arrayBuffer );
      };

      var files = e.dataTransfer.files;

      for (var i = 0; i < files.length; i++) {
         filereader.readAsArrayBuffer( files[i] );
         console.log('File', files[i]);
      }
   });
})();
