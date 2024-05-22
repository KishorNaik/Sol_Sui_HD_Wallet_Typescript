import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";

export interface GenerateWalletOptions {
  mnemonic: string;
  path: number;
}

export interface GenerateWalletResult {
  address: string;
  privateKey: string;
  publicKey: string;
}

export interface ISuiWallet {
  generateWalletAsync(
    params: GenerateWalletOptions
  ): Promise<GenerateWalletResult>;
}

export class SuiWallet implements ISuiWallet {
  public generateWalletAsync(
    params: GenerateWalletOptions
  ): Promise<GenerateWalletResult> {
    return new Promise((resolve, reject) => {
      try {
        // Get Seed and Path
        const { mnemonic, path } = params;

        // Config HD Wallet
        const hdWalletPath = `m/44'/784'/0'/0'/${path}'`;

        // Create a keypair under Ed25519 scheme.
        const keyPair = Ed25519Keypair.deriveKeypair(mnemonic, hdWalletPath);

        // Get Public Key
        const publicKey = keyPair.getPublicKey().toBase64();
        // Get Private Key
        const privateKey = keyPair.getSecretKey().toString();

        // Instantiate a new SuiClient for the testnet
        const client = new SuiClient({
          url: getFullnodeUrl("testnet"),
        });

        // Get the Sui address from the public key
        const address = keyPair.getPublicKey().toSuiAddress();

        const result: GenerateWalletResult = {
          address: address,
          privateKey,
          publicKey,
        };
        resolve(result);
      } catch (ex) {
        reject(ex);
      }
    });
  }
}
