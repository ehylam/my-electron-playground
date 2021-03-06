const { desktopCapturer, remote } = require('electron');

const { Menu } = remote;

// Buttons
const videoElement = document.querySelector('.video_player');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const videoSelectBtn = document.getElementById('videoSelectBtn');
videoSelectBtn.onclick = getVideoSources;


// get current videos
async function getVideoSources() {
    const inputSources = await desktopCapturer.getSources({
      types: ['window', 'screen']
    });

    const videoOptionsMenu = Menu.buildFromTemplate(
      inputSources.map(source => {
        return {
          label: source.name,
          click: () => selectSource(source)
        };
      })
    );


    videoOptionsMenu.popup();
}

async function selectSource(source) {

    videoSelectBtn.innerText = source.name;

    const constraints = {
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: source.id
        }
      }
    };

    // Create a Stream
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    console.log(stream);
    videoElement.srcObject = stream;
    videoElement.play();
}
