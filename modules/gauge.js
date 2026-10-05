// Analogue gauge: a needle on a half dial, from min to max.
// Click it to log the current value.

// Usage: const g = new Gauge(el, { min: 0, max: 100, unit: 'C' });
//        g.mount(); g.setValue(42);

export class Gauge {
  constructor(el, { min = 0, max = 100, unit = 'C' } = {}) {
    this.el = el;
    this.min = min;
    this.max = max;
    this.unit = unit;
    this.value = min;
  }

  setValue(v) {
    this.value = v;
    const pct = (v - this.min) / (this.max - this.min);
    const needle = this.el.querySelector('.needle');
    if (needle) needle.style.transform = `rotate(${pct * 180 - 90}deg)`;
  }

  handleClick() {
    // Logs the current value with its unit.
    console.log(`${this.unit}: ${this.value}`);
  }

  mount() {
    this.el.addEventListener('click', this.handleClick);
  }
}
