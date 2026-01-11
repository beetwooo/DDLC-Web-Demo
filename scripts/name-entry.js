function showNameEntry() {
  const overlay = document.getElementById('name-entry-overlay');
  if (overlay) {
    overlay.style.display = 'flex';
    const input = document.getElementById('player-name-input');
    if (input) {
      input.value = '';
      input.focus();
    }
  }
}

function submitName() {
  const input = document.getElementById('player-name-input');
  const name = (input && input.value.trim()) ? input.value.trim() : 'MC';
  
  if (characterMap && characterMap.me) {
    characterMap.me.name = name;
  }
  
  const transOverlay = document.getElementById('transition-overlay');
  const nameOverlay = document.getElementById('name-entry-overlay');
  
  if (transOverlay) {
    // fade
    transOverlay.style.opacity = '1';
    
    setTimeout(() => {
      // hide name
      if (nameOverlay) nameOverlay.style.display = 'none';
      showGame();
      
      // fade out
      setTimeout(() => {
        transOverlay.style.opacity = '0';
      }, 200);
    }, 1500); // wait fade
  } else {
    if (nameOverlay) nameOverlay.style.display = 'none';
    showGame();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const nameOkBtn = document.getElementById('btn-name-ok');
  if (nameOkBtn) nameOkBtn.addEventListener('click', submitName);

  const nameInput = document.getElementById('player-name-input');
  if (nameInput) {
    nameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') submitName();
    });
  }
});