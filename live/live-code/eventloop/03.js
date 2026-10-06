function fetchData(performOperation) {
  console.log('Fetching data..');

  setTimeout(() => {
    const data = { id: 1, name: 'Alice' };
    performOperation(data);
  }, 300);
}

fetchData((data) => console.log('Data received:', data));
console.log('heavy operation');
