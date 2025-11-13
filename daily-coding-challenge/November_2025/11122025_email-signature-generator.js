/*
(November 12, 2025) Email Signature Generator
Given strings for a person's name, title, and company, return an email signature as a single string using the following rules:
- The name should appear first, preceded by a prefix that depends on the first letter of the name. For names starting with (case-insensitive):
  - A-I: Use >> as the prefix.
  - J-R: Use -- as the prefix.
  - S-Z: Use :: as the prefix.
- A comma and space (, ) should follow the name.
- The title and company should follow the comma and space, separated by " at " (with spaces around it).
For example, given "Quinn Waverly", "Founder and CEO", and "TechCo" return "--Quinn Waverly, Founder and CEO at TechCo".

Test cases:
generateSignature("Alice Reed", "Engineer", "TechCo")
=> >>Alice Reed, Engineer at TechCo
generateSignature("Tina Vaughn", "Developer", "example.com")
=> ::Tina Vaughn,Developer at example.com
*/

const prefix = (letter) => {
  if (/[a-i]/i.test(letter)) return '>>';
  else if (/[j-r]/i.test(letter)) return '--';
  else if (/[s-z]/i.test(letter)) return '::';
  else return;
};

function generateSignature(name, title, company) {
  const p = prefix(name.charAt(0).toLowerCase());
  return [[p, name].join(''), [title, company].join(' at ')].join(', ');
}
