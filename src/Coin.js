import { useState, useEffect } from "react";

function App() {
  const [loading, setLoding] = useState(true);
  const [coins, setCoins] = useState([]); // 기본값을 지정해주지 않으면 unfield가 들어가서 에러가 뜬다
  const [usd, setUsd] = useState(0);
  const [symbol, setSymbol] = useState("");
  const [price, setPrice] = useState(0);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setSymbol(json[0].symbol);
        setPrice(json[0].quotes.USD.price);
        setLoding(false);
      });
  }, []);

  const inputUsd = (event) => setUsd(event.target.value);
  const onChange = (event) => {
    let index = event.target.selectedIndex;
    console.log(index);
    let coin = coins[index];
    console.log(coin);
    setSymbol(coin.symbol);
    setPrice(coin.quotes.USD.price);
  };
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`} </h1>
      <p>you want choice coin</p>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={onChange}>
          {coins.map((coin) => (
            <option key={coin.id}>
              {coin.name}({coin.symbol}): ${coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
      <hr />
      <span>
        <input
          onChange={inputUsd}
          type="number"
          placeholder="Input your have USD"
        ></input>
        USD
      </span>

      <h1>
        I can buy {usd / price} {symbol}
      </h1>
    </div>
  );
}

export default App;
