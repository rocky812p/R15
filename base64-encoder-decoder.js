// Base64 Encoder/Decoder Logic
const b64Input = document.getElementById('b64-input');
const b64EncodeBtn = document.getElementById('b64-encode');
const b64DecodeBtn = document.getElementById('b64-decode');
const b64Result = document.getElementById('b64-result');
const copyB64Btn = document.getElementById('copy-b64');
const shareB64Btn = document.getElementById('share-b64');

function encodeBase64(str) {
  try {
    return btoa(unescape(encodeURIComponent(str)));
  } catch {
    return 'Invalid input for encoding.';
  }
}
function decodeBase64(str) {
  try {
    return decodeURIComponent(escape(atob(str)));
  } catch {
    return 'Invalid Base64 string.';
  }
}
b64EncodeBtn.addEventListener('click', () => {
  const text = b64Input.value;
  b64Result.innerHTML = encodeBase64(text);
  b64Result.classList.add('fade-in');
  setTimeout(() => b64Result.classList.remove('fade-in'), 600);
});
b64DecodeBtn.addEventListener('click', () => {
  const text = b64Input.value;
  b64Result.innerHTML = decodeBase64(text);
  b64Result.classList.add('fade-in');
  setTimeout(() => b64Result.classList.remove('fade-in'), 600);
});
copyB64Btn.addEventListener('click', () => {
  const text = b64Result.textContent;
  if (!text) return;
  navigator.clipboard.writeText(text);
  copyB64Btn.textContent = 'Copied!';
  setTimeout(() => (copyB64Btn.textContent = 'Copy'), 1200);
});
shareB64Btn.addEventListener('click', async () => {
  const text = b64Result.textContent;
  if (!text) return;
  if (navigator.share) {
    try {
      await navigator.share({ title: 'Base64 Result', text });
      shareB64Btn.textContent = 'Shared!';
      setTimeout(() => (shareB64Btn.textContent = 'Share'), 1200);
    } catch {}
  } else {
    copyB64Btn.click();
    alert('Sharing is not supported on this device. Result copied!');
  }
}); 