// JSON Formatter Logic
const jsonInput = document.getElementById('json-input');
const formatJsonBtn = document.getElementById('format-json');
const jsonPre = document.getElementById('json-pre');
const copyJsonBtn = document.getElementById('copy-json');
const shareJsonBtn = document.getElementById('share-json');

function formatJson() {
  try {
    const obj = JSON.parse(jsonInput.value);
    jsonPre.textContent = JSON.stringify(obj, null, 2);
    jsonPre.style.color = '#16a34a';
  } catch {
    jsonPre.textContent = 'Invalid JSON!';
    jsonPre.style.color = '#f43f5e';
  }
  jsonPre.classList.add('fade-in');
  setTimeout(() => jsonPre.classList.remove('fade-in'), 600);
}
formatJsonBtn.addEventListener('click', formatJson);
copyJsonBtn.addEventListener('click', () => {
  const text = jsonPre.textContent;
  if (!text) return;
  navigator.clipboard.writeText(text);
  copyJsonBtn.textContent = 'Copied!';
  setTimeout(() => (copyJsonBtn.textContent = 'Copy'), 1200);
});
shareJsonBtn.addEventListener('click', async () => {
  const text = jsonPre.textContent;
  if (!text) return;
  if (navigator.share) {
    try {
      await navigator.share({ title: 'Formatted JSON', text });
      shareJsonBtn.textContent = 'Shared!';
      setTimeout(() => (shareJsonBtn.textContent = 'Share'), 1200);
    } catch {}
  } else {
    copyJsonBtn.click();
    alert('Sharing is not supported on this device. Result copied!');
  }
}); 