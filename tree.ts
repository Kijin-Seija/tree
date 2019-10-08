import { Src, FindMethod, MapMethod, TreeImpl } from "./interfaces";
import { findRecursive, findPathRecursive, clearPathList, flattenRecursive, clearFlattenList, mapRecursive } from './tree-helper'

/*
 * 树形结构相关方法
 * 使用方式 tree(data).method1().method2()...
 * 除特别声明外，每个方法都返回Tree对象或Tree对象数组
 * tree.src - Tree对象实际存储的数据结构, 可以是数组或对象。如果是空树，该值为一个空对象
 * tree.childrenKey - 子节点key，默认为children
 * TODO：移到公共组件库   wanjie
 */
class Tree implements TreeImpl {
  _src: Src
  childrenKey: string

  constructor(src: Src, childrenKey: string = 'children') {
    this._src = src || {};
    this.childrenKey = childrenKey;
  }

  /**
   * 获取所有叶节点，叶节点为没有子节点的节点
   * @returns {Array<Tree>} 所有最底层节点子树构成的数组
   */
  leafs(): Tree[] {
    return this.flatten().filter(item => !item.children().length);
  }

  /**
   * 获取所有叶节点
   * @deprecated 旧方法名, 即将被leaf()替代
   * @returns {Array<Tree>} 所有最底层节点子树构成的数组
   */
  bottoms(): Tree[] {
    return this.leafs();
  }

  /**
   * 返回该节点的子节点列表, 没有则为空数组
   * @returns {Array<Tree>} 子节点列表
   */
  children(): Tree[] {
    if (!this.src()[this.childrenKey]) return [];
    else return this.src()[this.childrenKey].map((child: Src) => new Tree(child, this.childrenKey));
  }

  /**
   * 判断两棵树是否相等，通过指定的key来判断
   * 如果不传key参数，默认搜索对象中的id判断
   * @param {Tree} anotherTree 另一棵树
   * @param {String} key 判断key
   * @returns {Boolean}
   */
  equals(anotherTree: Tree, key: string = 'id'): boolean {
    return this.src()[key] && anotherTree.src[key] && this.src()[key] === anotherTree.src[key];
  }

  /**
   * 查找树中的一个节点
   * @param {Function} fn 查找判断方法，通过返回值falsy状态判断是否是查找目标
   * @returns {Tree} 结果节点子树，如果没有找到返回一个空树
   */
  find(fn: FindMethod): Tree {
    return new Tree(findRecursive(this.src(), fn, this.childrenKey), this.childrenKey);
  }

  /**
   * 查找树中到某一节点所经过的路径
   * @param {Function} fn 查找判断方法，通过返回值falsy状态判断是否是查找目标
   * @returns {Array<Tree>} 到所查找项的路径节点子树数组，由上层至下层。
   * 例： [1, 2:[3, 4, 5: [6, 7]]] 查找7 会返回 [2, 5, 7]
   */
  findPath(fn: FindMethod): Tree[] {
    clearPathList();
    let result = findPathRecursive(this.src(), fn, this.childrenKey);
    if (result) return result.map(item => new Tree(item, this.childrenKey));
    else return [];
  }

  /**
   * 查找树中与某一节点同级节点数组，包括自身
   * @param {Tree} childTree
   * @returns {Array<Tree>}
   */
  findSiblings(fn: FindMethod): Tree[] {
    let path = this.findPath(fn);
    if (path.length < 2) return [this];
    else return path[path.length - 2].children();
  }

  /**
   * 将所有层级的节点展平为一个数组
   * @returns {Array<Tree>} 所有节点子树构成的数组
   */
  flatten(): Tree[] {
    clearFlattenList();
    return flattenRecursive(this.src(), this.childrenKey).map((item: Src): Tree => { return new Tree(item, this.childrenKey) });
  }

  /**
   * 判断是否为空树
   * @returns {Boolean}
   */
  isEmpty(): boolean {
    return Object.keys(this.src()).length === 0;
  }


  /**
   * 遍历整个树执行动作，返回一棵拓扑结构相同的新树，用法类似Array.map
   * @param {Function} fn 遍历方法，需要返回新节点对象。接受两个参数
   *    @param {Object} item 当前遍历Tree的src
   *    @param {Number} index 当前遍历tree在其兄弟树中的index
   * @param {Number} rootIndex 可选，根元素index
   */
  map(fn: MapMethod, rootIndex: number = 0): Tree {
    return new Tree(mapRecursive(this.src(), rootIndex, fn, this.childrenKey), this.childrenKey);
  }

  /**
   * 返回树的src
   */
  src(): Src {
    return this._src;
  }
}

export default function (arrOrObj: Src, childrenKey: string = 'children') {
  return new Tree(arrOrObj || {}, childrenKey);
}
