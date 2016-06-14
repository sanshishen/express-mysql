/**
 * util 
 * @author  sanshishen
 * @email   sanshishen@qq.com
 * @date    2016-06-14 14:26:43
 * @version 1.0.0
 */
'use strict';
module.exports = {
    extend: function(target, source, flag) {
        for(var key in source) {
            if(source.hasOwnProperty(key))
                flag ?
                    (target[key] = source[key]) :
                    (target[key] === void 0 && (target[key] = source[key]));
        }
        return target;
    },
    clone: function(obj) {
        if (typeof obj == "function" || Object(obj) !== obj) {
            return obj;
        }
        var res = new obj.constructor;
        for (var key in obj) if (obj.hasOwnProperty(key)) {
            res[key] = this.clone(obj[key]);
        }
        return res;
    }
};