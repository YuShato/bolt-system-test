const main = (operations) => {
  const uniqueNames = Array.from(
    new Set(operations.map((item) => item.ticker))
  );

  const getTickerProfit = (ticker) => {
    return (ticker.type === "BUY" ? -1 : 1) * ticker.price * ticker.qnt;
  };

  const getPortfolioArray = () => {
    return uniqueNames.map((name) => {
      let deal = {};
      deal[name] = operations
        .filter((item) => item.ticker === name)
        .reduce((acc, ticker) => acc + getTickerProfit(ticker), 0);
      return deal;
    });
  };

  const getAbsProfit = () => {
    return operations.reduce((acc, ticker) => {
      return acc + getTickerProfit(ticker);
    }, 0);
  };

  return {
    absProfit: getAbsProfit(),
    portfolio: Object.assign(...getPortfolioArray()),
  };
};

module.exports = main;
