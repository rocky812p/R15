// Text Case Converter Logic
const caseInput = document.getElementById('case-input');
const caseResult = document.getElementById('case-result');
const toUpperBtn = document.getElementById('to-upper');
const toLowerBtn = document.getElementById('to-lower');
const toTitleBtn = document.getElementById('to-title');
const copyCaseBtn = document.getElementById('copy-case');
const shareCaseBtn = document.getElementById('share-case');

function toTitleCase(str) {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}
function updateCaseResult(text) {
  caseResult.innerHTML = text;
  caseResult.classList.add('fade-in');
  setTimeout(() => caseResult.classList.remove('fade-in'), 600);
}
toUpperBtn.addEventListener('click', () => {
  updateCaseResult(caseInput.value.toUpperCase());
});
toLowerBtn.addEventListener('click', () => {
  updateCaseResult(caseInput.value.toLowerCase());
});
toTitleBtn.addEventListener('click', () => {
  updateCaseResult(toTitleCase(caseInput.value));
});
copyCaseBtn.addEventListener('click', () => {
  const text = caseResult.textContent;
  if (!text) return;
  navigator.clipboard.writeText(text);
  copyCaseBtn.textContent = 'Copied!';
  setTimeout(() => (copyCaseBtn.textContent = 'Copy'), 1200);
});
shareCaseBtn.addEventListener('click', async () => {
  const text = caseResult.textContent;
  if (!text) return;
  if (navigator.share) {
    try {
      await navigator.share({ title: 'Converted Text', text });
      shareCaseBtn.textContent = 'Shared!';
      setTimeout(() => (shareCaseBtn.textContent = 'Share'), 1200);
    } catch {}
  } else {
    copyCaseBtn.click();
    alert('Sharing is not supported on this device. Result copied!');
  }
}); 