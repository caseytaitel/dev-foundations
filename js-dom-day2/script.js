// Color Changer
const picker = document.getElementById('picker');
const applyBtn = document.getElementById('applyBtn');
const preview = document.getElementById('preview');

picker.addEventListener('input', () => preview.style.backgroundColor = picker.value);
applyBtn.addEventListener('click', () => document.body.style.backgroundColor = picker.value);
picker.addEventListener('keydown', e => { if (e.key === 'Enter') applyBtn.click(); });

// API Fetch
const loadBtn = document.getElementById('loadBtn');
const reloadBtn = document.getElementById('reloadBtn');
const grid = document.getElementById('grid');
const statusEl = document.getElementById('status');
let loading = false;

function setStatus(t){ statusEl.textContent = t || ''; }
function renderImages(imgs){
  grid.innerHTML = '';
  imgs.forEach(src => {
    const card = document.createElement('div');
    const img = document.createElement('img');
    card.className = 'card';
    img.src = src;
    img.alt = 'Dog';
    card.appendChild(img);
    grid.appendChild(card);
  });
}

async function loadDogs(){
  if (loading) return;
  loading = true; setStatus('Loading…'); loadBtn.disabled = true; reloadBtn.disabled = true;
  try {
    const res = await fetch('https://dog.ceo/api/breeds/image/random/6');
    if (!res.ok) throw new Error('Network error');
    const { message } = await res.json();
    renderImages(message);
    setStatus('');
  } catch (err) {
    setStatus('Error loading images.');
  } finally {
    loading = false; loadBtn.disabled = false; reloadBtn.disabled = false;
  }
}
loadBtn.addEventListener('click', loadDogs);
reloadBtn.addEventListener('click', loadDogs);
