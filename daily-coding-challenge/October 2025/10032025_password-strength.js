/*
(October 03, 2025) P@ssw0rd Str3ngth!
Given a password string, return "weak", "medium", or "strong" based on the strength of the password.

A password is evaluated according to the following rules:
It is at least 8 characters long.
It contains both uppercase and lowercase letters.
It contains at least one number.
It contains at least one special character from this set: !, @, #, $, %, ^, &, or *.

Return "weak" if the password meets fewer than two of the rules. Return "medium" if the password meets 2 or 3 of the rules. Return "strong" if the password meets all 4 rules.

To test:
checkStrength("123456")
checkStrength("PassWord%^!")
checkStrength("C0d3&Fun!")

References:
https://regex101.com/
https://stackoverflow.com/questions/4745112/javascript-regex-for-alphanumeric-string-with-length-of-3-5-chars
https://stackoverflow.com/questions/4429847/check-if-string-contains-both-number-and-letter-at-least
https://stackoverflow.com/questions/18057962/regex-pattern-including-all-special-characters
*/

function checkStrength(password) {
  // variables
  let pass = 0;
  let response;

  // criteria
  const length = /^.{8,}$/;
  const letter = /^(?=.*[A-Z])(?=.*[a-z]).+$/;
  const number = /^(?=.*[\d]).+$/;
  const charac = /^(?=.*[!@#$%^&*]).+$/;

  // It is at least 8 characters long.
  if (length.test(password)) pass++;

  // It contains both uppercase and lowercase letters.
  if (letter.test(password)) pass++;

  // It contains at least one number.
  if (number.test(password)) pass++;

  // It contains at least one special character from this set [!, @, #, $, %, ^, &, or *.].
  if (charac.test(password)) pass++;

  // verify
  if (pass < 2) {
    response = 'weak';
  } else if (pass === 2 || pass <= 3) {
    response = 'medium';
  } else if (pass === 4) {
    response = 'strong';
  }

  // results
  // debug purposes console.log(pass);
  return response;
}
