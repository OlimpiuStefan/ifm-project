// ═══════════════════════════════════════════════════════════════════
//  THE module. One file, two hosts, not one line different.
//
//  Host 1 (plain page)  imports it directly.
//  Host 2 (Blazor)      serves a copy from wwwroot/js/, which the
//                       trainer makes with `npm run sync:module`.
//
//  The host hands it an element and an object to call back into.
//  It never goes looking in the document for anything itself.
// ═══════════════════════════════════════════════════════════════════

// One entry per gauge on the page, keyed by its element.
const registry = new Map();

export function init(el, host) {
  if (!el) throw new Error('init: no element');

  const payload = new Array(200_000).fill('x');       // pick history buffer

  const onResize = () => layout(el);
  const onClick  = (e) => host.invokeMethodAsync('Notify', 'pointPicked',
                            { at: e.clientX, size: payload.length })
    // A dropped Blazor circuit rejects this. Say so; never leave it unhandled.
    .catch((err) => console.warn('gauge: host did not answer', err));

  window.addEventListener('resize', onResize);
  el.addEventListener('click', onClick);
  const timer = setInterval(() => layout(el), 1000);

  registry.set(el, { onResize, onClick, timer, host, payload });
}

export function update(el, data) {
  if (!registry.has(el)) return;
  const needle = el.querySelector('.needle');
  if (needle) needle.style.transform = `rotate(${data.value * 1.8 - 90}deg)`;
}

function layout(el) {
  const needle = el.querySelector('.needle');
  if (needle) needle.dataset.laidOut = Date.now();
}
