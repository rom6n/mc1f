import { useState } from "react";

function MainPage() {
  const [smallestNumber, setSmallestNumber] = useState<number>(1);
  const [number, setNumber] = useState<number>(1);
  let [numberRolls, setNumberRolls] = useState<number>(0);

  function random_number() {
    for (let i = 0; i < 1; i++) {
      const random_str = Math.random().toFixed(6);
      const random = Number(random_str);
      setNumber(random);
      setNumberRolls((prev) => prev + 1);
      if (random < smallestNumber) {
        setSmallestNumber(random);
      }
    }
  }
  return (
    <>
      <div>
        <h1>Главная страница</h1>
      </div>
      <div>
        <button onClick={random_number} className="button">
          Roll: {numberRolls}
        </button>
        <h2>Выпало: {number}</h2>
        <h2>Наименьшее: {smallestNumber}</h2>
      </div>
    </>
  );
}

export default MainPage;
