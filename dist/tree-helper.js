var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    function findRecursive(obj, fn, childrenKey) {
        if (fn(obj))
            return obj;
        else if (obj[childrenKey]) {
            for (var _i = 0, _a = obj[childrenKey]; _i < _a.length; _i++) {
                var child = _a[_i];
                var childrenResult = findRecursive(child, fn, childrenKey);
                if (childrenResult)
                    return childrenResult;
            }
        }
        return null;
    }
    exports.findRecursive = findRecursive;
    var pathList = [];
    function findPathRecursive(obj, fn, childrenKey) {
        pathList.push(obj);
        if (fn(obj))
            return pathList;
        else if (obj[childrenKey]) {
            for (var _i = 0, _a = obj[childrenKey]; _i < _a.length; _i++) {
                var child = _a[_i];
                var childrenResult = findPathRecursive(child, fn, childrenKey);
                if (childrenResult)
                    return childrenResult;
            }
            pathList.pop();
        }
        else {
            pathList.pop();
        }
        return null;
    }
    exports.findPathRecursive = findPathRecursive;
    var flattenList = [];
    function flattenRecursive(obj, childrenKey) {
        flattenList.push(obj);
        if (obj[childrenKey]) {
            for (var _i = 0, _a = obj[childrenKey]; _i < _a.length; _i++) {
                var child = _a[_i];
                flattenRecursive(child, childrenKey);
            }
        }
        return flattenList;
    }
    exports.flattenRecursive = flattenRecursive;
    function mapRecursive(obj, index, fn, childrenKey) {
        var newItem = __assign({}, fn(obj, index));
        if (obj[childrenKey])
            newItem[childrenKey] = obj[childrenKey].map(function (child, tIndex) { return mapRecursive(child, tIndex, fn, childrenKey); });
        return newItem;
    }
    exports.mapRecursive = mapRecursive;
    function clearPathList() {
        pathList = [];
    }
    exports.clearPathList = clearPathList;
    function clearFlattenList() {
        flattenList = [];
    }
    exports.clearFlattenList = clearFlattenList;
});
//# sourceMappingURL=tree-helper.js.map