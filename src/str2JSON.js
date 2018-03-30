/*!
 * str2JSON：复杂结构的查询字符串到JSON对象的转换
 * @version: 1.0.0
 * @author Kyle Huang
 */
; (function (global, factory) {

    if (typeof define === 'function' && define.amd) {
        define(factory);
    }
    else if (typeof exports === 'object' && typeof module !== 'undefined') {
        module.exports = factory();
    }
    else {
        global.str2JSON = factory();
    }

}(this, function () {
    'use strict';

    function str2JSON(str) {

        str = str || "";

        // 分离字符串的正则表达式
        var pattern = /([^=&]*)=([^=&]*)/g,
            keyPattern = /([^\.]+)/g,
            arrPattern = /([^\[\]]*)\[(\d+)?\]/,
            arr2Pattern = /([^\[\]]*)\[\]/,
            obj = {}, key, value;

        // 处理由点号隔开的命名空间
        var handleNS = function (name, value) {

            var cur, ns = obj, i = 0, l = name.split(".");

            while (keyPattern.exec(name)) {
                cur = RegExp.$1;
                i++;
                if (i === l.length) {
                    if (arr2Pattern.test(cur)) {
                        var arrName = RegExp.$1;
                        if (ns[arrName]) {
                            ns[arrName].push(value);
                        } else {
                            ns[arrName] = [value];
                        }
                    } else {
                        ns[cur] = value;
                    }
                } else {
                    if (!ns[cur]) {
                        if (arr2Pattern.test(cur)) {
                            var arrName = RegExp.$1;
                            ns = ns[arrName] = [];
                        } else {
                            ns = ns[cur] = {};
                        }
                    } else {
                        ns = ns[cur];
                    }
                }
            }
        };

        // 处理键名为数组的情况
        var handleArr = function (n, ns, idx, curobj) {

            if (!curobj[ns]) {
                curobj[ns] = [];
            }

            if (idx !== "") {
                curobj[ns][idx] = curobj[n];
            } else {
                curobj[ns].push(curobj[n]);
            }

            // 处理键名为数组的情况
            for (var ni in curobj[n]) {
                if (arrPattern.test(ni)) {
                    handleArr(ni, RegExp.$1, RegExp.$2, curobj[n]);
                }
            }

            delete curobj[n];
        };

        // 分离字符串
        while (pattern.exec(str)) {

            key = decodeURIComponent(RegExp.$1);
            value = decodeURIComponent(RegExp.$2);

            handleNS(key, value);
        }

        // 处理键名为数组的情况
        for (var n in obj) {
            if (arrPattern.test(n)) {
                handleArr(n, RegExp.$1, RegExp.$2, obj);
            }
        }

        return obj;
    }

    return str2JSON;
}));