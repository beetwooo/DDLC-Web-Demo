let currentAudio = null;
let audioStarted = false;

function playSceneMusic(musicSrc) {
  // stop music
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  
  if (!musicSrc) {
    audioStarted = false;
    return;
  }

  currentAudio = new Audio(musicSrc);
  currentAudio.loop = true;
  currentAudio.volume = 0.5;
  audioStarted = false; 
  
  currentAudio.play().then(() => {
    audioStarted = true; 
  }).catch(error => {
    console.warn('Audio playback failed:', error);
    // browser policy
    audioStarted = false;
  });
}

// check autoplay
function checkAudioAutoplay() {
  if (!audioStarted && currentAudio && currentAudio.paused) {
    currentAudio.play().catch(error => {
      console.warn('Audio playback failed on user interaction:', error);
    });
    audioStarted = true;
  }
}