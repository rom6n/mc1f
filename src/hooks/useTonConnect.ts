import { useTonConnectUI } from '@tonconnect/ui-react';
import { type Sender, type SenderArguments } from '@ton/core';

export function useTonConnect(): { sender: Sender; connected: boolean; user_address: string | undefined } {
  const [tonConnectUI] = useTonConnectUI();

  return {
    sender: {
      send: async (args: SenderArguments) => {
        tonConnectUI.sendTransaction({
          messages: [
            {
              address: args.to.toString(),
              amount: args.value.toString(),
              payload: args.body?.toBoc().toString('base64'),
            },
          ],
          validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
        });
      },
    },
    connected: tonConnectUI.connected,
    user_address: tonConnectUI.wallet?.account.address,
  };
}