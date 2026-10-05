// Loading several devices at once.
//
// fetchReading is passed in, not imported: the dashboard passes a
// fetch-based one, the tests pass a fake. Same code, no server needed.

// Every id is fetched in parallel; the results come back in the order
//    of `ids`.
export function loadAll(ids, fetchReading) {
  return Promise.all(ids.map((id) => fetchReading(id)));
}

// `fetcher` is the same idea as `fetchReading` above: the page leaves it
// alone and gets the real fetch, a test hands in a fake and needs no socket.
export const httpReading = (baseUrl, { fetcher = fetch } = {}) => async (id) => {
  const res = await fetcher(`${baseUrl}/api/devices/${id}/reading`);
  if (!res.ok) throw new Error(`${res.status} on ${id}`);
  return res.json();
};
