const SEARCH_URL = 'http://localhost:3999/api/users';

let controller;

async function searchUsers(query) {
  controller?.abort();
  controller = new AbortController();
  try {
    const res = await fetch(
      `${SEARCH_URL}?search=${encodeURIComponent(query)}`,
      {
        signal: controller.signal,
      },
    );
    if (!res.ok) {
      throw new Error(`${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.log('old search cancelled');
    return [];
  }
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
searchUsers('c');
await wait(150);
searchUsers('cl');
await wait(150);
const found = await searchUsers('cle');
console.log(found);
