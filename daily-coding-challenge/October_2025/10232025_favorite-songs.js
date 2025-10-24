/*
(October 23, 2025) Favorite Songs
Remember iPods? The first model came out 24 years ago today, on Oct. 23, 2001.
Given an array of song objects representing your iPod playlist, return an array with the titles of the two most played songs, with the most played song first.
- Each object will have a "title" property (string), and a "plays" property (integer).

Test:
favoriteSongs([{"title": "Sync or Swim", "plays": 3}, {"title": "Byte Me", "plays": 1}, {"title": "Earbud Blues", "plays": 2} ])
=> ["Sync or Swim", "Earbud Blues"]
favoriteSongs([{"title": "Skip Track", "plays": 98}, {"title": "99 Downloads", "plays": 99}, {"title": "Clickwheel Love", "plays": 100} ])
=> ["Clickwheel Love", "99 Downloads"]
*/

function favoriteSongs(playlist) {
  return playlist.sort((a, b) => b.plays > a.plays ? 1 : -1)
                 .map(data => data.title)
                 .slice(0, 2);
}
