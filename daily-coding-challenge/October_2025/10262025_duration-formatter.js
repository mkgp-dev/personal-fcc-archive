/*
(October 26, 2025) Duration Formatter
Given an integer number of seconds, return a string representing the same duration in the format "H:MM:SS", where "H" is the number of hours, "MM" is the number of minutes, and "SS" is the number of seconds. Return the time using the following rules:
- Seconds: Should always be two digits.
- Minutes: Should omit leading zeros when they aren't needed. Use "0" if the duration is less than one minute.
- Hours: Should be included only if they're greater than zero.

Test case:
format(500) => 8:20
format(4000) => 1:06:40
format(1) => 0:01
*/

function format(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = String(seconds % 60).padStart(2, '0');

  return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${s}` : `${m}:${s}`;
}
