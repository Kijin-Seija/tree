/**
 * 源数据结构
 * @description 源数据应该为对象，并且有一个以childrenKey为key的子节点数组
 */
export interface Src extends Object {}

/**
 * find查找内部循环方法
 * @param {Src} src 当前遍历节点的数据源
 * @param {Number} index 当前遍历节点在其兄弟节点中的index
 */
export interface FindMethod {
  (src: Src): boolean
}

/**
 * map遍历内部循环方法
 * @param {Src} src 当前遍历节点的数据源
 */
export interface MapMethod {
  (src: Src, index: number): Src
}


/**
 * tree 类定义
 */
export interface TreeImpl {
  _src: Src
  childrenKey: string

  leafs(): TreeImpl[]
  bottoms(): TreeImpl[]
  children(): TreeImpl[]
  equals(anotherTree: TreeImpl, key: string): boolean
  find(fn: FindMethod): TreeImpl
  findPath(fn: FindMethod): TreeImpl[]
  findSiblings(fn: FindMethod): TreeImpl[]
  flatten(): TreeImpl[]
  isEmpty(): boolean
  map(fn: MapMethod, rootIndex: number): TreeImpl
  src(): Src
}