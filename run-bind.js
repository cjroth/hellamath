var bind = require('./bind')

var person = Module.findPersonAtLocation([10.2, 156.5]);
console.log('Found someone! Their name is ' + person.name + ' and they are ' + person.age + ' years old');
