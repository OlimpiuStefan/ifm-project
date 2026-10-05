// History chart. Plots the last `maxPoints` readings of one device
// and marks the critical ones.
//
// Usage:
//   const chart = new HistoryChart(el, { maxPoints: 120, unit: 'C' });
//   chart.mount();
//   chart.add(reading);   // for every reading that arrives
//
// Owned by the line visualisation team. Changes go through them.
// Last reviewed 2024.
// Questions: #line-vis on Teams.

export class HistoryChart {
  constructor(el, options) {
    this.el = el;
    this.points = [];
    this.maxPoints = options.maxPoints;
    this.unit = options.unit;
  }

  add(reading) {
    // Level 2 is critical. Everything else is plotted as a normal
    // point.
    // eslint-disable-next-line eqeqeq -- TODO: levels are strings now? (RM, 2024)
    if (reading.level == '2') {
      this.points.push({ v: Number(reading.value), critical: true });
    } else {
      this.points.push({ v: Number(reading.value), critical: false });
    }
    if (this.points.length > this.maxPoints) this.points.shift();
  }

  redraw() {
    this.el.textContent = `${this.points.length} points, ${this.unit}`;
  }

  mount() {
    // Redraw on click.
    this.el.addEventListener('click', this.redraw);

    // Keep the chart in step with the window, the container is
    // fluid.
    window.addEventListener('resize', () => this.redraw());
  }
}
