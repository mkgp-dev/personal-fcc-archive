/*
(October 12, 2025) Battle of Words
Given two sentences representing your team and an opposing team, where each word from your team battles the corresponding word from the opposing team, determine which team wins using the following rules:
- The given sentences will always contain the same number of words.
- Words are separated by a single space and will only contain letters.
- The value of each word is the sum of its letters.
- Letters a to z correspond to the values 1 through 26. For example, a is 1, and z is 26.
- A capital letter doubles the value of the letter. For example, A is 2, and Z is 52.
- Words battle in order: the first word of your team battles the first word of the opposing team, and so on.
- A word wins if its value is greater than the opposing word's value.
- The team with more winning words is the winner.

Return "We win" if your team is the winner, "We lose" if your team loses, and "Draw" if both teams have the same number of wins.

Test:
battle("hello world", "hello word") => We win
battle("Cheeseburger with fries", "Cheeseburger with Fries") => We lose
battle("We must never surrender", "Our team must win") => Draw
*/

function battle(ourTeam, opponent) {
  let allyPoints = 0;
  let enemyPoints = 0;

  const strConvert = (s) => {
    if (/[A-Z]/g.test(s)) return (s.charCodeAt(0) - 64) * 2
    else if (/[a-z]/g.test(s)) return s.charCodeAt(0) - 96
  };

  const _array = (a) => {
    return a.split(' ')
            .map(data => data.split('').reduce((prev, data) => prev + strConvert(data), 0))
  };

  const generateScore = (a, b) => {
    if (a.length !== b.length) return
    
    for (let i = 0; i < a.length; i++) {
      if (ally[i] > enemy[i]) allyPoints++
      else if (enemy[i] > ally[i]) enemyPoints++
    }
  };

  const ally = _array(ourTeam);
  const enemy = _array(opponent);

  generateScore(ally, enemy);

  if (allyPoints === enemyPoints) return 'Draw'
  else if (allyPoints > enemyPoints) return 'We win'
  else return 'We lose'
}
