// 模拟宝藏地图API - 增强版（带海底遗迹情节）
class TreasureMap {
  // 获取初始线索
  static getInitialClue() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("在古老的图书馆里找到了一张泛黄的羊皮纸...");
      }, 1000);
    });
  }

  // 解码古老文字
  static decodeAncientScript(clue) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!clue) {
          reject("没有线索可以解码!");
        }
        resolve('解码成功!羊皮纸上标记着前往"迷雾森林"的路线...');
      }, 1500);
    });
  }

  // 穿越迷雾森林
  static crossMistForest(location) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const random = Math.random();
        if (random < 0.3) {
          reject("糟糕!在迷雾中迷失了方向，被森林精灵送回了起点!");
        }
        resolve("成功穿越迷雾森林，前方出现了一座古老的神庙...");
      }, 2000);
    });
  }

  // 探索神庙
  static searchTemple(location) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const random = Math.random();
        if (random < 0.4) {
          reject("糟糕!触发了神庙机关，必须重新开始探索...");
        }
        resolve("找到了神庙的密室入口，但需要解开石门上的谜题...");
      }, 2000);
    });
  }

  // 解开石门谜题
  static solveStoneDoorPuzzle(puzzle) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const random = Math.random();
        if (random < 0.35) {
          reject("谜题解答错误，石门纹丝不动!");
        }
        resolve("谜题解开了!石门缓缓打开，露出了里面的宝箱...");
      }, 1800);
    });
  }

  // 打开宝箱
  static openTreasureBox() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const random = Math.random();
        if (random < 0.2) {
          reject("宝箱被下了诅咒!寻宝之旅失败了...");
        }
        resolve("恭喜!你找到了传说中的宝藏!宝箱中装满了金银珠宝和神秘的古代文物!");
      }, 1000);
    });
  }

  // 探索海底遗迹（新增情节）
  static exploreUnderwaterRuins() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const random = Math.random();
        if (random < 0.25) {
          reject("在海底遗迹中遇到了危险的海洋生物，不得不返回水面!");
        }
        resolve("在海底遗迹中发现了通往最终宝藏的秘密通道!");
      }, 2500);
    });
  }
}

// 原始的Promise链式实现
function findTreasureWithPromises() {
  console.log("=== 使用Promise链的寻宝之旅开始了 ===");
  TreasureMap.getInitialClue()
    .then(clue => {
      console.log(clue);
      return TreasureMap.decodeAncientScript(clue);
    })
    .then(location => {
      console.log(location);
      return TreasureMap.crossMistForest(location);
    })
    .then(temple => {
      console.log(temple);
      return TreasureMap.searchTemple(temple);
    })
    .then(puzzle => {
      console.log(puzzle);
      return TreasureMap.solveStoneDoorPuzzle(puzzle);
    })
    .then(box => {
      console.log(box);
      return TreasureMap.openTreasureBox();
    })
    .then(treasure => {
      console.log(treasure);
      console.log("=== 寻宝之旅圆满结束 ===");
    })
    .catch(error => {
      console.error("任务失败:", error);
      console.log("=== 寻宝之旅结束 ===");
    });
}

// 使用async/await的增强版实现（包含海底遗迹情节）
async function findTreasureWithAsyncAwait() {
  console.log("\n=== 使用async/await的寻宝之旅开始了 ===");
  try {
    const initialClue = await TreasureMap.getInitialClue();
    console.log(initialClue);
    
    const decodedMap = await TreasureMap.decodeAncientScript(initialClue);
    console.log(decodedMap);
    
    const forestPath = await TreasureMap.crossMistForest(decodedMap);
    console.log(forestPath);
    
    const templeDiscovery = await TreasureMap.searchTemple(forestPath);
    console.log(templeDiscovery);
    
    const puzzleSolved = await TreasureMap.solveStoneDoorPuzzle(templeDiscovery);
    console.log(puzzleSolved);
    
    // 新增海底遗迹探索情节
    const underwaterSecret = await TreasureMap.exploreUnderwaterRuins();
    console.log(underwaterSecret);
    
    const finalTreasure = await TreasureMap.openTreasureBox();
    console.log(finalTreasure);
    
    console.log("=== 寻宝之旅圆满结束 ===");
    return finalTreasure;
  } catch (error) {
    console.error("任务失败:", error);
    console.log("=== 寻宝之旅结束 ===");
    throw error;
  }
}

// 导出方法以便在浏览器中使用
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    TreasureMap,
    findTreasureWithPromises,
    findTreasureWithAsyncAwait
  };
} else {
  window.TreasureMap = TreasureMap;
  window.findTreasureWithPromises = findTreasureWithPromises;
  window.findTreasureWithAsyncAwait = findTreasureWithAsyncAwait;
}

// 在Node.js环境中运行时执行
if (typeof require !== 'undefined' && typeof window === 'undefined') {
  // 先运行Promise版本
  findTreasureWithPromises();
  
  // 延迟运行async/await版本，以便观察两者的区别
  setTimeout(() => {
    findTreasureWithAsyncAwait().catch(err => {
      // 错误已经在函数内部处理，这里只是为了避免Node.js的未处理Promise拒绝警告
    });
  }, 12000);
}