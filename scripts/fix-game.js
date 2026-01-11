// fix size
(function enforceFixedGameSize() {
  const GAME_WIDTH = 1100; 
  const GAME_HEIGHT = 618; 
  const gameEl = document.getElementById('game');
  if (!gameEl) return;

  function setFixed() {
    gameEl.style.width = GAME_WIDTH + 'px';
    gameEl.style.height = GAME_HEIGHT + 'px';
    gameEl.style.maxWidth = 'none';
    gameEl.style.maxHeight = 'none';
    gameEl.style.boxSizing = 'content-box';
  }
  setFixed();
  window.addEventListener('resize', setFixed);
  window.addEventListener('orientationchange', setFixed);
})();