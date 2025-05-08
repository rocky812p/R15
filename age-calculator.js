// Age Calculator Logic
const dobInput = document.getElementById('dob');
const calcBtn = document.getElementById('calc-age');
const resultDiv = document.getElementById('age-result');
const copyBtn = document.getElementById('copy-age');
const shareBtn = document.getElementById('share-age');

function calculateAge(dob) {
  if (!dob) return '';
  const birth = new Date(dob);
  const today = new Date();
  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();
  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }
  if (years < 0) return 'Please enter a valid date of birth.';
  return `You are <b>${years}</b> years, <b>${months}</b> months, and <b>${days}</b> days old.`;
}

calcBtn.addEventListener('click', () => {
  const dob = dobInput.value;
  const result = calculateAge(dob);
  resultDiv.innerHTML = result;
  resultDiv.classList.add('fade-in');
  setTimeout(() => resultDiv.classList.remove('fade-in'), 600);
});

dobInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') calcBtn.click();
});

copyBtn.addEventListener('click', () => {
  const text = resultDiv.textContent;
  if (!text) return;
  navigator.clipboard.writeText(text);
  copyBtn.textContent = 'Copied!';
  setTimeout(() => (copyBtn.textContent = 'Copy'), 1200);
});

shareBtn.addEventListener('click', async () => {
  const text = resultDiv.textContent;
  if (!text) return;
  if (navigator.share) {
    try {
      await navigator.share({ title: 'My Age', text });
      shareBtn.textContent = 'Shared!';
      setTimeout(() => (shareBtn.textContent = 'Share'), 1200);
    } catch {}
  } else {
    copyBtn.click();
    alert('Sharing is not supported on this device. Result copied!');
  }
}); 