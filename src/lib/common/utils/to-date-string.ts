export type DateString = `${string}-${string}-${string}`;

export function toDateString(date: Date): DateString {
  return new Date(date).toISOString().slice(0, 10) as DateString;
}
