/*
(October 13, 2025) 24 to 12
Given a string representing a time of the day in the 24-hour format of "HHMM", return the time in its equivalent 12-hour format of "H:MM AM" or "H:MM PM".
- The given input will always be a four-digit string in 24-hour time format, from "0000" to "2359".

Test:
to12("1124") => 11:24 AM
to12("1455") => 2:55 PM

Reference/s:
https://regex101.com/
https://stackoverflow.com/questions/20474257/split-string-into-two-parts
*/

function to12(time) {
  const match = time.match(/(\d{2})(\d{2})/);
  let h = Number(match[1]);
  const m = match[2];
  let p;

  if (h >= 13 && h <= 23) h -= 12, p = 'PM'
  else if (h == 0 || h == 24) h = '12', p = 'AM'
  else p = 'AM'

  return `${h}:${m} ${p}`;
}
