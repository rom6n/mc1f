import { TonConnectButton } from "@tonconnect/ui-react";
import { useMyContract } from "../hooks/useMyContract";
import { useEffect, useState } from "react";
import { toNano } from "ton-core";
import { fromNano } from "@ton/core";
import { useTonConnect } from "../hooks/useTonConnect";
import { useTonClient } from "../hooks/useTonClient";

function Contract() {
  const contract = useMyContract();
  const { connected } = useTonConnect();
  let [lastMessage, setLastMessage] = useState<string>("Загрузка...");
  let [lastSender, setLastSender] = useState<string>("Загрузка...");
  let [lastOwner, setLastOwner] = useState<string>("Загрузка...");
  let [lastTime, setLastTime] = useState<string>("Загрузка...");
  let [lastAccess, setLastAccess] = useState<string>("Загрузка...");
  let [lastBalance, setLastBalance] = useState<string>("Загрузка...");
  useEffect(() => {
    if (contract) {
      if (contract.message_text) {
        setLastMessage(contract.message_text); // или то, что ты хочешь отображать
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
        setLastTime(contract.message_time.toString());
      }

      if (contract.contract_balance) {
        setLastBalance(`${fromNano(contract.contract_balance)} TON`);
      }
    }
  }, [contract]);

  return (
    <div>
      <div>
        <h1></h1>
      </div>
      <div>
        <TonConnectButton />
      </div>
      <div>
        <h2>Контракт</h2>
      </div>
      <hr />
      <div>
        <b>Сообщение</b>
        <div className="Hint">{lastMessage}</div>
        <div className="Hint">UNIX {lastTime}</div>
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
      </div>
    </div>
  );
}

export default Contract;
