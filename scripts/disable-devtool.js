// disable devtool
document.addEventListener('contextmenu', (e) => e.preventDefault());

document.addEventListener('keydown', (e) => {

  if (e.key === 'F12' || e.keyCode === 123) {
    e.preventDefault();
  }

  if (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) {
    e.preventDefault();
  }

  if (e.ctrlKey && e.key.toUpperCase() === 'U') {
    e.preventDefault();
  }
});


['copy', 'cut', 'paste', 'dragstart'].forEach(event => {
  document.addEventListener(event, (e) => e.preventDefault());
});


document.addEventListener('selectstart', (e) => {
  if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
    e.preventDefault();
  }
});