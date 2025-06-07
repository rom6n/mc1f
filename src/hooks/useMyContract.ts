import { useEffect, useState } from "react";
import { useTonClient } from "./useTonClient";
import { Address, type OpenedContract } from "@ton/core";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { MyContract } from "../contracts/MyContract";
import { toNano } from "@ton/core";
import { useTonConnect } from "./useTonConnect";

export function useMyContract() {
  console.log("запуск");
  const client = useTonClient();
  const sleep = (time: number) =>
    new Promise((resolve) => setTimeout(resolve, time));
  const { sender } = useTonConnect();

  const [contractData, setContractData] = useState<null | {
    owner: Address;
    access: number;
    recent_sender: Address;
    message_text: string;
    message_time: bigint;
  }>();

  const [balance, setBalance] = useState<null | bigint>(toNano(0));

  const myContract = useAsyncInitialize(async () => {
    if (!client) {
      console.log("client не работает");
      return;
    }
    const parsedAddress = Address.parse(
      "kQBmfyvtydi0NBEofnMQHnbPcQW23jsD4SS2EnpoPU4C9EBh"
    );
    console.log(
      "file: useMyContract.ts:22 ~ myContract ~ parsedAddress:",
      parsedAddress.toString()
    );

    const contract = new MyContract(parsedAddress);
    return client.open(contract) as OpenedContract<MyContract>;
  }, [client]);

  useEffect(() => {
    async function contractUse() {
      if (!myContract) return;
      setContractData(null);
      const data = await myContract.getContractData();
      setContractData({
        owner: data.owner,
        access: data.access,
        recent_sender: data.recent_sender,
        message_text: data.message,
        message_time: data.message_time,
      });
      const contract_balance = await myContract.getBalance();
      setBalance(contract_balance);

      await sleep(5000);
      contractUse();
    }
    contractUse();
  }, [myContract]);

  return {
    sendMessage: async () => {
      const random = Math.floor(Math.random() * 167.3);
      const new_message = `Чье то сообщение ${random * 10}`;
      await myContract?.sendMessageEdit(sender, toNano(0.01), new_message);
    },
    sendChangeAccess: async () => {
      let new_access = 0;
      if (contractData?.access === 0) {
        new_access = 1;
      }
      await myContract?.sendChangeAccess(sender, toNano(0.01), new_access);
    },
    sendDeleteMessage: async () => {
      await myContract?.sendDeleteMessage(sender, toNano(0.01));
    },
    sendTransferOwnership: async (transfer_to: Address) => {
      await myContract?.sendTransferOwnership(
        sender,
        toNano(0.01),
        transfer_to
      );
    },
    sendDeposit: async () => {
      await myContract?.sendDeposit(sender, toNano(0.5));
    },
    sendWithdraw: async () => {
      await myContract?.sendWithdraw(sender, toNano(0.01), toNano(0.5));
    },
    contract_balance: balance,
    ...contractData,
  };
}
