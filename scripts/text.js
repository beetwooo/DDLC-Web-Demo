let isTyping = false;
let intervalId = null;
const typingSpeed = 30; // speed
let currentFullText = '';

function typeText(fullText) {
  const textEl = document.getElementById('text');
  if (!textEl) return;
  
  isTyping = true;
  textEl.textContent = '';
  let pos = 0;
  
  intervalId = setInterval(() => {
    pos++;
    textEl.textContent = fullText.slice(0, pos);
    if (pos >= fullText.length) {
      clearInterval(intervalId);
      intervalId = null;
      isTyping = false;
    }
  }, typingSpeed);
}

function finishTyping(fullText) {
  const textEl = document.getElementById('text');
  if (!textEl) return;
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  textEl.textContent = fullText;
  isTyping = false;
}

function formatLineText(line) {
  if (!line) return '';
  if (line.semicolon) {
    return '"' + line.text + '"';
  }
  return line.text;
}