// FCC JavaScript Algorithms and Data Structures Projects
// Cash Register

// Requirements

// Design a cash register drawer function checkCashRegister()
// that accepts purchase price as the first argument (price),
// payment as the secound argument (cash), 
// and cash-in-drawer (cid) as the third argument.

// cid is a 2D array listing available currency.

// The checkCashRegister() function should always return an object
// with a status key and a change key.

// Return { status: "INSUFFICIENT_FUNDS", change: [] } if cash-in-drawer
// is less than the change due, or if you cannot return the exact change.

// Return { status: "CLOSED", change: [...] } with cash-in-drawer
// as the value for the key change if it is equal to the change due.

// Otherwise, return { status: "OPEN", change: [...] }, with the change
// due in coins and bills, sorted in highest to lowest order, as the
// value of the change key.

// cash-in-drawer (cid) array example

// [
//   ["PENNY", 1.01],
//   ["NICKEL", 2.05],
//   ["DIME", 3.1],
//   ["QUARTER", 4.25],
//   ["ONE", 90],
//   ["FIVE", 55],
//   ["TEN", 20],
//   ["TWENTY", 60],
//   ["ONE HUNDRED", 100]
// ]

// Establish an object with money-type keys and values
// Listed high to low to make sorting change easier
const money = [
  { name: "ONE HUNDRED", val: 100.0 },
  { name: "TWENTY", val: 20.0 },
  { name: "TEN", val: 10.0 },
  { name: "FIVE", val: 5.0 },
  { name: "ONE", val: 1.0 },
  { name: "QUARTER", val: 0.25 },
  { name: "DIME", val: 0.1 },
  { name: "NICKEL", val: 0.05 },
  { name: "PENNY", val: 0.01 }
];

let cidValues = []; // for comparison later
let cidQty = [];
let quantityArr = []; // how many of each denom
let changeBack = []; // example: [["QUARTER", 0.5], ["PENNY", 0.02]]

function checkCashRegister(price, cash, cid) {
  // Set up variable for ticket status
  let ticket = { status: null, change:[] };
  // Set up variable for change due
  let change = cash - price;
  // Count the drawer
  const registerTotal = countDrawer();

  // There's probably an easier way than this to count the drawer
  // but this is what made sense to me 
  
  // loop thru cid, total up values and then round to the hundredths place
  function countDrawer() {
    let total = 0;
    for (let i = 0; i < cid.length; i++) {
      cidValues.push(cid[i][1]);
      total += cid[i][1];
    }
    return Math.round(total * 100) / 100;
  }

  function coinReturned() {
    // loop thru money object
    for (let i = 0; i < money.length; i++) {
      // divide change by money[i].val and round down
      let x = Math.floor(change / money[i].val); // x = easier to rewrite
      // push x into quantityArr 
      quantityArr.push(x);
      // subtract money[i].val * x from change
      change = change - (money[i].val * x);
      // repeat until i !< money.length
    }
    
    // cidValues.reverse() 

    // for (let j = 0; j < money.length; j++) {
    //   cidQty.push(cidValues[j] / money[j].val);
    // }

    // for (let j = 0; j < quantityArr.length; j++) {
    //   if (quantityArr[j] > cidQty[j]) {
    //     ticket.status = "INSUFFICIENT_FUNDS";
    //   } else if (quantityArr[j] !== 0) {
    //     ticket.status = "OPEN";
    //     changeBack.push([money[j].name, quantityArr[j] * money[j].val]);
    //   }
    // }

    return changeBack;
  }

  // When the change equals the cash in drawer
  if (registerTotal === change) {
    ticket.status = "CLOSED";
    ticket.change = cid;
    return ticket;  
  } else {
    ticket.change = coinReturned();
    return ticket;
  }
}