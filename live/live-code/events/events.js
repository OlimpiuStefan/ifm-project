const log = (...text) => {
  document.querySelector('#log').textContent += text.join(' ') + '\n';
};
const panel = document.querySelector('#panel');
const button = panel.querySelector('.ack');

panel.addEventListener('click', () => {
  log('panel heard the click');
});

panel.addEventListener('click', (event) => {
  log(`target: ${event.target} and currentTarget: ${event.currentTarget}`);
});

function select(deviceId) {
  const selected = panel.querySelector(`[data-device-id="${deviceId}"]`);
  //[data-device-id=PT-1233]
  for (const r of panel.querySelectorAll('.row')) {
    r.classList.toggle('selected', r === selected);
  }
  log('select', deviceId);
}

panel.addEventListener('click', (event) => {
  if (event.target.closest('.ack')) return;
  const row = event.target.closest('.row');
  if (!row) return;
  select(row.dataset.deviceId);
  announce(panel, row.dataset.deviceId);
});

button.addEventListener('click', (event) => {
  log('buton ack clicked');
  //event.stopPropagation();
});

panel.addEventListener('click', () => {
  log('panel interaction');
});

panel.addEventListener('click', (event) => {
  const link = event.target.closest('.details');
  if (!link) return;
  event.preventDefault();
  log('details clicked', link.closest('.row').dataset.deviceId);
});

function announce(el, deviceId) {
  el.dispatchEvent(
    new CustomEvent('alarm:selected', {
      detail: { deviceId },
    }),
  );
}

panel.addEventListener('alarm:selected', (event) => {
  log('panel heard alarm:selected', event.detail.deviceId);
});
