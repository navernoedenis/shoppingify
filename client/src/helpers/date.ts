export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
] as const;

export const WEEKDAY = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
] as const;

export function getWeekDay(date: Date) {
  const d = new Date(date);
  return WEEKDAY[d.getDay()];
}

export function getMonthName(date: Date) {
  const d = new Date(date);
  return MONTHS[d.getMonth()];
}

export function getDayMonthAndYear(date: Date) {
  const d = new Date(date);

  const year = d.getUTCFullYear();
  const month = d.getMonth() + 1;
  const day = d.getUTCDate();

  return { year, month, day };
}
