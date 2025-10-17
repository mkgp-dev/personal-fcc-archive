/*
(October 16, 2025) Email Validator
Given a string, determine if it is a valid email address using the following constraints:

- It must contain exactly one @ symbol.
  - The local part (before the @):
  - Can only contain letters (a-z, A-Z), digits (0-9), dots (.), underscores (_), or hyphens (-).
  - Cannot start or end with a dot.
- The domain part (after the @):
  - Must contain at least one dot.
  - Must end with a dot followed by at least two letters.
Neither the local or domain part can have two dots in a row.

Test:
validate("develop.ment_user@c0D!NG.R.CKS") => true (this should be false in real life scenario since domain names atm doesn't have special characters)
validate("hell.-w.rld@example.com") => true
validate(".b@sh.rc") => false
validate("example@test.c0") => false

Reference/s:
https://regex101.com/
*/

function validate(email) {
  const p = /^(?!.*\.\.)[\w](?:[\w.-]*[\w])?@[^@\s.][^@\s]*\.[a-zA-Z]{2,}$/;
  return p.test(email);
}
