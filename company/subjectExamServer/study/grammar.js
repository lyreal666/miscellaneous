let objArray = [
    { name: 'ly', age: 20 },
    { name: 'dsy', age: 18 }
]

objArray.map(person => person.name = 'aa')
console.log(objArray);
// [ { name: 'aa', age: 20 }, { name: 'aa', age: 18 } ]