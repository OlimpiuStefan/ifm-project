const readings = [
  {
    deviceId: 'PT-1042',
    name: 'Press line 1 · inlet',
    value: '97.4',
    unit: 'C',
  },
  {
    deviceId: 'VS-0071',
    name: 'Conveyor bearing',
    value: '12.1',
    unit: 'mm/s',
  },
  { deviceId: 'PS-0310', name: 'Hydraulic main', value: '0', unit: 'bar' },
  // ⚠️ this name came from another system. Nobody sanitised it.
  {
    deviceId: 'MM-0002',
    name: 'sdfds',
    value: '23.9',
    unit: 'V',
  },
];

const panel = document.querySelector('#panel');
const rows = document.querySelectorAll('.row');

function renderRow(r) {
  const row = document.createElement('div');
  row.className = 'row';
  row.dataset.deviceId = r.deviceId; // data-device-id="PT-2343"

  const label = document.createElement('span');
  label.className = 'label';
  label.textContent = r.name;
  label.innerHtml = r.name;

  const value = document.createElement('span');
  value.className = 'value';
  value.textContent = `${r.value} {r.unit}`;

  row.append(label, value);

  return row;
}

panel.append(renderRow(readings[0]));

const fromApi = readings[3].name;

const asText = document.createElement('p');
asText.textContent = fromApi; // the value is treated as text

const asHtml = document.createElement('p');
asHtml.innerHTML = fromApi; // ⚠️ the value is parsed as HTML

panel.after(asText, asHtml);

function renderList(list) {
  const frag = document.createDocumentFragment();
  for (const r of list) {
    frag.append(renderRow(r));
  }
  panel.replaceChildren(frag);
}

renderList(readings);
