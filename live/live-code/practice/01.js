const URL = 'https://swapi.dev/api/people/1/';

function fetchCharacterData(callback) {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => callback(data));
}

fetchCharacterData((data) => console.log(data.name));

function fetchDataPromise() {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => console.log(data.name));
}

fetchDataPromise();

async function fetchDataAsyncAwait() {
  const response = await fetch(URL);
  return await response.json();
}

const data = await fetchDataAsyncAwait();
console.log(data.name);
