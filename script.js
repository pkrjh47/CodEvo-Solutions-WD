const localVideo = document.getElementById('local-video');
const remoteVideo = document.getElementById('remote-video');
const startButton = document.getElementById('start-button');

let localStream;
let remoteStream;
let peerConnection;

// ICE server configuration
const iceServers = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' }, // STUN server
    ]
};

// Start call button event listener
startButton.onclick = async () => {
    // Get user media (video and audio)
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideo.srcObject = localStream;

    // Create peer connection
    peerConnection = new RTCPeerConnection(iceServers);

    // Add local stream tracks to peer connection
    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

    // Listen for remote track event
    peerConnection.ontrack = (event) => {
        remoteStream = event.streams[0];
        remoteVideo.srcObject = remoteStream;
    };

    // Create offer and set local description
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    // Here, you would send the offer to the remote peer (skipped for simplicity)
    console.log('Offer created and set as local description:', offer);
};
