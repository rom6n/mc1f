import { TonConnectButton } from "@tonconnect/ui-react";
import { useMyContract } from "../hooks/useMyContract";
import { useEffect, useState } from "react";
import { fromNano } from "@ton/core";
import { useTonConnect } from "../hooks/useTonConnect";

function Contract() {
  const contract = useMyContract();
  const { connected } = useTonConnect();
  let [lastMessage, setLastMessage] = useState<string>("Загрузка...");
  let [lastSender, setLastSender] = useState<string>("Загрузка...");
  let [lastOwner, setLastOwner] = useState<string>("Загрузка...");
  let [lastTime, setLastTime] = useState<string>("Загрузка...");
  let [lastAccess, setLastAccess] = useState<string>("Загрузка...");
  let [lastBalance, setLastBalance] = useState<string>("Загрузка...");
  const contract_address = () => {
    const address_c = "kQBmfyvtydi0NBEofnMQHnbPcQW23jsD4SS2EnpoPU4C9EBh";
    return `${address_c.slice(0, 5)}...${address_c.slice(43)}`;
  };
  useEffect(() => {
    if (contract) {
      if (contract.message_text || contract.message_text === "") {
        if (contract.message_text === "") {
          setLastMessage("-");
        } else {
          setLastMessage(contract.message_text);
        }
      }

      if (contract.recent_sender) {
        setLastSender(
          `${contract.recent_sender
            .toString()
            .slice(0, 5)}...${contract.recent_sender.toString().slice(43)}`
        );
      }

      if (contract.owner) {
        setLastOwner(
          `${contract.owner.toString().slice(0, 5)}...${contract.owner
            .toString()
            .slice(43)}`
        );
      }

      if (contract.access || contract.access === 0) {
        let access_string = "Только для владельца";
        if (contract.access === 1) {
          access_string = "Разрешено всем";
        }
        setLastAccess(access_string);
      }

      if (contract.message_time) {
        const unix_milis = contract.message_time * BigInt(1000);
        const normal_time = new Date(Number(unix_milis));
        setLastTime(normal_time.toLocaleString());
      }

      if (contract.contract_balance) {
        setLastBalance(`${fromNano(contract.contract_balance)} TON`);
      }
    }
  }, [contract]);

  return (
    <div>
      <div className="hr_contract" />
      <div className="test_version_div">
        <h3 className="test_version">🔴 TESTNET 🔴</h3>
      </div>
      <div className="tonconnect_button_div">
        <div className="tonconnect_button">
          <TonConnectButton />
        </div>
      </div>
      <div className="contract">
        <h1>Контракт</h1>
      </div>
      <div className="contract_info">
        <h2>Информация</h2>
        <hr />
        <b>Сообщение</b>
        <div className="Hint">{lastMessage}</div>
        <div className="Hint">{lastTime}</div>
        <hr />
        <b>Отправитель</b>
        <div className="Hint">{lastSender}</div>
        <hr />
        <b>Отправка сообщений</b>
        <div className="Hint">{lastAccess}</div>
        <hr />
        <b>Баланс</b>
        <div className="Hint">{lastBalance}</div>
        <hr />
        <b>Владелец</b>
        <div className="Hint">{lastOwner}</div>
        <hr />
        <b>Адрес контракта</b>
        <div className="Hint">{contract_address()}</div>
      </div>
      <div className="contract_use">
        <h2>Действия</h2>
        <hr />
        {connected ? (
          <>
            <p>Отправить сообщение</p>
            <button onClick={contract.sendMessage}>Отправить</button>
            <hr />

            <p>Удалить сообщение</p>
            <button onClick={contract.sendDeleteMessage}>Удалить</button>
            <hr />

            <p>Изменить доступ</p>
            <button onClick={contract.sendChangeAccess}>Изменить</button>
            <hr />

            <p>Внести TON в контракт</p>
            <button onClick={contract.sendDeposit}>Внести 0.5 TON</button>
            <hr />

            <p>Вывести TON из контракта</p>
            <button onClick={contract.sendWithdraw}>Вывести 0.5 TON</button>
          </>
        ) : (
          <p>Подключите кошелёк, что бы увидеть действия</p>
        )}
      </div>
    </div>
  );
}

export default Contract;
