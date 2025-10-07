/*
(October 06, 2025) Space Week Day 3: Phone Home
For day three of Space Week, you are given an array of numbers representing distances (in kilometers) between yourself, satellites, and your home planet in a communication route. Determine how long it will take a message sent through the route to reach its destination planet using the following constraints:

- The first value in the array is the distance from your location to the first satellite.
- Each subsequent value, except for the last, is the distance to the next satellite.
- The last value in the array is the distance from the previous satellite to your home planet.
- The message travels at 300,000 km/s.
- Each satellite the message passes through adds a 0.5 second transmission delay.
- Return a number rounded to 4 decimal places, with trailing zeros removed.

Test:
sendMessage([300000, 300000]) => 2.5
sendMessage([10000, 21339, 50000, 31243, 10000]) => 2.4086

References:
https://stackoverflow.com/questions/33045736/looping-through-an-array-and-dividing-each-value-by-100
https://stackoverflow.com/questions/2221167/javascript-formatting-a-rounded-number-to-n-decimals
*/

function sendMessage(route) {
  // global var
  let comp = 0;
  const l = route.length - 1;

  // grab the last value and divide it to 300000
  const e = route[l] / 300000;

  // loop each value except the last
  for (let i = 0; i < l; i++) {
    comp += (route[i] / 300000) + 0.5;
  }

  // compute the final result
  comp += e;
  return Number(comp.toFixed(4));
}
