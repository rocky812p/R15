// BMI Calculator Logic
const bmiHeight = document.getElementById('bmi-height');
const bmiWeight = document.getElementById('bmi-weight');
const bmiBtn = document.getElementById('calc-bmi');
const bmiResult = document.getElementById('bmi-result');
const copyBmiBtn = document.getElementById('copy-bmi');
const shareBmiBtn = document.getElementById('share-bmi');

function getBmiCategory(bmi) {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}
function calculateBmi() {
  const h = parseFloat(bmiHeight.value);
  const w = parseFloat(bmiWeight.value);
  if (!h || !w || h < 50 || w < 10) return 'Please enter valid height and weight.';
  const bmi = w / ((h / 100) ** 2);
  const cat = getBmiCategory(bmi);
  return `Your BMI is <b>${bmi.toFixed(1)}</b> (${cat})`;
}
bmiBtn.addEventListener('click', () => {
  const result = calculateBmi();
  bmiResult.innerHTML = result;
  bmiResult.classList.add('fade-in');
  setTimeout(() => bmiResult.classList.remove('fade-in'), 600);
});
[bmiHeight, bmiWeight].forEach(input => {
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') bmiBtn.click();
  });
});
copyBmiBtn.addEventListener('click', () => {
  const text = bmiResult.textContent;
  if (!text) return;
  navigator.clipboard.writeText(text);
  copyBmiBtn.textContent = 'Copied!';
  setTimeout(() => (copyBmiBtn.textContent = 'Copy'), 1200);
});
shareBmiBtn.addEventListener('click', async () => {
  const text = bmiResult.textContent;
  if (!text) return;
  if (navigator.share) {
    try {
      await navigator.share({ title: 'My BMI', text });
      shareBmiBtn.textContent = 'Shared!';
      setTimeout(() => (shareBmiBtn.textContent = 'Share'), 1200);
    } catch {}
  } else {
    copyBmiBtn.click();
    alert('Sharing is not supported on this device. Result copied!');
  }
}); 