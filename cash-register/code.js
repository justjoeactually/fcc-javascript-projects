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

const MONEY_VALUES = [
  ["HUNDRED", 100.0],
  ["TWENTY", 20.0],
  ["TEN", 10.0],
  ["FIVE", 5.0],
  ["ONE", 1.0],
  ["QUARTER", 0.25],
  ["DIME", 0.1],
  ["NICKEL", 0.05],
  ["PENNY", 0.01],
];

// I moved this out of the function body b/c it does not depend on any values in that scope, this makes it more clear that it is a query function only, a pure function.
function addCashBack(total, num) {
  return Math.round((total + num) * 100) / 100;
}

function checkCashRegister(price, cash, cid) {
  let ticket = { status: null, change: [] };
  // Rounding errors to "change" can cause a slew of bugs. Also, rather than dealing with rounding/decimals - the
  // entire function can convert to and from integers. Multiply currency by 100 so that you are always dealing with
  // pennies, i.e. integers, and have less rounding issues, then convert back before returning results.
  const totalChangeDue = Math.round((cash - price) * 100) / 100;
  let remainingChangeDue = totalChangeDue;

  let denomQtyList = []; // quantity of bills/coins in drawer
  let cashBackList = []; // total value of bills/coins given back

  // TODO: I can see that cid is reversed, a comment here is the perfect place to explain why this arbitrary looking
  // change is being made.
  cid.reverse(); // reverse cid order

  const registerTotal = countDrawer();

  // TODO: Seperate out "command" functions from "query" functions.
  // The query is, tell us how much money is in the drawer.
  // The command is to populate the denomQty array.
  // See: https://www.martinfowler.com/bliki/CommandQuerySeparation.html
  // total up cash in drawer
  function countDrawer() {
    let total = 0;
    for (let i = 0; i < cid.length; i++) {
      denomQtyList.push(Math.round(cid[i][1] / MONEY_VALUES[i][1]));
      total += cid[i][1];
    }
    // TODO: the line below is executed by does nothing, should the value be assigned to "total"/returned?
    Math.round(total * 100) / 100;
    return total;
  }

  if (registerTotal < remainingChangeDue) {
    ticket.status = "INSUFFICIENT_FUNDS";
    return ticket;
  } else if (registerTotal === remainingChangeDue) {
    ticket.status = "CLOSED";
    ticket.change = cid.reverse();
    return ticket;
  } else {
    // push cash back values of each denom into cashBack array
    // starting with largest denoms while subtracting from change total
    for (let j = 0; j < MONEY_VALUES.length; j++) {
      // You reuse these values so much, let's avoid typos and pull the values out of the arrays once, and also give
      // them self-documenting variable names
      const currentDenomValue = MONEY_VALUES[j][1];
      const countDrawer = denomQtyList[j];

      // TODO: "x" and "y" are not good variable names. Variables like i and j are so idiomatic/common that we know
      // they're incrementing counters. But a one letter variable in the middle of variable soup creates unnecessary
      // effort recalling what each one is.
      // TODO: you apply Math.floor to withrdawelQty every time. Just apply it here once and be done with it.
      let countWithrawel = Math.floor(remainingChangeDue / currentDenomValue);
      let totalDrawer = countDrawer * currentDenomValue;

      if (countDrawer === 0) {
        cashBackList.push(0);
      } else if (countDrawer < countWithrawel) {
        cashBackList.push(totalDrawer);
        remainingChangeDue =
          Math.round((remainingChangeDue - totalDrawer) * 100) / 100;
      } else if (countDrawer > countWithrawel) {
        const withdrawelAmount = currentDenomValue * countWithrawel;
        cashBackList.push(withdrawelAmount);
        remainingChangeDue =
          Math.round((remainingChangeDue - withdrawelAmount) * 100) / 100;
      }
    }
    // resolves the case where there is enough change in total but
    // not enough of certain denom to give correct change
    // I used the previous calculation here, by using a constant variable, rather than face new bugs here from managing the same logic in two places.
    if (cashBackList.reduce(addCashBack) !== totalChangeDue) {
      debugger;
      ticket.status = "INSUFFICIENT_FUNDS";
      return ticket;
    }
    ticket.status = "OPEN";
    ticket.change = cashBackConvert();
    return ticket;
  }

  // TODO: rather than rely on a closure that encloses/reference "cashBackList" below, I'd prefer to have cashBackList
  // passed in explicitly as an argument. This also makes this a query function, a pure function. Then you can also move
  // it out of the checkCashRegister body.
  //
  // Another way of thinking about this, using a closure here tightly couples together two sets of data with little
  // reason. Pure functions are preferred when they do not create an undue burden/complexity.V
  // puts money name and cash back into an array togther
  function cashBackConvert() {
    let changeArr = []; // want ticket.change to include denom names
    for (let k = 0; k < MONEY_VALUES.length; k++) {
      if (cashBackList[k] !== 0) {
        changeArr.push([MONEY_VALUES[k][0], cashBackList[k]]);
      }
    }
    return changeArr;
  }
}

export default checkCashRegister;
