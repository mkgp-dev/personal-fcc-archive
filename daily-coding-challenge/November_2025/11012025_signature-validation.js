/*
(November 01, 2025) Signature Validation
Given a message string, a secret key string, and a signature number, determine if the signature is valid using this encoding method:
- Letters in the message and secret key have these values:
  - a to z have values 1 to 26 respectively.
  - A to Z have values 27 to 52 respectively.
- All other characters have no value.
- Compute the signature by taking the sum of the message plus the sum of the secret key.
For example, given the message "foo" and the secret key "bar", the signature would be 57:
f (6) + o (15) + o (15) = 36
b (2) + a (1) + r (18) = 21
36 + 21 = 57
Check if the computed signature matches the provided signature.

Test cases:
verify("Is this valid?", "Yes", 233)
=> true
verify("Is this valid?", "No", 210)
=> false
*/

const _charCode = (s) => {
  if (/[a-z]/g.test(s)) return s.charCodeAt(0) - 96;
  if (/[A-Z]/g.test(s)) return s.charCodeAt(0) - 38;
  return 0;
};

const _map = (arr) => {
  return arr.split('').reduce((prev, curr) => prev + _charCode(curr), 0);
};

function verify(message, key, signature) {
  return _map(message) + _map(key) === signature;
}
