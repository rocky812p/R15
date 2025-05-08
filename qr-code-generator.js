// QR Code Generator Logic
const qrInput = document.getElementById('qr-input');
const qrBtn = document.getElementById('generate-qr');
const qrResult = document.getElementById('qr-result');
const copyQrBtn = document.getElementById('copy-qr');
const downloadQrBtn = document.getElementById('download-qr');
const shareQrBtn = document.getElementById('share-qr');

function generateQR(text) {
  if (!text.trim()) return '';
  // Using goqr.me API for QR code image
  return `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(text)}`;
}
qrBtn.addEventListener('click', () => {
  const text = qrInput.value.trim();
  if (!text) {
    qrResult.innerHTML = '<span style="color:#f43f5e">Please enter text or a URL.</span>';
    return;
  }
  const qrUrl = generateQR(text);
  qrResult.innerHTML = `<img id="qr-img" src="${qrUrl}" alt="QR Code" style="width:120px;height:120px;">`;
  qrResult.classList.add('fade-in');
  setTimeout(() => qrResult.classList.remove('fade-in'), 600);
});

copyQrBtn.addEventListener('click', async () => {
  const img = document.getElementById('qr-img');
  if (!img) return;
  try {
    const response = await fetch(img.src);
    const blob = await response.blob();
    await navigator.clipboard.write([
      new window.ClipboardItem({ [blob.type]: blob })
    ]);
    copyQrBtn.textContent = 'Copied!';
    setTimeout(() => (copyQrBtn.textContent = 'Copy'), 1200);
  } catch {
    alert('Copying QR image is not supported in this browser.');
  }
});

downloadQrBtn.addEventListener('click', () => {
  const img = document.getElementById('qr-img');
  if (!img) return;
  const a = document.createElement('a');
  a.href = img.src;
  a.download = 'qr-code.png';
  a.click();
});

shareQrBtn.addEventListener('click', async () => {
  const img = document.getElementById('qr-img');
  if (!img) return;
  try {
    const response = await fetch(img.src);
    const blob = await response.blob();
    if (navigator.canShare && navigator.canShare({ files: [new File([blob], 'qr-code.png', { type: blob.type })] })) {
      await navigator.share({
        files: [new File([blob], 'qr-code.png', { type: blob.type })],
        title: 'QR Code',
        text: 'Here is your QR code!'
      });
      shareQrBtn.textContent = 'Shared!';
      setTimeout(() => (shareQrBtn.textContent = 'Share'), 1200);
    } else {
      downloadQrBtn.click();
      alert('Sharing is not supported on this device. QR code downloaded!');
    }
  } catch {
    downloadQrBtn.click();
    alert('Sharing is not supported on this device. QR code downloaded!');
  }
}); 