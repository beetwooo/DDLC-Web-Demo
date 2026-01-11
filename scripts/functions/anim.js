function applyAnimation(animType) {
  const charImgEl = document.getElementById('character');
  if (!charImgEl || !animType) return;
  
  charImgEl.classList.remove('anim-appear', 'anim-jump');
  
  // apply anim
  if (animType === 'appear') {
    charImgEl.style.opacity = '0';
    void charImgEl.offsetWidth;
    charImgEl.classList.add('anim-appear');
  } else if (animType === 'jump') {
  // reset
    void charImgEl.offsetWidth;
    charImgEl.classList.add('anim-jump');
  }
  
  // remove class
  const animationDuration = animType === 'appear' ? 300 : 600;
  setTimeout(() => {
    if (charImgEl) {
      charImgEl.classList.remove('anim-appear', 'anim-jump');
      if (animType === 'appear') {
        charImgEl.style.opacity = '1';
      }
    }
  }, animationDuration);
}