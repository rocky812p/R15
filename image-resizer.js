// Image Resizer Logic
const imgUpload = document.getElementById('img-upload');
const imgWidth = document.getElementById('img-width');
const imgHeight = document.getElementById('img-height');
const resizeBtn = document.getElementById('resize-img');
const imgPreview = document.getElementById('img-preview');
const downloadImgBtn = document.getElementById('download-img');
const shareImgBtn = document.getElementById('share-img');
const reduceBtn = document.getElementById('reduce-img');
const percentInput = document.getElementById('img-percent');

let originalImg = null;
let resizedDataUrl = null;

imgUpload.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(ev) {
    const img = new window.Image();
    img.onload = function() {
      originalImg = img;
      imgWidth.value = img.naturalWidth;
      imgHeight.value = img.naturalHeight;
      imgPreview.innerHTML = `<img src="${img.src}" alt="Preview">`;
      resizedDataUrl = null;
    };
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
});

resizeBtn.addEventListener('click', () => {
  if (!originalImg) return;
  const w = parseInt(imgWidth.value);
  const h = parseInt(imgHeight.value);
  if (!w || !h || w < 1 || h < 1) {
    imgPreview.innerHTML = '<span style="color:#f43f5e">Enter valid width and height.</span>';
    return;
  }
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(originalImg, 0, 0, w, h);
  resizedDataUrl = canvas.toDataURL('image/png');
  imgPreview.innerHTML = `<img src="${resizedDataUrl}" alt="Resized Preview">`;
});

downloadImgBtn.addEventListener('click', () => {
  if (!resizedDataUrl) return;
  const a = document.createElement('a');
  a.href = resizedDataUrl;
  a.download = 'resized-image.png';
  a.click();
});

shareImgBtn.addEventListener('click', async () => {
  if (!resizedDataUrl) return;
  try {
    const res = await fetch(resizedDataUrl);
    const blob = await res.blob();
    if (navigator.canShare && navigator.canShare({ files: [new File([blob], 'resized-image.png', { type: blob.type })] })) {
      await navigator.share({
        files: [new File([blob], 'resized-image.png', { type: blob.type })],
        title: 'Resized Image',
        text: 'Here is your resized image!'
      });
      shareImgBtn.textContent = 'Shared!';
      setTimeout(() => (shareImgBtn.textContent = 'Share'), 1200);
    } else {
      downloadImgBtn.click();
      alert('Sharing is not supported on this device. Image downloaded!');
    }
  } catch {
    downloadImgBtn.click();
    alert('Sharing is not supported on this device. Image downloaded!');
  }
});

reduceBtn.addEventListener('click', () => {
  if (!originalImg) return;
  const percent = parseInt(percentInput.value);
  if (!percent || percent < 1 || percent > 99) {
    imgPreview.innerHTML = '<span style="color:#f43f5e">Enter a valid percent (1-99).</span>';
    return;
  }
  const w = Math.round(originalImg.naturalWidth * (1 - percent / 100));
  const h = Math.round(originalImg.naturalHeight * (1 - percent / 100));
  imgWidth.value = w;
  imgHeight.value = h;
  // Trigger resize
  resizeBtn.click();
}); 