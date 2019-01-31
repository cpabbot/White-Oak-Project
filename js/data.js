firebase.initializeApp({
    apiKey: "AIzaSyAfCEXbP5KwmHJAAWzgj7TSSQNNVrgOYv0",
    authDomain: "white-oak-project.firebaseapp.com",
    projectId: "white-oak-project"
});


// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
var photosRef = db.collection("photos");

//var i = 0;
//
//photosRef.doc(index).set({
//    name: "San Francisco", state: "CA", country: "USA",
//    capital: false, population: 860000 });


photosRef.add({
    timestamp: "06/13/2001",
    name: "a beautiful tree",
    url: 1815
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});