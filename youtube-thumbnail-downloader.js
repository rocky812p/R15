// YouTube Thumbnail Downloader Logic
const ytInput = document.getElementById('yt-url');
const fetchBtn = document.getElementById('fetch-thumb');
const thumbResult = document.getElementById('thumb-result');
const copyThumbBtn = document.getElementById('copy-thumb');
const downloadThumbBtn = document.getElementById('download-thumb');
const shareThumbBtn = document.getElementById('share-thumb');

function extractVideoId(url) {
  const regExp = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([\w-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}
function getThumbUrl(id, quality = 'maxresdefault') {
  return `https://img.youtube.com/vi/${id}/${quality}.jpg`;
}
fetchBtn.addEventListener('click', () => {
  const url = ytInput.value.trim();
  const id = extractVideoId(url);
  if (!id) {
    thumbResult.innerHTML = '<span style="color:#f43f5e">Invalid YouTube URL.</span>';
    return;
  }
  const maxUrl = getThumbUrl(id, 'maxresdefault');
  const hqUrl = getThumbUrl(id, 'hqdefault');
  // Try maxresdefault, fallback to hqdefault if error
  thumbResult.innerHTML = `<img id="yt-thumb-img" src="${maxUrl}" alt="YouTube Thumbnail" style="width:100%;max-width:320px;border-radius:1rem;">`;
  const img = document.getElementById('yt-thumb-img');
  img.onerror = function() {
    img.onerror = null;
    img.src = hqUrl;
  };
  thumbResult.classList.add('fade-in');
  setTimeout(() => thumbResult.classList.remove('fade-in'), 600);
});

copyThumbBtn.addEventListener('click', async () => {
  const img = document.getElementById('yt-thumb-img');
  if (!img) return;
  try {
    const response = await fetch(img.src);
    const blob = await response.blob();
    await navigator.clipboard.write([
      new window.ClipboardItem({ [blob.type]: blob })
    ]);
    copyThumbBtn.textContent = 'Copied!';
    setTimeout(() => (copyThumbBtn.textContent = 'Copy'), 1200);
  } catch {
    alert('Copying image is not supported in this browser.');
  }
});

downloadThumbBtn.addEventListener('click', () => {
  const img = document.getElementById('yt-thumb-img');
  if (!img) return;
  const a = document.createElement('a');
  a.href = img.src;
  a.download = 'youtube-thumbnail.jpg';
  a.click();
});

shareThumbBtn.addEventListener('click', async () => {
  const img = document.getElementById('yt-thumb-img');
  if (!img) return;
  try {
    const response = await fetch(img.src);
    const blob = await response.blob();
    if (navigator.canShare && navigator.canShare({ files: [new File([blob], 'youtube-thumbnail.jpg', { type: blob.type })] })) {
      await navigator.share({
        files: [new File([blob], 'youtube-thumbnail.jpg', { type: blob.type })],
        title: 'YouTube Thumbnail',
        text: 'Here is your YouTube video thumbnail!'
      });
      shareThumbBtn.textContent = 'Shared!';
      setTimeout(() => (shareThumbBtn.textContent = 'Share'), 1200);
    } else {
      downloadThumbBtn.click();
      alert('Sharing is not supported on this device. Thumbnail downloaded!');
    }
  } catch {
    downloadThumbBtn.click();
    alert('Sharing is not supported on this device. Thumbnail downloaded!');
  }
}); 