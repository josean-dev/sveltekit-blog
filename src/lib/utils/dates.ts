export function formatPublishedAt(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC" // don't convert to client's local timezone
  });
}

export function formatDate(date: Date) {
  return date.toLocaleString("en-us", {
    dateStyle: "medium",
    timeStyle: "short"
  });
}

export function formatDateShort(date: Date) {
  return date.toLocaleString("en-us", {
    dateStyle: "short",
    timeStyle: "short"
  });
}
