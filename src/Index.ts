import { requestSuiFromFaucet } from "./faucet/suiTestNetFaucet";
import { Mnomonic } from "./lib/mnomonic";
import { SuiWallet } from "./lib/wallet";

const main = async () => {
  // Generate Mnemonic
  const mnemonic = await new Mnomonic().generateMnemonicAsync();
  console.log("Mnemonic: " + mnemonic);

  // Generate Wallet
  const wallet = await new SuiWallet().generateWalletAsync({
    mnemonic,
    path: 0,
  });

  console.log("Address: " + wallet.address);
  console.log("Private Key: " + wallet.privateKey);
  console.log("Public Key: " + wallet.publicKey);

  // Faucet
  const faucetResponse = await requestSuiFromFaucet(
    "0xdfb2d2eec3005007b4575124b1c9787342216b8e88b3923e7a8097cf3fc131ca"
  );
  console.log(`Response : ${JSON.stringify(faucetResponse)}`);
};

main()
  .then()
  .catch((ex) => console.log(ex.message));
