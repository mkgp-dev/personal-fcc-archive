/*
(November 11, 2025) Vowels and Consonants
Given a string, return an array with the number of vowels and number of consonants in the string.
- Vowels consist of a, e, i, o, u in any case.
- Consonants consist of all other letters in any case.
- Ignore any non-letter characters.
For example, given "Hello World", return [3, 7].

Test cases:
count("The quick brown fox jumps over the lazy dog.")
=> [11, 24]
count("Hello World")
=> [3, 7]
count("Hello, World!")
=> [3, 7]
*/

function count(str) {
  let vowel = 0, consonant = 0;
  const vowels = ['a', 'e', 'i', 'o', 'u'];

  for (const s of str) {
    if (vowels.includes(s.toLowerCase())) vowel++;
    else if (s.match(/\s/i) || s.match(/\W/i)) continue;
    else consonant++;
  }

  return [vowel, consonant];
}
