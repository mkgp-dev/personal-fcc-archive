/*
(October 28, 2025) Navigator
On October 28, 1994, Netscape Navigator was released, helping millions explore the early web.
Given an array of browser commands you executed on Netscape Navigator, return the current page you are on after executing all the commands using the following rules:
- You always start on the "Home" page, which will not be included in the commands array.
- Valid commands are:
  - "Visit Page": Where "Page" is the name of the page you are visiting. For example, "Visit About" takes you to the "About" page. When you visit a new page, make sure to discard any forward history you have.
  - "Back": Takes you to the previous page in your history or stays on the current page if there isn't one.
  - "Forward": Takes you forward in the history to the page you came from or stays on the current page if there isn't one.

For example, given ["Visit About Us", "Back", "Forward"], return "About Us".

Test cases:
navigate(["Visit About Us", "Visit Gallery"])
=> Gallery
navigate(["Visit About Us", "Visit Visit Us", "Forward", "Visit Contact Us", "Back"])
=> Visit Us
*/

function navigate(commands) {
  let prev = [];
  let frwd = [];
  let curr = 'Home';

  for (const cmd of commands) {
    if (cmd.includes('Visit')) {
      prev.push(curr), curr = cmd.replace('Visit ', ''), frwd = [];
    } else if (cmd === 'Back') {
      if (prev.length) frwd.push(curr), curr = prev.pop();
    } else if (cmd === 'Forward') {
      if (frwd.length) prev.push(curr), curr = frwd.pop();
    }
  }

  return curr;
}
