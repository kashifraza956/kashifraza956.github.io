const localVideo = document.getElementById("localVideo");
const remoteVideo = document.getElementById("remoteVideo");
var getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia;
const peerType = prompt("Please Tell who you are");
if (peerType == 1) {
  // Peer 1

  var peer = new Peer();
  console.log({ peer });
  peer.on("open", function (id) {
    console.log("My peer ID is: " + id);
  });

  const peer2Id = prompt("Enter Peer 2 Id To Call.");
  console.log({ peer2Id });
  if (!peer2Id) console.log("Peer 2 ID is not found");
  var conn = peer.connect(peer2Id);
  conn.on("open", function () {
    debugger;
    // Receive messages
    conn.on("data", function (data) {
      console.log("Received", data);
    });

    // Send messages
    conn.send("Hello!");
  });

  getUserMedia(
    { video: true, audio: true },
    function (stream) {
      var call = peer.call(peer2Id, stream);
      console.log({ stream });
      localVideo.srcObject = stream;
      call.on("stream", function (remoteStream) {
        console.log({ remoteStream });
        remoteVideo.srcObject = remoteStream;
        // Show stream in some video/canvas element.
      });
    },
    function (err) {
      console.log("Failed to get local stream", err);
    }
  );
} else if (peerType == 2) {
  // Peer 2
  var peer2 = new Peer();
  console.log({ peer2 });
  peer2.on("open", function (id) {
    console.log("My peer2 ID is: " + id);
  });

  peer2.on("connection", function (conn) {
    conn.on("open", function () {
      debugger;

      // Receive messages
      conn.on("data", function (data) {
        console.log("Received2", data);
      });

      // Send messages
      conn.send("Hello2!");
    });
  });

  peer2.on("call", function (call) {
    getUserMedia(
      { video: true, audio: true },
      function (stream2) {
        console.log({ stream2 });
        localVideo.srcObject = stream2;

        call.answer(stream2); // Answer the call with an A/V stream.
        call.on("stream", function (remoteStream2) {
          console.log({ remoteStream2 });
          remoteVideo.srcObject = remoteStream2;

          // Show stream in some video/canvas element.
        });
      },
      function (err) {
        console.log("Failed to get local stream", err);
      }
    );
  });
}
