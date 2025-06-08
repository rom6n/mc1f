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
      <div className="main_text">
        <h1>Главная страница</h1>
      </div>
        <div className="roll_button_div">
          <button onClick={random_number} className="roll_button">
            Roll: {numberRolls}
          </button>
        </div>
      <div className="roll_result">
        <h2>Выпало: {number}</h2>
        <h2>Наименьшее: {smallestNumber}</h2>
      </div>
    </>
  );
}

export default MainPage;
