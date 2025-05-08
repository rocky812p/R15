// Resume Maker Logic
const form = document.getElementById('resume-form');
const preview = document.getElementById('resume-preview');
const downloadBtn = document.getElementById('download-resume');
const shareBtn = document.getElementById('share-resume');

function updatePreview() {
  const name = document.getElementById('r-name').value.trim();
  const email = document.getElementById('r-email').value.trim();
  const phone = document.getElementById('r-phone').value.trim();
  const summary = document.getElementById('r-summary').value.trim();
  const exp = document.getElementById('r-exp').value.trim().split('\n').filter(Boolean);
  const edu = document.getElementById('r-edu').value.trim().split('\n').filter(Boolean);
  const skills = document.getElementById('r-skills').value.trim().split(',').map(s => s.trim()).filter(Boolean);
  preview.innerHTML =
    `<h2>${name || 'Your Name'}</h2>
    <div class="resume-contact">${email ? '📧 ' + email : ''}${email && phone ? ' &nbsp;|&nbsp; ' : ''}${phone ? '📞 ' + phone : ''}</div>
    ${summary ? `<div class="resume-section-title">Summary</div><div>${summary}</div>` : ''}
    ${exp.length ? `<div class="resume-section-title">Experience</div><ul>${exp.map(e => `<li>${e}</li>`).join('')}</ul>` : ''}
    ${edu.length ? `<div class="resume-section-title">Education</div><ul>${edu.map(e => `<li>${e}</li>`).join('')}</ul>` : ''}
    ${skills.length ? `<div class="resume-section-title">Skills</div><div>${skills.join(', ')}</div>` : ''}`;
}
form.addEventListener('input', updatePreview);
window.addEventListener('DOMContentLoaded', updatePreview);

downloadBtn.addEventListener('click', () => {
  const win = window.open('', '', 'width=800,height=900');
  win.document.write('<html><head><title>Resume</title><style>body{font-family:Segoe UI,Arial,sans-serif;padding:2rem;}h2{font-size:1.5rem;font-weight:800;}ul{margin:0 0 0.7rem 1.2rem;padding:0;}li{margin-bottom:0.2rem;} .resume-section-title{font-size:1.1rem;font-weight:700;color:#2563eb;margin-top:1.2rem;margin-bottom:0.3rem;}</style></head><body>' + preview.innerHTML + '</body></html>');
  win.document.close();
  win.print();
});

shareBtn.addEventListener('click', () => {
  alert('Direct PDF sharing is not supported in browsers. Please use Download PDF and share the file manually.');
}); 