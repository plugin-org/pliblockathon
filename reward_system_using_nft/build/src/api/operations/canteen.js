import { wallet , tezos , CheckIfWalletConnected} from "./wallet";
import { Canteen , NCUCoin , FoodNFT } from "../../common/constants";

export const mintFood = async (
    caller,
    foodId,
    cost,
  ) => {
    try {
      const WALLET_RESP = await CheckIfWalletConnected(wallet);
      if (!WALLET_RESP.success) {
        throw new Error('Wallet connection failed');
      }

      const canteenInstance = await tezos.contract.at(Canteen);
      const coinInstance = await tezos.contract.at(NCUCoin);

      let batch = null;
      // Approve call for FA1.2 type token
        batch = tezos.wallet
          .batch()
          .withContractCall(coinInstance.methods.approve(Canteen, cost))
          .withContractCall(
            canteenInstance.methods.mintFood(
              foodId
            ),
          );
  
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

  export const burnFood = async (
    caller,
    foodId,
    amount,
  ) => {
    try {
      const WALLET_RESP = await CheckIfWalletConnected(wallet);
      if (!WALLET_RESP.success) {
        throw new Error('Wallet connection failed');
      }

      const canteenInstance = await tezos.contract.at(Canteen);
      const foodNFTInstance = await tezos.contract.at(FoodNFT);

      let batch = null;
      
    //   FA2 calling
      batch = tezos.wallet
          .batch()
          .withContractCall(
            foodNFTInstance.methods.update_operators([
              {
                add_operator: {
                  owner: caller,
                  operator: Canteen,
                  token_id: foodId,
                },
              },
            ]),
          )
          .withContractCall(
            canteenInstance.methods.burnFood(
              amount,
              foodId
            ),
          )
          .withContractCall(
            foodNFTInstance.methods.update_operators([
              {
                remove_operator: {
                  owner: caller,
                  operator: Canteen,
                  token_id: foodId,
                },
              },
            ]),
          );
  
      const batchOperation = await batch.send();
  
      await batchOperation.confirmation().then(() => batchOperation.opHash);
      return {
        success: true,
        operationId: batchOperation.opHash,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        error,
      };
    }
  };

  export const payFine = async (
    caller,
    cost,
  ) => {
    try {
      cost = cost*1000000;
      const WALLET_RESP = await CheckIfWalletConnected(wallet);
      if (!WALLET_RESP.success) {
        throw new Error('Wallet connection failed');
      }

      const canteenInstance = await tezos.contract.at(Canteen);
      const coinInstance = await tezos.contract.at(NCUCoin);

      let batch = null;
      // Approve call for FA1.2 type token
        batch = tezos.wallet
          .batch()
          .withContractCall(coinInstance.methods.approve(Canteen, cost))
          .withContractCall(
            canteenInstance.methods.payFine(
              cost
            ),
          );
  
      const batchOperation = await batch.send();
  
      await batchOperation.confirmation().then(() => batchOperation.opHash);
      return {
        success: true,
        operationId: batchOperation.opHash,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        error,
      };
    }
  };

