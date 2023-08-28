//LINKS FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyD-phAFsn3fne3zyOjM1212pkBZ2UYUwZA",
  authDomain: "kwiterr-61877.firebaseapp.com",
  databaseURL: "https://kwiterr-61877-default-rtdb.firebaseio.com",
  projectId: "kwiterr-61877",
  storageBucket: "kwiterr-61877.appspot.com",
  messagingSenderId: "837242004146",
  appId: "1:837242004146:web:c950f9605b1bd129921fab"
};

firebase.initializeApp(firebaseConfig);
userName = localStorage.getItem("userName");
roomName = localStorage.getItem("roomName");
function send() {
  msg = document.getElementById("msg").value;
  firebase.database().ref(roomName).push({
    name: userName,
    message: msg,
    like: 0
  });

  document.getElementById("msg").value = "";
}
function getData() {
  firebase.database().ref("/" + roomName).on('value', function (snapshot) {
    document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
        firebaseMessageId = childKey;
        messageData = childData;
        //Início do código
        console.log(firebaseMessageId);
        console.log(messageData);
        name = messageData['name'];
        message = messageData['message'];
        like = messageData['like'];
        nameWithTag = "<h4>" + name + "<img class='usser_tick' src='tick.png'></h4>";
        messageWithTag = "<h4 class=message_h4>" + message + "</h4>";
        likeButton = "<button class='btn btn-warning' id=" + firebaseMessageId + " value=" + like + "onclick='uptadeLike(this.id)'";
        spanWithTag = "<span class='glyphicon glyficon-thups-up'>Like: " + like + "</span></button><hr>";

        row = nameWithTag + messageWithTag + likeButton + spanWithTag;
        document.getElementById("output").innerHTML += row;
        //Fim do código
      }
    });
  });
}
getData();
function uptadeLike(messageId) {
  console.log("botao like pressionado - " + messageId);
  button_id = messageId;
  likes = document.getElementById(button_id).value;
  uptadeLikes = Number(likes) + 1;
  console.log(uptadeLikes);

  firebase.database().ref(roonName).child(messageId).uptade({
    like: uptadeLikes
  });
}
function logout() {
  localStorage.removeItem("userName");
  localStorage.removeItem("roomName");
  window.location.replace("index.html");
}