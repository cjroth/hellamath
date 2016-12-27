var overload = require('operator-overloading');
overload(function () {

    Array.prototype.__plus = function(left) {
        if (!(left instanceof Array)) {
            return left + this;
        }
        return this.map(function(m, i) {
            return m + left[i]
        })
    }

    console.log([1,2,3] + [4,5,6])

})()
