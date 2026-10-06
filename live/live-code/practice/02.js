const BASE = 'https://jsonplaceholder.typicode.com';

//user/1
//posts?userId=1
//todos?userId=1

async function getJson(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`${res.status}`);
  }
  return res.json();
}

async function loadDashboard() {
  const [user, posts, todos] = await Promise.all([
    getJson(`${BASE}/user/1`),
    getJson(`${BASE}/posts?userId=1`),
    getJson(`${BASE}/todos?userId=1`),
  ]);
  return { user, posts, todos };
}
