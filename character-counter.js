// Character Counter Logic
const charInput = document.getElementById('char-input');
const charResult = document.getElementById('char-result');
const copyCharBtn = document.getElementById('copy-char');
const shareCharBtn = document.getElementById('share-char');

function updateCharResult() {
  const text = charInput.value;
  charResult.innerHTML = `<b>${text.length}</b> characters`;
  charResult.classList.add('fade-in');
  setTimeout(() => charResult.classList.remove('fade-in'), 600);
}
charInput.addEventListener('input', updateCharResult);
copyCharBtn.addEventListener('click', () => {
  const text = charResult.textContent;
  if (!text) return;
  navigator.clipboard.writeText(text);
  copyCharBtn.textContent = 'Copied!';
  setTimeout(() => (copyCharBtn.textContent = 'Copy'), 1200);
});
shareCharBtn.addEventListener('click', async () => {
  const text = charResult.textContent;
  if (!text) return;
  if (navigator.share) {
    try {
      await navigator.share({ title: 'Character Count', text });
      shareCharBtn.textContent = 'Shared!';
      setTimeout(() => (shareCharBtn.textContent = 'Share'), 1200);
    } catch {}
  } else {
    copyCharBtn.click();
    alert('Sharing is not supported on this device. Result copied!');
  }
});
// Initialize result on page load
updateCharResult(); 