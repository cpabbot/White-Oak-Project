var selectedFile;

$(document).ready(function() {
    $(".upload-submit").hide();
//    $(".upload-btn").cloudinary_upload_widget({
//        cloud_name: 'cpabbot', upload_preset: 'avynotor', multiple: false, cropping: 'server', folder: 'user_photos', button_caption: "Upload", thumnails: '.hidden', stylesheet: 'http://127.0.0.1:59538/css/upload-theme.css' },
//    function(error, result) { console.log(error, result) });
});

$(".upload-input").on("change", function(event) {
    selectedFile = event.target.files[0];
    $(".upload-submit").show();
})

function uploadFile() {
    var fileName = selectedFile.name;
    var storageRef = firebase.storage().ref("/trees/" + fileName);
    var uploadTask = storageRef.put(selectedFile);
    
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', function(snapshot){
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
    case firebase.storage.TaskState.PAUSED: // or 'paused'
      console.log('Upload is paused');
      break;
    case firebase.storage.TaskState.RUNNING: // or 'running'
      console.log('Upload is running');
      break;
    }
    }, function(error) {
    // Handle unsuccessful uploads
    }, function() {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
    console.log('File available at', downloadURL);
    });
    });
}