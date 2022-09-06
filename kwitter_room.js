var firebaseConfig = {
  apiKey: "AIzaSyBJ2OV3CrdkrIQ0ZxnDzWN9uQXQ426z24A",
  authDomain: "kwitter-a20cb.firebaseapp.com",
  databaseURL: "https://kwitter-a20cb-default-rtdb.firebaseio.com",
  projectId: "kwitter-a20cb",
  storageBucket: "kwitter-a20cb.appspot.com",
  messagingSenderId: "616826762715",
  appId: "1:616826762715:web:49ec6a5b1789a23ab4a3fe"
};

firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

function addRoom() {
  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({
    purpose: "adding room name"
  });

  localStorage.setItem("room_name", room_name);

  window.location = "kwitter_page.html";
}

function getData() {
  firebase.database().ref("/").on('value', function (snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      Room_names = childKey;

      console.log("Room Name - " + Room_names);
      row = "<div class = 'room_name' id = " + Room_names + " onclick = 'redirectToRoomName(this.id)'> #" + Room_names + "</div> <hr>";
      document.getElementById("output").innerHTML += row;
    });
  });

}

getData();

function redirectToRoomName(name) {
  console.log(name);
  localStorage.setItem("room_name", name);
  window.location = "kwitter_page.html";
}

function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "kwitter_login.html";
}