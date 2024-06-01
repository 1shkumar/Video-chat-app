const APP_ID = 'ca3dd76709dc48119e08ea1c39c109af';
let client = AgoraRTC.createClient({mode: 'rtc', codec: 'vp8'});

let localTracks = [];
let remoteUsers = {};

document.getElementById('join').onclick = async function () {
    const uid = Math.floor(Math.random() * 10000);
    const channelName = 'test';
    const token = await getToken(channelName, uid);

    client.join(APP_ID, channelName, token, uid, async () => {
        localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();
        const localPlayer = document.createElement('div');
        localPlayer.id = `player-${uid}`;
        localPlayer.className = 'video-player';
        document.getElementById('video-container').append(localPlayer);
        localTracks[1].play(`player-${uid}`);
        await client.publish(localTracks);
    });

    client.on('user-published', handleUserPublished);
    client.on('user-left', handleUserLeft);
};

document.getElementById('leave').onclick = async function () {
    for (let track of localTracks) {
        track.stop();
        track.close();
    }
    await client.leave();
    document.getElementById('video-container').innerHTML = '';
};

async function getToken(channelName, uid) {
    const response = await fetch(`/chat/get_agora_token?channelName=${channelName}&uid=${uid}&role=publisher`);
    const data = await response.json();
    return data.token;
}

function handleUserPublished(user, mediaType) {
    const id = user.uid;
    remoteUsers[id] = user;
    client.subscribe(user, mediaType).then(() => {
        if (mediaType === 'video') {
            const remotePlayer = document.createElement('div');
            remotePlayer.id = `player-${id}`;
            remotePlayer.className = 'video-player';
            document.getElementById('video-container').append(remotePlayer);
            user.videoTrack.play(`player-${id}`);
        }
    });
}

function handleUserLeft(user) {
    const id = user.uid;
    delete remoteUsers[id];
    document.getElementById(`player-${id}`).remove();
}
