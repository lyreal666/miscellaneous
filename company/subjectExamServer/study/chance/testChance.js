const Chance = require('chance');

const chance = new Chance();
console.log(chance.integer());
console.log(chance.integer({ min: -10, max: 100 }));
chance.set('num', [3, 1, 6, 9, 8, 5, 4, 2]);
console.log(chance.num());
