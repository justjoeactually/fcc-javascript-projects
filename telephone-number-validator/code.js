// FCC JavaScript Algorithms and Data Structures Projects
// Telephone Number Validator

// Requirements
// Return true if the passed string looks like a valid US phone number,
// otherwise return false.

// Examples of valid formats and regEx practice for me
// 555-555-5555     /^\d{3}[-]\d{3}[-]\d{4}$/
// (555)555-5555    /^\(\d{3}\)\d{3}[-]\d{4}$/
// (555) 555-5555   /^\(\d{3}\)\s\d{3}[-]\d{4}$/
// 555 555 5555     /^\d{3}[\s]\d{3}[\s]\d{4}$/
// 5555555555       /^\d{10}$/
// 1 555 555 5555   /^[1]\s\d{3}\s\d{3}\s\d{4}$/
// 1(555)555-5555   /^[1]\(\d{3}\)\d{3}[-]\d{4}$/

// Does it have 10 digits?
// Does it have 11 digits?
// Does it start with 1?
// Does it have permitted characters only?
// Does it have correct parentheses?

function telephoneCheck(str) {
  let regEx = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/;
  return regEx.test(str);
}

// ^ beginning of the string
// (1\s?)? does it start with a "1" or "1 " - doesn't have to but it can
// \d{3} checks for 3 digits
// (\(\d{3}\)|\d{3}) reads like ( \(\d{3}\) | \d{3} ) has an OR operator
// and checks 3 digits with or without parentheses
// [\s\-]? checks and allows spaces and dashes
// $ end of string and prevents a longer string with the correct format