import { wallet , tezos , CheckIfWalletConnected} from "./wallet";
import { AchievementNFT } from "../../common/constants";
import { char2Bytes } from '@taquito/utils';

let id = 3;

export const mintAchievement = async (
    metadata,
    address
  ) => {
    try {
      const WALLET_RESP = await CheckIfWalletConnected(wallet);
      if (!WALLET_RESP.success) {
        throw new Error('Wallet connection failed');
      }

      const acievementInstance = await tezos.contract.at(AchievementNFT);
      const storage = await acievementInstance.storage();
      const tokenId = await storage.all_tokens;

      let batch = null;
      // Approve call for FA1.2 type token
        batch = tezos.wallet
          .batch()
          .withContractCall(acievementInstance.methods.mint(address , 1 , {"" : char2Bytes("ipfs://" + metadata)} , tokenId.length));
  
      const batchOperation = await batch.send();
  
      await batchOperation.confirmation().then(() => batchOperation.opHash);
      return {
        success: true,
        operationId: batchOperation.hash,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        error,
      };
    }
  };
