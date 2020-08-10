// FCC JavaScript Algorithms and Data Structures Projects
// Palindrome Checker

// Requirements
// Return true if the given string is a palindrome. Otherwise, return false.
// A palindrome is a word or sentence that's spelled the same way
// both forward and backward, ignoring punctuation, case, and spelling.

// Revised cleaner version
function palindrome(str) {
  return (
    str
      .toLowerCase()
      .replace(/[\W_]/g, "") ===
    str
      .toLowerCase()
      .replace(/[\W_]/g, "")
      .split("")
      .reverse()
      .join("")
  );
}

// Original function I wrote
// function palindrome(str) {
//   let newStr = str
//     .toLowerCase()
//     .replace(/[\W_]/g, "");
  
//   let reverseStr = newStr
//     .split("")
//     .reverse()
//     .join("");

//   return newStr === reverseStr;
// }

// I feel like this gets the job done but if you had a LARGE body of text
// you were trying to pass through, it would be super slow and you would 
// want to try something else. Maybe a function that compares the first 
// and the last characters, if false return false, if true, compare the
// next 2 inner characters, working towards the center.