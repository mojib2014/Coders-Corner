
// var stofQuery = "https://api.stackexchange.com/2.2/search?order=desc&sort=activity&site=stackoverflow&tagged="
//     + tags + "&intitle=" + q;
// var mdnQuery = "https://developer.mozilla.org/en-US/search.json?locale=en-US&q=" + q + " " + tags; //ajax query url's

// $.ajax({
//     url: stofQuery,
//     method: "GET"
// }).then(function(response){
//     for (var i = 0; i < 5; i++) { //create variables for necessary items
//         var docTitle = response.items[i].title;
//         var docRating = "Rating: " + response.items[i].score;
//         var articleURL = "<a href='" + response.items[i].link + "'>"
//           + response.items[i].link + "<a>"; 
//           //need to append to page
//     }
// })

// $.ajax({
//     url: mdnQuery,
//     method: "GET"
// }).then(function(response){
//     for (var i = 0; i < 5; i++) {
//         var docTitle = response.documents[i].title;
//         var docExcerpt = "'" + response.documents[i].excerpt.substr(0, 150) + "...'";
//         var articleURL = "<a href='" + response.documents[i].url + "'>"
//           + response.documents[i].url + "<a>"; 
//           //need to append to page
//     }
// })
// Initialize Firebase
// var config = {
//    apiKey: "AIzaSyCQmBSNHXpcE_tizj6gp7rDoNxqXyOmgzU",
//    authDomain: "coders-corner-1525974035968.firebaseapp.com",
//    databaseURL: "https://coders-corner-1525974035968.firebaseio.com",
//    projectId: "coders-corner-1525974035968",
//    storageBucket: "",
//    messagingSenderId: "135660697800"
//  };
//  firebase.initializeApp(config);
//  var database = firebase.database();

var isStudent = 0;

$("#studentBtn").on("click", function(event){
    event.preventDefault();

    $(this).attr("class", "button btn-sm btn-success"); 
    $("#mentorBtn").attr("class", "button btn-sm btn-warning");
    isStudent = 1;
});

$("#mentorBtn").on("click", function(event){
    event.preventDefault();

    $(this).attr("class", "button btn-sm btn-success"); 
    $("#studentBtn").attr("class", "button btn-sm btn-warning");
    isStudent = -1;
});

$("#goBtn").on("click", function(event){
    event.preventDefault();

    var name = $("#name").val();
    var q = $("#textarea").val();
    var tags = $("#tags").val();

    // database.ref().push({
    //     name: name,
    //     tags: tags,
    //     problem: q,
    // })

    if (name == ""){ //if name is blank display error
        $("#card-body2").append("<div style='background-color: red; color:white;'>Please enter Name</div>")
    }
    else if (parseInt(isStudent) == 0){ //if role isn't selected display error
        $("#card-body2").append("<div style='background-color: red; color:white;'>Please select Student/Mentor</div>")
    }
    else if (isStudent == 1){ //Change main div to fit student
        $("#card-body2").empty();
    }  
    else { //Change main div to fit mentor
        $("#card-body2").empty();
    }
    
})

// animation circle
anime.timeline({loop: true})
  .add({
    targets: '.ml8 .circle-white',
    scale: [0, 3],
    opacity: [1, 0],
    easing: "easeInOutExpo",
    rotateZ: 360,
    duration: 1100
  }).add({
    targets: '.ml8 .circle-container',
    scale: [0, 1],
    duration: 1100,
    easing: "easeInOutExpo",
    offset: '-=1000'
  }).add({
    targets: '.ml8 .circle-dark',
    scale: [0, 1],
    duration: 1100,
    easing: "easeOutExpo",
    offset: '-=600'
  }).add({
    targets: '.ml8 .letters-left',
    scale: [0, 1],
    duration: 1200,
    offset: '-=550'
  }).add({
    targets: '.ml8 .bang',
    scale: [0, 1],
    rotateZ: [45, 15],
    duration: 1200,
    offset: '-=1000'
  }).add({
    targets: '.ml8',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1400
  });

anime({
  targets: '.ml8 .circle-dark-dashed',
  rotateZ: 360,
  duration: 8000,
  easing: "linear",
  loop: true
});
//end animation circle
// Wrap every letter in a span
$('.ml1 .letters').each(function(){
    $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
  });
  
  anime.timeline({loop: true})
    .add({
      targets: '.ml1 .letter',
      scale: [0.3,1],
      opacity: [0,1],
      translateZ: 0,
      easing: "easeOutExpo",
      duration: 600,
      delay: function(el, i) {
        return 70 * (i+1)
      }
    }).add({
      targets: '.ml1 .line',
      scaleX: [0,1],
      opacity: [0.5,1],
      easing: "easeOutExpo",
      duration: 700,
      offset: '-=875',
      delay: function(el, i, l) {
        return 80 * (l - i);
      }
    }).add({
      targets: '.ml1',
      opacity: 0,
      duration: 1000,
      easing: "easeOutExpo",
      delay: 1000
    });
//end line effect

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCQmBSNHXpcE_tizj6gp7rDoNxqXyOmgzU",
    authDomain: "coders-corner-1525974035968.firebaseapp.com",
    databaseURL: "https://coders-corner-1525974035968.firebaseio.com",
    projectId: "coders-corner-1525974035968",
    storageBucket: "",
    messagingSenderId: "135660697800"
  };
  firebase.initializeApp(config);
  var database = firebase.database();


// ConnectionsRef refrences a specific location in our database.
// All of our connections will be stored in this directory.
var connectionsRef = database.ref("/connections");

// .info/connected is a special location provided by firebase that is updated
// every time the client's connection state changes.
var connectedRef = database.ref(".info/connected");

// When the client's connection state changes.
connectedRef.on("value", function(snap){

    // if they are connected..
    if (snap.val()) {

        // Add user to the connections list.
        var con = connectionsRef.push(true);

        // Remove user from the connection list when they disconnect.
        con.onDisconnect().remove();
    }
});

// When first loaded or when the connections list changes.
connectionsRef.on("value", function(snap){

    // Display the users count in the html.
    // The number of online users in the number of children in the connections list.
    $("#status").text(snap.numChildren());
    console.log(snap.numChildren);

});


// button for adding users
$("#submitBtn").on("click", function(event){
    event.preventDefault();
     
    // Grabs user input
    var studentName = $("#nameInput").val().trim();
    var isStudent = $("#studentBtn").val().trim();
    var isMentor = $("#mentorBtn").val().trim();
    var userTag = $("#tagInput").val().trim();
    var comment = $("#textInput").val().trim();

    // Creates local "temporary" object for holding users data.
    var newUser = {
        name: studentName,
        student: isStudent,
        mentor: isMentor,
        tags: userTag,
        message: comment
    }

    // Uploads users data to the database
    database.ref().push(newUser);

    // Clear all of the text-boxes 
    $("#nameInput").val("");
    $("#studentBtn").val("");
    $("#mentorBtn").val("");
    $("#tagInput").val("");
    $("#textInput").val("");
});

// Creating firebase event for adding users to the database
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    // Storing everything into a variable
    var studentName = childSnapshot.val().name;
    var isStudent = childSnapshot.val().student;
    var isMentor = childSnapshot.val().mentor;
    var userTag = childSnapshot.val().tags;
    var comment = childSnapshot.val().message;
    $("#status").append(newUser);
});


