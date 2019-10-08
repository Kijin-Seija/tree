(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./tree-helper"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var tree_helper_1 = require("./tree-helper");
    var Tree = (function () {
        function Tree(src, childrenKey) {
            if (childrenKey === void 0) { childrenKey = 'children'; }
            this._src = src || {};
            this.childrenKey = childrenKey;
        }
        Tree.prototype.leafs = function () {
            return this.flatten().filter(function (item) { return !item.children().length; });
        };
        Tree.prototype.bottoms = function () {
            return this.leafs();
        };
        Tree.prototype.children = function () {
            var _this = this;
            if (!this.src()[this.childrenKey])
                return [];
            else
                return this.src()[this.childrenKey].map(function (child) { return new Tree(child, _this.childrenKey); });
        };
        Tree.prototype.equals = function (anotherTree, key) {
            if (key === void 0) { key = 'id'; }
            return this.src()[key] && anotherTree.src[key] && this.src()[key] === anotherTree.src[key];
        };
        Tree.prototype.find = function (fn) {
            return new Tree(tree_helper_1.findRecursive(this.src(), fn, this.childrenKey), this.childrenKey);
        };
        Tree.prototype.findPath = function (fn) {
            var _this = this;
            tree_helper_1.clearPathList();
            var result = tree_helper_1.findPathRecursive(this.src(), fn, this.childrenKey);
            if (result)
                return result.map(function (item) { return new Tree(item, _this.childrenKey); });
            else
                return [];
        };
        Tree.prototype.findSiblings = function (fn) {
            var path = this.findPath(fn);
            if (path.length < 2)
                return [this];
            else
                return path[path.length - 2].children();
        };
        Tree.prototype.flatten = function () {
            var _this = this;
            tree_helper_1.clearFlattenList();
            return tree_helper_1.flattenRecursive(this.src(), this.childrenKey).map(function (item) { return new Tree(item, _this.childrenKey); });
        };
        Tree.prototype.isEmpty = function () {
            return Object.keys(this.src()).length === 0;
        };
        Tree.prototype.map = function (fn, rootIndex) {
            if (rootIndex === void 0) { rootIndex = 0; }
            return new Tree(tree_helper_1.mapRecursive(this.src(), rootIndex, fn, this.childrenKey), this.childrenKey);
        };
        Tree.prototype.src = function () {
            return this._src;
        };
        return Tree;
    }());
    function default_1(arrOrObj, childrenKey) {
        if (childrenKey === void 0) { childrenKey = 'children'; }
        return new Tree(arrOrObj || {}, childrenKey);
    }
    exports["default"] = default_1;
});
//# sourceMappingURL=tree.js.map