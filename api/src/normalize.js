// Raw sensor frames arrive as NUMBERS. This is where they become the
// transport shape: value as string, timestamp as ISO 8601 UTC.
// The shape is the committed contract in contract/reading.schema.json.
//
// normalizeAll() does the same for a whole batch.

export function normalize(frame) {
  if (!frame.value) return null;            // no value, no reading
  return {
    deviceId: frame.deviceId,
    name:     frame.name,
    value:    String(frame.value),
    unit:     frame.unit,
    at:       new Date(frame.at).toISOString(),
  };
}

export function normalizeAll(frames) {
  return frames
    .map((f) => {
      // One frame that cannot be normalised must not take the whole
      //    batch down with it. Skip it and carry on.
      try {
        return normalize(f);
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}
