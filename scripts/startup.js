// startup sequence
let startupMusic = null;

function showStartupScreen1() {
  const overlay = document.getElementById('startup-overlay');
  const text = document.getElementById('startup-text');
  const logo = document.getElementById('startup-logo');
  
  overlay.className = 'screen-black';
  text.textContent = 'All characters in this game are over the age of 18';
  logo.style.display = 'none';
  
  // animate text
  text.classList.remove('fade-out');
  void text.offsetWidth; 
  text.classList.add('fade-in');
  

  setTimeout(() => {
    text.classList.remove('fade-in');
    text.classList.add('fade-out');
  }, 7000);
  
  // show screen
  setTimeout(showStartupScreen2, 8000); 
}

function showStartupScreen2() {
  const overlay = document.getElementById('startup-overlay');
  const text = document.getElementById('startup-text');
  const logo = document.getElementById('startup-logo');
  
  overlay.className = 'screen-white';
  text.textContent = '';
  logo.src = './images/uni/studio_logo.png';
  logo.style.display = 'block';
  
  // animate logo
  logo.classList.remove('fade-out');
  void logo.offsetWidth;
  logo.classList.add('fade-in');
  
  // play music
  startupMusic = new Audio('./config/sounds/1-01. Doki Doki Literature Club!.mp3');
  startupMusic.volume = 0.5;
  startupMusic.play().catch(error => {
    console.warn('Startup music playback failed:', error);
  });
  
 
  setTimeout(() => {
    logo.classList.remove('fade-in');
    logo.classList.add('fade-out');
  }, 3000);
  
  // screen 3
  setTimeout(showStartupScreen3, 4000);
}

function showStartupScreen3() {
  const overlay = document.getElementById('startup-overlay');
  const text = document.getElementById('startup-text');
  const logo = document.getElementById('startup-logo');
  
  overlay.className = 'screen-white';
  text.textContent = 'This game is not suitable for children \n or those who are easily disturbed.';
  logo.style.display = 'none';
  

  text.classList.remove('fade-out');
  void text.offsetWidth;
  text.classList.add('fade-in');
  
 
  setTimeout(() => {
    text.classList.remove('fade-in');
    text.classList.add('fade-out');
  }, 3000);
  
  
  // show menu
  setTimeout(showMenu, 4000);
}

function showMenu() {
  const content = document.getElementById('startup-content');
  const menu = document.getElementById('menu-screen');
  
  content.style.display = 'none';
  menu.style.display = 'flex';
  
  // particle effects
  setTimeout(spawnParticles, 1080);
}

function spawnParticles(retry = 0) {
  const menu = document.getElementById('menu-screen');
  const icon = document.getElementById('window-icon');
  if (!menu || !icon) return;
  
  const menuRect = menu.getBoundingClientRect();
  const iconRect = icon.getBoundingClientRect();

  // fix error
  if ((iconRect.width === 0 || iconRect.height === 0) && retry < 10) {
    setTimeout(() => spawnParticles(retry + 1), 100);
    return;
  }
  
  const originX = (iconRect.left - menuRect.left) + (iconRect.width / 2);
  const originY = (iconRect.top - menuRect.top) + iconRect.height;
  

  // math magic
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.left = (originX - 50) + 'px'; 
    p.style.top = (originY - 200) + 'px';
    
    // random burst
    const angle = Math.random() * Math.PI * 2;
    const dist = 400 + Math.random() * 700;
    const fall = 300 + Math.random() * 200;
    const tx = Math.cos(angle) * dist;
    const ty = (Math.sin(angle) * dist) + fall;
    
    p.style.setProperty('--tx', `${tx}px`);
    p.style.setProperty('--ty', `${ty}px`);
    p.style.animationDuration = (2.0 + Math.random() * 1.0) + 's';
    
    menu.appendChild(p);
    
    setTimeout(() => p.remove(), 3500);
  }
}


if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', showStartupScreen1);
} else {
  showStartupScreen1();
}

document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('btn-start-game');
  if (startBtn) startBtn.addEventListener('click', showNameEntry);


  const menuScreen = document.getElementById('menu-screen');
  if (menuScreen) {
    const buttons = [
      { id: 'btn-load-game', text: 'Load Game' },
      { id: 'btn-settings-menu', text: 'Settings' },
      { id: 'btn-exit-game', text: 'Exit DDLC' }
    ];

    buttons.forEach(btnData => {

      if (document.getElementById(btnData.id)) return;

      const btn = document.createElement('button');
      btn.id = btnData.id;
      btn.textContent = btnData.text;

      menuScreen.appendChild(btn);
    });
  }
});