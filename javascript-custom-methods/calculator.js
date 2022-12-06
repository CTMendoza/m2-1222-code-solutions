/* exported calculator */
var calculator = {
  add: function (x, y) {
    var sum = x + y;
    return sum;
  },
  subtract: function (x, y) {
    var difference = x - y;
    return difference;
  },
  multiply: function (x, y) {
    var product = x * y;
    return product;
  },
  divide: function (x, y) {
    var quotient = x / y;
    return quotient;
  },
  square: function (x) {
    var squared = x * x;
    return squared;
  },
  sumAll: function (numbers) {
    var start = 0;
    for (const value of numbers) {
      start += value;
    }
    return start;
  },
  getAverage: function (numbers) {
    var summed = 0;
    for (const value of numbers) {
      summed += value;
    }
    var average = summed / numbers.length;
    return average;
  }
};
