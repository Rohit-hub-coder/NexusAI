export const nanoid = (size = 10) =>
  Array.from(crypto.getRandomValues(new Uint8Array(size)))
    .map((b) => b.toString(36))
    .join("")
    .slice(0, size);