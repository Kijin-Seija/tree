import { Src, FindMethod, MapMethod } from "./interfaces";

function findRecursive(obj: Src, fn: FindMethod, childrenKey: string): Src | null {
  if (fn(obj)) return obj;
  else if (obj[childrenKey]) {
    for (let child of obj[childrenKey]) {
      let childrenResult = findRecursive(child, fn, childrenKey);
      if (childrenResult) return childrenResult;
    }
  }
  return null;
}

let pathList: Src[] = [];
function findPathRecursive(obj: Src, fn: FindMethod, childrenKey: string): Src[] {
  pathList.push(obj);
  if (fn(obj)) return pathList;
  else if (obj[childrenKey]) {
    for (let child of obj[childrenKey]) {
      let childrenResult = findPathRecursive(child, fn, childrenKey);
      if (childrenResult) return childrenResult;
    }
    pathList.pop();
  } else {
    pathList.pop();
  }
  return null;
}

let flattenList: Src[] = [];
function flattenRecursive(obj: Src, childrenKey: string): Src[] {
  flattenList.push(obj);
  if (obj[childrenKey]) {
    for (let child of obj[childrenKey]) {
      flattenRecursive(child, childrenKey);
    }
  }
  return flattenList;
}


function mapRecursive(obj: Src, index: number, fn: MapMethod, childrenKey: string): Src {
  let newItem = {...fn(obj, index)};
  if (obj[childrenKey]) newItem[childrenKey] = obj[childrenKey].map((child: Src, tIndex: number) => mapRecursive(child, tIndex, fn, childrenKey));
  return newItem;
}

function clearPathList(): void {
  pathList = []
}

function clearFlattenList(): void {
  flattenList = []
}

export {
  findRecursive,
  findPathRecursive,
  flattenRecursive,
  clearPathList,
  clearFlattenList,
  mapRecursive
}