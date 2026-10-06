const BASE = 'https://jsonplaceholder.typicode.com';

//user/1
//posts?userId=1
//todos?userId=1

async function sendNotification(user) {
  const res = await fetch(`${BASE}/posts`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({
      title: 'foo',
      body: 'bar',
      userId: user.id,
    }),
  });

  if (!res.ok) {
    throw new Error(`${res.status}`);
  }

  if (user.userId === 3) {
    throw new Error(`${res.status}`);
  }

  return res.json();
}

const notifications = [
  { userId: 1, title: 'Welcome', body: 'Thanks for joining!' },
  { userId: 2, title: 'Update', body: 'Your account is ready.' },
  { userId: 3, title: 'Reminder', body: 'Check your notifications.' },
];

const results = await Promise.allSettled(
  notifications.map((user) => sendNotification(user)),
);
results.forEach((result, i) => {
  const user = notifications[i];
  if (result.status === 'fulfilled') {
    console.log('sent', user.title);
  } else {
    console.log('not sent', user.title);
  }
});
