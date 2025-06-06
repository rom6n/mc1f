import { useEffect, useState } from "react";
import { useTonClient } from "./useTonClient";
import { Address, type OpenedContract } from "@ton/core";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { MyContract } from "../contracts/MyContract";
import { address, toNano } from "@ton/core";
import { useTonConnect } from "./useTonConnect";

export function useMyContract() {
    const client = useTonClient();
    const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));
    const {sender} = useTonConnect();

    const [contractData, setContractData] = useState<null | {
    owner: Address;
    access: number;
    recent_sender: Address;
    message_text: string;
    message_time: bigint;
  }>();

  const [balance, setBalance] = useState<null | bigint>(toNano(0));

  const myContract = useAsyncInitialize(async () => {
    if (!client) return;
    const parsedAddress = Address.parse("EQBnodt3mWVa3p3hKj4f_5f6Sx2XSz6ihqrzlCRpsY97SItk");
    console.log("file: useMyContract.ts:22 ~ myContract ~ parsedAddress:", parsedAddress.toString());


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
        })
        const contract_balance = await myContract.getBalance();
        setBalance(contract_balance);

        sleep(2500);
        contractUse();
    }
    contractUse();
  }, [myContract])

  return {
    sendMessage: async (message_text: string) => {
      await myContract?.sendMessageEdit(sender, toNano(0.01), message_text);
    },
    sendChangeAccess: async (new_access: number) => {
      await myContract?.sendChangeAccess(sender, toNano(0.01), new_access);
    },
    sendDeleteMessage: async () => {
      await myContract?.sendDeleteMessage(sender, toNano(0.01));
    },
    sendTransferOwnership: async (transfer_to: Address) => {
      await myContract?.sendTransferOwnership(sender, toNano(0.01), transfer_to);
    },
    sendDeposit: async (amount: bigint) => {
      await myContract?.sendDeposit(sender, amount);
    },
    sendWithdraw: async (amount: bigint) => {
      await myContract?.sendWithdraw(sender, toNano(0.01), amount);
    },
    contract_balance: balance,
    ...contractData,
  }

}