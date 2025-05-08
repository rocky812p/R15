// Typing Test Logic
const lessons = [
  { name: "Easy Sentence", text: "The quick brown fox jumps over the lazy dog." },
  { name: "Numbers & Symbols", text: "1234567890 !@#$%^&*()_+" },
  { name: "Pangram", text: "Pack my box with five dozen liquor jugs." },
  { name: "Programming", text: "function helloWorld() { console.log('Hello, world!'); }" },
  { name: "Lorem Ipsum", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { name: "Motivation", text: "Success is not final, failure is not fatal: it is the courage to continue that counts." }
];
const gameWords = [
  "apple", "banana", "keyboard", "javascript", "premium", "responsive", "github", "suite", "modern", "glassmorphism", "gradient", "animation", "lesson", "history", "score", "timer", "accuracy", "speed", "test", "multi-tool", "ankit", "singh", "coding", "project", "mobile", "desktop", "theme", "dark", "light", "footer", "header"
];

const typingText = document.getElementById('typing-text');
const typingInput = document.getElementById('typing-input');
const wpmStat = document.getElementById('stat-wpm');
const accStat = document.getElementById('stat-accuracy');
const timerStat = document.getElementById('stat-timer');
const restartBtn = document.getElementById('restart-btn');
const historyList = document.getElementById('typing-history-list');
const clearHistoryBtn = document.getElementById('history-clear-btn');
const modeLessonBtn = document.getElementById('mode-lesson');
const modeGameBtn = document.getElementById('mode-game');
const lessonSelect = document.getElementById('lesson-select');
const lessonSelectWrap = document.getElementById('lesson-select-wrap');

let mode = 'lesson';
let currentText = '';
let timer = 60;
let timerInterval = null;
let started = false;
let startTime = null;
let endTime = null;
let history = [];

function saveHistory() {
  localStorage.setItem('typingHistory', JSON.stringify(history));
}
function loadHistory() {
  history = JSON.parse(localStorage.getItem('typingHistory') || '[]');
  renderHistory();
}
function renderHistory() {
  historyList.innerHTML = '';
  if (!history.length) {
    historyList.innerHTML = '<li>No history yet.</li>';
    return;
  }
  history.slice(-10).reverse().forEach(h => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${h.date} (${h.mode})</span> <span class="score">${h.wpm} WPM, ${h.acc}%</span>`;
    historyList.appendChild(li);
  });
}
function setMode(newMode) {
  mode = newMode;
  modeLessonBtn.classList.toggle('active', mode === 'lesson');
  modeGameBtn.classList.toggle('active', mode === 'game');
  lessonSelectWrap.style.display = mode === 'lesson' ? '' : 'none';
  resetTest();
}
function fillLessonSelect() {
  lessonSelect.innerHTML = '';
  lessons.forEach((l, i) => {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = l.name;
    lessonSelect.appendChild(opt);
  });
}
function getRandomGameText() {
  let arr = [];
  for (let i = 0; i < 18; i++) arr.push(gameWords[Math.floor(Math.random()*gameWords.length)]);
  return arr.join(' ');
}
function setText() {
  if (mode === 'lesson') {
    currentText = lessons[lessonSelect.value || 0].text;
  } else {
    currentText = getRandomGameText();
  }
  typingText.innerHTML = '';
  for (let i = 0; i < currentText.length; i++) {
    const span = document.createElement('span');
    span.textContent = currentText[i];
    typingText.appendChild(span);
  }
}
function resetTest() {
  timer = 60;
  started = false;
  startTime = null;
  endTime = null;
  typingInput.value = '';
  wpmStat.textContent = '0';
  accStat.textContent = '0%';
  timerStat.textContent = timer;
  setText();
  typingInput.disabled = false;
  typingText.classList.remove('success','fail','shake');
  if (timerInterval) clearInterval(timerInterval);
}
function startTimer() {
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timer--;
    timerStat.textContent = timer;
    if (timer <= 0) {
      finishTest();
    }
  }, 1000);
}
function finishTest() {
  if (timerInterval) clearInterval(timerInterval);
  typingInput.disabled = true;
  endTime = new Date();
  const input = typingInput.value;
  let correct = 0;
  for (let i = 0; i < Math.min(input.length, currentText.length); i++) {
    if (input[i] === currentText[i]) correct++;
  }
  const acc = currentText.length ? Math.round((correct / currentText.length) * 100) : 0;
  const words = input.trim().split(/\s+/).length;
  const timeTaken = ((endTime - startTime) / 1000) || 60;
  const wpm = Math.round((words / timeTaken) * 60);
  wpmStat.textContent = wpm;
  accStat.textContent = acc + '%';
  typingText.classList.add(acc >= 90 ? 'success' : 'fail');
  // Confetti animation
  if (acc >= 90) confetti();
  // Save to history
  history.push({
    date: new Date().toLocaleString(),
    wpm,
    acc,
    mode: mode.charAt(0).toUpperCase() + mode.slice(1)
  });
  saveHistory();
  renderHistory();
}
function confetti() {
  // Simple confetti effect
  for (let i = 0; i < 30; i++) {
    const conf = document.createElement('div');
    conf.style.position = 'fixed';
    conf.style.left = Math.random()*100 + 'vw';
    conf.style.top = '-30px';
    conf.style.width = '10px';
    conf.style.height = '10px';
    conf.style.background = `hsl(${Math.random()*360},90%,60%)`;
    conf.style.borderRadius = '50%';
    conf.style.zIndex = 9999;
    conf.style.pointerEvents = 'none';
    conf.style.transition = 'top 1.2s cubic-bezier(.4,2,.6,1), opacity 1.2s';
    document.body.appendChild(conf);
    setTimeout(() => {
      conf.style.top = (window.innerHeight-30) + 'px';
      conf.style.opacity = 0;
      setTimeout(() => conf.remove(), 1200);
    }, 10);
  }
}
typingInput.addEventListener('input', e => {
  if (!started) {
    started = true;
    startTime = new Date();
    startTimer();
  }
  // Highlight
  const val = typingInput.value;
  const spans = typingText.querySelectorAll('span');
  let correct = 0;
  for (let i = 0; i < spans.length; i++) {
    if (val[i] == null) {
      spans[i].className = '';
    } else if (val[i] === currentText[i]) {
      spans[i].className = 'correct';
      correct++;
    } else {
      spans[i].className = 'wrong';
    }
  }
  // If complete
  if (val.length === currentText.length) {
    finishTest();
  }
  // Live stats
  const acc = currentText.length ? Math.round((correct / currentText.length) * 100) : 0;
  accStat.textContent = acc + '%';
  const words = val.trim().split(/\s+/).length;
  const timeElapsed = started && startTime ? ((new Date() - startTime) / 1000) : 0.1;
  const wpm = Math.round((words / timeElapsed) * 60);
  wpmStat.textContent = wpm;
});
lessonSelect.addEventListener('change', resetTest);
modeLessonBtn.addEventListener('click', () => setMode('lesson'));
modeGameBtn.addEventListener('click', () => setMode('game'));
restartBtn.addEventListener('click', resetTest);
clearHistoryBtn.addEventListener('click', () => {
  if (confirm('Clear all typing test history?')) {
    history = [];
    saveHistory();
    renderHistory();
  }
});
window.addEventListener('DOMContentLoaded', () => {
  fillLessonSelect();
  setMode('lesson');
  loadHistory();
});
// Animations for feedback
const style = document.createElement('style');
style.textContent = `.correct{color:#22c55e;font-weight:700;} .wrong{color:#f43f5e;font-weight:700;} .success{animation:pop 0.5s;} .fail{animation:shake 0.5s;} @keyframes pop{0%{transform:scale(1);}50%{transform:scale(1.05);}100%{transform:scale(1);}} @keyframes shake{0%,100%{transform:translateX(0);}20%,60%{transform:translateX(-6px);}40%,80%{transform:translateX(6px);}}`;
document.head.appendChild(style); 