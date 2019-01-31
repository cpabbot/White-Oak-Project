var db = firebase.firestore();
var photosRef = db.collection("photos");
var index;


db.collection("photos").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        var url = doc.data().url;
        console.log(url);
        displayImage(url);
    });
});

function displayImage(url) {
    var img = $('<img />', { 
      id: index,
      src: url,
      alt: 'tree',
        width: 200
    });
    img.appendTo($('.photos-container'));
}


//db.collection("photos").where("retrieve", "==", true)
//.get()
//.then(function(querySnapshot) {
//    querySnapshot.forEach(function(doc) {
//        console.log(doc.id, " => ", doc.data());
//    });
//})
//.catch(function(error) {
//    console.log("Error getting documents: ", error);
//});