/*
(November 04, 2025) Image Search
On November 4th, 2001, Google launched its image search, allowing people to find images using search terms. In this challenge, you will imitate the image search.
Given an array of image names and a search term, return an array of image names containing the search term.
- Ignore the case when matching the search terms.
- Return the images in the same order they appear in the input array.

Test cases:
imageSearch(["cat.jpg", "dogToy.jpeg", "kitty-cat.png", "catNip.jpeg", "franken_cat.gif"], "Cat")
=> ["cat.jpg", "kitty-cat.png", "catNip.jpeg", "franken_cat.gif"]
imageSearch(["Moon.png", "sun.jpeg", "stars.png"], "PNG")
=> ["Moon.png", "stars.png"]
*/

function imageSearch(images, term) {
  const match = new RegExp(term.toLowerCase());
  return images.filter(data => match.test(data.toLowerCase()));
}
