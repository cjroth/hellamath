var m = require('./a.out.js')

function max1(input) {
    var max1 = m.cwrap('absolute', 'number', ['number', 'number', 'number'])

    var data = new Uint8Array(new Float64Array(input).buffer)
    var buffer = m._malloc(data.length);
    m.HEAPU8.set(data, buffer);

    var dataOut = new Uint8Array(input.length)
    var bufferOut = m._malloc(dataOut.length);

    r = max1(buffer, bufferOut, input.length)

    var result = [];
    for (i = 0; i < input.length; i++) {
        var item = m.getValue(bufferOut + i * 8, 'double')
        result.push(item);
    }
    return result;
}

function max2(input) {
    return input.map(Math.abs)
}

// var test = [-1, 2, -3]
// console.log('test', test, max1(test))

// var doo = new Uint8Array(bufferOut)
// console.log('result', result, dataOut, doo)

// var hello = m.cwrap('hello', null)
// var max1 = m.cwrap('max', 'number', ['number', 'number'])
//
// function max2(a, b) {
//     return Math.max(a, b)
// }
//

function makeArray(size) {
    var a = []
    a.length = size
    a.fill(100, 0, size)
    return a
}

function benchmark(func, iterations) {
    var t = Date.now()
    for (var i = 0; i < iterations; i++) {
        func()
    }
    return Date.now() - t
}

var one = benchmark(max1.bind(null, makeArray(5e7)), 1)
// console.log(one)
var two = benchmark(max2.bind(null, makeArray(5e7)), 1)
console.log(one, two)

// // d = benchmark(hello, 10)
// // console.log(d)
// var test = function(a) {
//     console.log(a)
// }
//
// var bound = test.bind(null, 'test')
// bound()
