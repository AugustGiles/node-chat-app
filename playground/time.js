// Jan 1st 1970 00:00:00 am  this is what timestamps are based on
// Unix Epic

// ======= D A T E   W E B   A P I =======
// not great to use. use moment.
let date1 = new Date();
console.log(date1.getMonth());


// ======= M O M E N T =======

let moment = require('moment');
let date2 = moment();

let someTimestamp = moment().valueOf();
console.log(someTimestamp)

console.log(date2.format('MMM YYYY'))
console.log(date2.format('MMM Do, YYYY h:mm a'))
