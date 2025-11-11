/*
(November 10, 2025) Extension Extractor
Given a string representing a filename, return the extension of the file.
- The extension is the part of the filename that comes after the last period (.).
- If the filename does not contain a period or ends with a period, return "none".
- The extension should be returned as-is, preserving case.

Test cases:
getExtension("document.txt")
=> txt
getExtension(".gitignore")
=> gitignore
getExtension("final.draft.")
=> none
*/

function getExtension(filename) {
  const match = filename.match(/\.\w+$/i);
  if (match) return match.toString().replace('.', '');
  
  return 'none';
}
