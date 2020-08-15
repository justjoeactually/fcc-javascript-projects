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


const moneyVal = [
  ["HUNDRED", 100.0], 
  ["TWENTY", 20.0], 
  ["TEN", 10.0], 
  ["FIVE", 5.0], 
  ["ONE", 1.0], 
  ["QUARTER", 0.25], 
  ["DIME", 0.1], 
  ["NICKEL", 0.05], 
  ["PENNY", 0.01]
];

function checkCashRegister(price, cash, cid) {

  let ticket = { status: null, change:[] };
  let change = cash - price;

  let denomQty = []; // quantity of bills/coins in drawer
  let cashBack = []; // total value of bills/coins given back

  cid.reverse(); // reverse cid order

  const registerTotal = countDrawer();

  // total up cash in drawer
  function countDrawer() {
    let total = 0;
    for (let i = 0; i < cid.length; i++) {
      denomQty.push(Math.round(cid[i][1] / moneyVal[i][1]));
      total += cid[i][1];
    }
    Math.round(total * 100) / 100;
    return total;
  }

  if (registerTotal < change) {
    ticket.status = "INSUFFICIENT_FUNDS";
    return ticket;
  }
  else if (registerTotal === change) {
    ticket.status = "CLOSED";
    ticket.change = cid.reverse();
    return ticket;
  } 
  else {
    // push cash back values of each denom into cashBack array 
    // starting with largest denoms while subtracting from change total
    for (let j = 0; j < moneyVal.length; j++) {
      let x = change / moneyVal[j][1];
      let y = denomQty[j] * moneyVal[j][1];

      if (denomQty[j] === 0) {
        cashBack.push(0);
      }
      else if (denomQty[j] < Math.floor(x)) {
        cashBack.push(y);
        change = Math.round((change - (y)) * 100) / 100;
      }
      else if (denomQty[j] > Math.floor(x)) {
        cashBack.push(moneyVal[j][1] * (Math.floor(x)));
        change = Math.round((change - (moneyVal[j][1] * (Math.floor(x)))) * 100) / 100;
      }  
    }
    // resolves the case where there is enough change in total but
    // not enough of certain denom to give correct change
    if (cashBack.reduce(addCashBack) !== (cash - price)) {
      ticket.status = "INSUFFICIENT_FUNDS";
      return ticket;
    }
    ticket.status = "OPEN";
    ticket.change = cashBackConvert();
    return ticket;
  }
 
  // puts money name and cash back into an array togther
  function cashBackConvert() {
    let changeArr = []; // want ticket.change to include denom names
    for (let k = 0; k < moneyVal.length; k++) {
      if (cashBack[k] !== 0) {
        changeArr.push([moneyVal[k][0], cashBack[k]]); 
      }  
    }
    return changeArr;
  }

  function addCashBack(total, num) {
    return Math.round((total + num) * 100) / 100;
  }
}

