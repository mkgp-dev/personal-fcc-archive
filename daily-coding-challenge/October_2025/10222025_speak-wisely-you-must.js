/*
(October 22, 2025) Speak Wisely, You Must
Given a sentence, return a version of it that sounds like advice from a wise teacher using the following rules:
- Words are separated by a single space.
- Find the first occurrence of one of the following words in the sentence: "have", "must", "are", "will", "can".
- Move all words before and including that word to the end of the sentence and:
    - Preserve the order of the words when you move them.
    - Make them all lowercase.
    - And add a comma and space before them.
- Capitalize the first letter of the new first word of the sentence.
- All given sentences will end with a single punctuation mark. Keep the original punctuation of the sentence and move it to the end of the new sentence.
- Return the new sentence, make sure there's a single space between each word and no spaces at the beginning or end of the sentence.

For example, given "You must speak wisely." return "Speak wisely, you must."

Test:
wiseSpeak("You can do it!") => Do it, you can!
wiseSpeak("Do you think you will complete this?") => Complete this, do you think you will?
wiseSpeak("All your base are belong to us.") => Belong to us, all your base are.
*/

function wiseSpeak(sentence) {
  const punc = sentence.slice(-1);
  const word = sentence.match(/\w+/g);
  const lang = ['have', 'must', 'are', 'will', 'can'];

  let idx = 0;
  for (let i = 0; i < word.length; i++) {
    const match = lang.reduce((prev, data) => prev + word[i].toLowerCase().includes(data), 0) == 1;
    if (match) {
      idx = i;
      break;
    }
  }

  const start = word.slice(idx + 1).map((data, i) => {
    if (i === 0) return data.charAt(0).toUpperCase() + data.slice(1);
    return data;
  }).join(' ');
  const end = word.slice(0, idx + 1).join(' ').toLowerCase();

  return `${start}, ${end}${punc}`.trim();
}
