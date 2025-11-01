/*
(October 31, 2025) SpOoKy~CaSe
Given a string representing a variable name, convert it to "spooky case" using the following constraints:
- Replace all underscores (_), and hyphens (-) with a tilde (~).
- Capitalize the first letter of the string, and every other letter after that. Ignore the tilde character when counting. Make all other letters lowercase.
For example, given hello_world, return HeLlO~wOrLd.

Test cases:
spookify("TRICK-or-TREAT")
=> TrIcK~oR~tReAt
spookify("c_a-n_d-y_-b-o_w_l")
=> C~a~N~d~Y~~b~O~w~L

Reference/s:
https://stackoverflow.com/questions/43192205/making-every-other-letter-capitalized
*/

function spookify(boo) {
  let cnvrt = '', index = 0;
  boo = boo.toLowerCase();
  
  for (let i = 0; i < boo.length; i++) {
    if (/[A-Za-z]/i.test(boo[i])) cnvrt += index % 2 == 0 ? boo.charAt(i).toUpperCase() : boo.charAt(i), index++;
    else cnvrt += boo[i];
  }

  return cnvrt.replace(/[_-]/g, '~');
}
