// 买卖股票的最佳时机
// 暴力求解 - 遍历

let maxProfit = function (prices) {
  let max = 0
  for (let i = 0; i < prices.length - 1; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      let res = prices[j] - prices[i]
      if (res > max) max = res
    }
  }
  return max
}

// 动态规划
let maxProfit = function (prices) {
  let minPrice = Number.MAX_VALUE
  let max_profit = 0
  for (let i=0;i < prices.length; i++) {
    if (prices[i] < minPrice) {
      minPrice = prices[i]
    } else if (prices[i] - minPrice > max_profit) {
      max_profit = prices[i] - minPrice
    }
  }
  return max_profit
}



// 买卖股票的最佳时机 2
let maxProfit = function (prices) {
  let len = prices.length
  if (len < 2) return 0
  // 错误1: let dp = [] Reference Error
  let dp = new Array(len).fill().map(() => new Array(2).fill())
  // dp[i][j] i - 第i天, j - 0(持有现金)/1(持有股票)
  dp[0][0] = 0 // 错误2: dp[0][0] = prices[0]
  dp[0][1] = -prices[0]
  // 错误3: i++
  for (let i = 1; i < len; ++i) {
    dp[i][0] = Math.max(dp[i-1][0], dp[i-1][1] + prices[i])
    dp[i][1] = Math.max(dp[i-1][1], dp[i-1][0] - prices[i])
  }
  return dp[len - 1][0]
}

 // 优化 - 
 
 // 每一天的状态只与前一天的状态有关，而与更早的状态都无关，因此我们不必存储这些无关的状态，
 // 只需要将 \textit{dp}[i-1][0]dp[i−1][0] 和 \textit{dp}[i-1][1]dp[i−1][1] 存放在两个变量中，
 // 通过它们计算出 \textit{dp}[i][0]dp[i][0] 和 \textit{dp}[i][1]dp[i][1] 并存回对应的变量，以便于第 i+1i+1 天的状态转移即可

var maxProfit = function(prices) {
  const n = prices.length;
  let dp0 = 0, dp1 = -prices[0];
  for (let i = 1; i < n; ++i) {
      let newDp0 = Math.max(dp0, dp1 + prices[i]);
      let newDp1 = Math.max(dp1, dp0 - prices[i]);
      dp0 = newDp0;
      dp1 = newDp1;
  }
  return dp0;
};