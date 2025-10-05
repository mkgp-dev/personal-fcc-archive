/*
(October 05, 2025) Space Week Day 2: Exoplanet Search
For the second day of Space Week, you are given a string where each character represents the luminosity reading of a star. Determine if the readings have detected an exoplanet using the transit method. The transit method is when a planet passes in front of a star, reducing its observed luminosity.

Luminosity readings only comprise of characters 0-9 and A-Z where each reading corresponds to the following numerical values:
- Characters 0-9 correspond to luminosity levels 0-9.
- Characters A-Z correspond to luminosity levels 10-35.

A star is considered to have an exoplanet if any single reading is less than or equal to 80% of the average of all readings. For example, if the average luminosity of a star is 10, it would be considered to have a exoplanet if any single reading is 8 or less.

hasExoplanet("665544554") => false
hasExoplanet("FGFFCFFGG") => true

References:
https://stackoverflow.com/questions/37873276/separate-characters-and-numbers-from-a-string
https://stackoverflow.com/questions/22624379/how-to-convert-letters-to-numbers-with-javascript
https://stackoverflow.com/questions/71931219/how-to-convert-a-string-in-array-to-number-in-javascript
https://stackoverflow.com/questions/29544371/finding-the-average-of-an-array-using-js
https://www.w3schools.com/jsref/jsref_concat_array.asp
https://www.w3schools.com/jsref/jsref_some.asp
*/

function hasExoplanet(readings) {
  // Global var
  let length = 0;
  let total = 0;
  let data = [];

  // Helpers
  const strNum = (s) => s.charCodeAt(0) - 55;
  const avgNum = (a) => (a.reduce((a, b) => a + b) / a.length) * 0.8;

  // Extract letters and numbers
  const letter = readings.match(/[a-zA-Z]/g);
  const number = readings.match(/[0-9]/g);

  // Letters
  if (letter !== null) {
    const num = letter.map(strNum);
    data = data.concat(num);
  }

  // Numbers
  if (number !== null) {
    const num = number.map(Number);
    data = data.concat(num);
  }

  // Compute
  const average = avgNum(data);
  const result = data.some(data => data <= average);

  return result;
}
