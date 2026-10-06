const t0 = Date.now();

setTimeout(() => {
  console.log(`timer fired at ${Date.now() - t0} ms`);
}, 0);

const end = Date.now() + 300;

while (Date.now() < end) {}
