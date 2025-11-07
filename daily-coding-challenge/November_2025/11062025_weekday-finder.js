/*
(November 06, 2025) Weekday Finder
Given a string date in the format YYYY-MM-DD, return the day of the week.
Valid return days are:
- "Sunday"
- "Monday"
- "Tuesday"
- "Wednesday"
- "Thursday"
- "Friday"
- "Saturday"
Be sure to ignore time zones.

Test cases:
getWeekday("1111-11-11")
=> Saturday
getWeekday("2112-12-21")
=> Wednesday
getWeekday("2345-10-01")
=> Monday
*/

function getWeekday(dateString) {
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return days[date.getUTCDay()];
}
