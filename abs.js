if (typeof window === 'undefined') {
    var m = require('./abs.asm')
} else {
    var m = Module
}

function maxJS(one, two) {
    return one.map(function(e, i) {
        return e + two[i]
    })
}

function maxASM(one, two) {
    var asmFunc = m.cwrap('absolute', 'number', ['number', 'number', 'number', 'number'])
    var length = one.length
    var data = {
        one: new Uint8Array(new Float64Array(one).buffer),
        two: new Uint8Array(new Float64Array(two).buffer)
    }
    var buffer = {
        one: m._malloc(length),
        two: m._malloc(length)
    }
    m.HEAPU8.set(data, buffer)

    var dataOut = new Uint8Array(length)
    var bufferOut = m._malloc(dataOut.length)

    r = asmFunc(buffer.one, buffer.two, bufferOut, length)

    var result = []
    for (i = 0; i < length; i++) {
        var item = m.getValue(bufferOut + i * 8, 'double')
        result.push(item)
    }
    return result
}

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

var jsResult = benchmark(maxJS.bind(null, makeArray(5e6), makeArray(5e6)), 1)
var asmResult = benchmark(maxASM.bind(null, makeArray(5e6), makeArray(5e6)), 1)
var percentFaster = Math.round(jsResult / asmResult * 100 - 100)
console.log(`js: ${jsResult}, asm: ${asmResult}... asm is ${percentFaster}% faster`)
