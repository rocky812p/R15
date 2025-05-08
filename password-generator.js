// Password Generator Logic
const pwLength = document.getElementById('pw-length');
const pwUpper = document.getElementById('pw-upper');
const pwLower = document.getElementById('pw-lower');
const pwNum = document.getElementById('pw-num');
const pwSym = document.getElementById('pw-sym');
const pwBtn = document.getElementById('generate-pw');
const pwResult = document.getElementById('pw-result');
const copyPwBtn = document.getElementById('copy-pw');
const sharePwBtn = document.getElementById('share-pw');

function generatePassword() {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const num = '0123456789';
  const sym = '!@#$%^&*()_+-=~[]{}|;:,.<>?';
  let chars = '';
  if (pwUpper.checked) chars += upper;
  if (pwLower.checked) chars += lower;
  if (pwNum.checked) chars += num;
  if (pwSym.checked) chars += sym;
  if (!chars) return 'Select at least one option!';
  let pw = '';
  for (let i = 0; i < pwLength.value; i++) {
    pw += chars[Math.floor(Math.random() * chars.length)];
  }
  return pw;
}
function updatePwResult() {
  const pw = generatePassword();
  pwResult.innerHTML = `<b>${pw}</b>`;
  pwResult.classList.add('fade-in');
  setTimeout(() => pwResult.classList.remove('fade-in'), 600);
}
pwBtn.addEventListener('click', updatePwResult);
copyPwBtn.addEventListener('click', () => {
  const text = pwResult.textContent;
  if (!text) return;
  navigator.clipboard.writeText(text);
  copyPwBtn.textContent = 'Copied!';
  setTimeout(() => (copyPwBtn.textContent = 'Copy'), 1200);
});
sharePwBtn.addEventListener('click', async () => {
  const text = pwResult.textContent;
  if (!text) return;
  if (navigator.share) {
    try {
      await navigator.share({ title: 'Generated Password', text });
      sharePwBtn.textContent = 'Shared!';
      setTimeout(() => (sharePwBtn.textContent = 'Share'), 1200);
    } catch {}
  } else {
    copyPwBtn.click();
    alert('Sharing is not supported on this device. Result copied!');
  }
});
// Generate a password on page load
updatePwResult(); 