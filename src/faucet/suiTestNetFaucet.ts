import { getFaucetHost, requestSuiFromFaucetV0 } from "@mysten/sui.js/faucet";

export const requestSuiFromFaucet = async (suiAddress: string) => {
  return await requestSuiFromFaucetV0({
    host: getFaucetHost("testnet"),
    recipient: suiAddress,
  });
};
