// Word Counter Logic
const wordInput = document.getElementById('word-input');
const wordResult = document.getElementById('word-result');
const copyWordBtn = document.getElementById('copy-word');
const shareWordBtn = document.getElementById('share-word');

function countWords(text) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  return words.length;
}
function countChars(text) {
  return text.length;
}
function updateResult() {
  const text = wordInput.value;
  const words = countWords(text);
  const chars = countChars(text);
  wordResult.innerHTML = `<b>${words}</b> words, <b>${chars}</b> characters`;
  wordResult.classList.add('fade-in');
  setTimeout(() => wordResult.classList.remove('fade-in'), 600);
}
wordInput.addEventListener('input', updateResult);
copyWordBtn.addEventListener('click', () => {
  const text = wordResult.textContent;
  if (!text) return;
  navigator.clipboard.writeText(text);
  copyWordBtn.textContent = 'Copied!';
  setTimeout(() => (copyWordBtn.textContent = 'Copy'), 1200);
});
shareWordBtn.addEventListener('click', async () => {
  const text = wordResult.textContent;
  if (!text) return;
  if (navigator.share) {
    try {
      await navigator.share({ title: 'Word Count', text });
      shareWordBtn.textContent = 'Shared!';
      setTimeout(() => (shareWordBtn.textContent = 'Share'), 1200);
    } catch {}
  } else {
    copyWordBtn.click();
    alert('Sharing is not supported on this device. Result copied!');
  }
});
// Initialize result on page load
updateResult(); 