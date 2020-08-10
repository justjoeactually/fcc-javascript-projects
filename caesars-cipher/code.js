// FCC JavaScript Algorithms and Data Structures Projects
// Caesars Cipher

// Requirements
// Create a ROT13 cipher, where the values of the letters are
// shifted by 13 places. Thus, 'A' <-> 'N', 'B' <-> 'O' and so on.
// The function should take a ROT13 encoded string as input
// and returns a decoded string.
// All letters will be uppercase. Do not transform any non-alphabetic
// characters(i.e. spaces, punctuation), but do pass them on.

// ASCII 
// A = 65
// Z = 90

// Slightly cleaner version
function rot13(str) {
  let arr = str.split(""); // split str into an array
  let decodedArr = []; // establish a new empty array
  for (let i = 0; i < arr.length; i++) { // establish a for loop
    // let x equal the charCode of the current index of arr
    let x = arr[i].charCodeAt();  
    if (x < 65 || x > 90) { // addresses non-uppercase characters
      decodedArr.push(String.fromCharCode(x)); // pushes into decodedArr
    } else if (x < 78) { // addresses A-M
      decodedArr.push(String.fromCharCode(x + 13)); // pushes into decodedArr
    } else { // addresses N-Z
      decodedArr.push(String.fromCharCode(x - 13)); // pushes into decodedArr
    }  
  }
  return decodedArr.join(""); // rejoins decodedArr into a string
}

// Original function I wrote

// function rot13(str) {
//   let arr = str.split("");
//   let decodedArr = [];
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i].charCodeAt() < 65 || arr[i].charCodeAt() > 90) {
//       decodedArr.push(String.fromCharCode(arr[i].charCodeAt()));
//     } else if (arr[i].charCodeAt() < 78) {
//       decodedArr.push(String.fromCharCode(arr[i].charCodeAt() + 13));
//     } else {
//       decodedArr.push(String.fromCharCode(arr[i].charCodeAt() - 13));
//     }  
//   }
//   return decodedArr.join("");
// }