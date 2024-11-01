async function embedWatermark() {
    const password = document.getElementById('passwordEmbed').value;
    const text = document.getElementById('textEmbed').value;
    const watermark = document.getElementById('watermarkEmbed').value;

    const response = await fetch('/embed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, text, watermark, algorithm: 'algorithm2' })
    });
    const data = await response.json();
    document.getElementById('embedOutput').innerText = data.text_with_wm;
}

async function extractWatermark() {
    const password = document.getElementById('passwordExtract').value;
    const text_with_wm = document.getElementById('textExtract').value;

    const response = await fetch('/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, text_with_wm, algorithm: 'algorithm2' })
    });
    const data = await response.json();
    document.getElementById('extractOutput').innerText = data.watermark;
}

function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text).then(() => {
        showCopySuccess();
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

function showCopySuccess() {
    const popup = document.getElementById('copySuccess');
    popup.style.opacity = 1;
    setTimeout(() => {
        popup.style.opacity = 0;
    }, 1000);
}
