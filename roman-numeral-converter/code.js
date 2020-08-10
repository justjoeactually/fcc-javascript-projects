// FCC JavaScript Algorithms and Data Structures Projects
// Roman Numeral Converter

// Requirements
// Convert the given number into a roman numeral.
// All roman numerals should be provided in upper-case.

// Roman Symbols
// [1, 5, 10, 50, 100, 500, 1000]
// [I, V, X, L, C, D, M]

// Basic Combos
// [1, 2, 3, 4, 5, 6, 7, 8, 9]
// [I, II, III, IV, V, VI, VII, VIII, IX]

// [10, 20, 30, 40, 50, 60, 70, 80, 90]
// [X, XX, XXX, XL, L, LX, LXX, LXXX, XC]

// [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
// [C, CC, CCC, CD, D, DC, DCC, DCCC, CM, M]

function convertToRoman(num) {
  // Adding in values like 4, that convert to "IV" 
  // or "I" subtracted from "V", saves writing extra code.
  // Now the code just has to add on values to the end. 
  let integer = [
    1000, 900, 500, 400,
    100, 90, 50, 40,
    10, 9, 5, 4, 1
  ];

  let romanNumeral = [
    "M", "CM", "D", "CD",
    "C", "XC", "L", "XL",
    "X", "IX", "V", "IV", "I"
  ];

  let converted = ""; // establishing an empty string

  for (let i = 0; i < integer.length; i++) {
    while (integer[i] <= num) { // while the index of integer is <= num
      converted += romanNumeral[i]; // adds romanNumeral[i] to converted 
      num -= integer[i]; // subtracts integer[i] from num
    }
  }
  return converted;
}

// Step by step

// Example
// convertToRoman(6);

// for while loop will start with i = 0 and cycle through integer array 
// until integer[i] <= num, or in this case, integer[10] which is 5.
// 5 is less than num, which is 6.
// So now, converted = converted + romanNumeral[10]
// index 10 of romanNumeral is "V", so converted is now "V"
// Then, num = num - integer[10], or 6 - 5, so num now = 1
// Repeat steps 
// loop through until integer[i] <= num, now 1, so integer[12] which is 1.
// 1 is equal to 1
// So now, converted = "V" + "I" or "VI"
// num = 1 - 1 or 0, which will now stop the loop because integer[i] 
// cannot be less than or equal to 0.
// return converted.