/*
(October 09, 2025) Space Week Day 6: Moon Phase
For day six of Space Week, you will be given a date in the format "YYYY-MM-DD" and need to determine the phase of the moon for that day using the following rules:
Use a simplified lunar cycle of 28 days, divided into four equal phases:
- "New": days 1 - 7
- "Waxing": days 8 - 14
- "Full": days 15 - 21
- "Waning": days 22 - 28
After day 28, the cycle repeats with day 1, a new moon.

Use "2000-01-06" as a reference new moon (day 1 of the cycle) to determine the phase of the given day.
You will not be given any dates before the reference date.
Return the correct phase as a string.

moonPhase("2000-01-12") => New
moonPhase("2012-10-21") => Waning
*/

function moonPhase(dateString) {
  // make it cleaner
  const dms = (d) => new Date(d);

  // convert milliseconds to seconds > minutes > hours > days
  const ms = dms(dateString) - dms('2000-01-06');
  const s = ms / 1000;
  const m = s / 60;
  const h = m / 60;
  const d = h / 24;

  // modulo to 28 to get its moon phase
  const p = (d % 28) + 1;

  // rules
  if (p <= 7) return 'New';
  else if (p <= 14) return 'Waxing';
  else if (p <= 21) return 'Full';
  else if (p <= 28) return 'Waning';
  else return;
}
