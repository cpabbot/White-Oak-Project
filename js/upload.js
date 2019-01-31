var fileRef;

document.getElementById("upload_widget_opener").addEventListener("click", function() {
    cloudinary.openUploadWidget({ cloud_name: 'whiteoakproject', upload_preset: 'whiteoakprojectpreset', folder: 'tree registry', stylesheet: 'http://127.0.0.1:65289/css/upload-theme.css'}, 
      function(error, data) {
//        console.log("file uploaded successfully", error, data);
//        console.log(data.secure_url);
//        console.log(data.0);
        
//        http://cameronabbot.ml/white-oak/css/upload-theme.css
    });
  }, false);

$(document).on('cloudinarywidgetfileuploadsuccess', function(e, data) {
    console.log("Single file success", e, data);
    fileRef = data.secure_url;
    console.log(fileRef);
    upload(fileRef);
});

function upload(fileRef) {
    // Initialize Cloud Firestore through Firebase
    var db = firebase.firestore();
    var photosRef = db.collection("photos");
    
    photosRef.add({
        timestamp: "06/13/2001",
        name: "a beautiful tree",
        url: fileRef,
        retrieve: true
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}



//$(document).ready(function() {
//    
//    $(".upload-btn").cloudinary_upload_widget({
//        cloud_name: 'whiteoakproject', upload_preset: 'whiteoakprojectpreset', multiple: true, cropping: 'server', folder: 'user_photos', button_caption: "Upload", thumnails: '.hidden', stylesheet: 'http://127.0.0.1:59538/css/upload-theme.css' },
//    function(error, result) { console.log(error, result) });
//    
//});