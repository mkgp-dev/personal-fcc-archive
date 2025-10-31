/*
(October 30, 2025) Nth Prime
A prime number is a positive integer greater than 1 that is divisible only by 1 and itself. The first five prime numbers are 2, 3, 5, 7, and 11.
Given a positive integer n, return the nth prime number. For example, given 5 return the 5th prime number: 11.

Test cases:
nthPrime(10) => 29
nthPrime(16) => 53
nthPrime(1000) => 7919

Reference/s:
https://stackoverflow.com/questions/40200089/check-number-prime-in-javascript
https://isantoshv.medium.com/log-all-prime-numbers-until-n-using-javascript-generators-461976e27e0a
*/

const boolPrime = (num) => {
  for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
    if (num % i === 0) return false;
  }

  return num > 1;
}

function nthPrime(n) {
  let prime = [], i = 2;
  while (prime.length < n) {
    if (boolPrime(i)) prime.push(i);
    i++;
  }

  return prime[prime.length - 1];
}
