let script = [];
let currentScene = null;
let currentIndex = 0;
let selectedCharacter = 'sayori';

// scene order
const sceneOrder = [scene1, scene2];

function loadScene(scene) {
  if (!scene) return;
  
  currentScene = scene;
  script = scene.script || [];
  currentIndex = 0;
  
  // update bg
  const bgEl = document.getElementById('bg');
  if (bgEl && scene.background) {
    bgEl.src = scene.background;
  }
  
  // play music
  playSceneMusic(scene.music);
  
  // reset display
  if (script.length > 0) {
    updateCharacterDisplay(selectedCharacter);
    showLine(currentIndex);
  } else {
    // clear text
    const textEl = document.getElementById('text');
    if (textEl) textEl.textContent = '';
    finishTyping('');
  }
}

function updateCharacterDisplay(charKey, expressionKey, altCharKey = null) {
  const nameEl = document.getElementById('name');
  const charImgEl = document.getElementById('character');

  // normalize key
  const normalizedKey = charKey ? charKey.toLowerCase() : charKey;
  const map = characterMap[normalizedKey];
  
  if (!map) return;
  
  selectedCharacter = normalizedKey;
  
  // show image
  if (charImgEl) {
    charImgEl.style.display = 'block';
  }
  
  // set name
  if (nameEl) nameEl.textContent = map.name;
  
  // alt image
  if (normalizedKey === 'me' && altCharKey) {
    const img = getExpressionImage(altCharKey.toLowerCase(), expressionKey);
    if (charImgEl && img) charImgEl.src = img;
  } else {
    // normal display
    const img = getExpressionImage(normalizedKey, expressionKey);
    if (charImgEl && img) charImgEl.src = img;
  }
}

function showLine(index) {
  const line = script[index];
  if (!line) return;
  
  const nameEl = document.getElementById('name');
  const charImgEl = document.getElementById('character');
  const expr = line.expression || null;
  const anim = line.anim || null;
  
  if (line.character) {
    const charKey = line.character.toLowerCase();
    if (charKey === 'me' && line.alt) {
      updateCharacterDisplay(line.character, expr, line.alt);
    } else {
      updateCharacterDisplay(line.character, expr);
    }
  } else {
    // narration
    if (nameEl) nameEl.textContent = characterMap.me.name;
    if (charImgEl) {
      charImgEl.style.display = 'none';
    }
  }
  
  // apply anim
  if (anim && charImgEl && charImgEl.style.display !== 'none') {
    if (anim === 'appear') {
      charImgEl.style.opacity = '0';
    }
    setTimeout(() => {
      applyAnimation(anim);
    }, anim === 'appear' ? 10 : 50);
  }
  
  currentFullText = formatLineText(line);
  typeText(currentFullText);
}

function startGame() {
  if (sceneOrder.length > 0) {
    loadScene(sceneOrder[0]);
  }
}

function showGame() {
  const overlay = document.getElementById('startup-overlay');
  if (overlay) overlay.style.display = 'none';
  
  startGame();
  
  // stop music
  if (typeof startupMusic !== 'undefined' && startupMusic) {
    startupMusic.pause();
    startupMusic = null;
  }
}

// interaction loop
document.body.addEventListener('click', (e) => {
  checkAudioAutoplay();
  
  if (script.length === 0) return;
  
  if (isTyping) {
    finishTyping(currentFullText);
    return;
  }
  
  if (currentIndex < script.length - 1) {
    currentIndex++;
    showLine(currentIndex);
  } else {
    // next scene
    const currentSceneIndex = sceneOrder.indexOf(currentScene);
    if (currentSceneIndex >= 0 && currentSceneIndex < sceneOrder.length - 1) {
      loadScene(sceneOrder[currentSceneIndex + 1]);
    }
  }
});