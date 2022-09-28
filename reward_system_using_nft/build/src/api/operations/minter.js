import { wallet , tezos , CheckIfWalletConnected} from "./wallet";
import { NcuCoinDistributor } from "../../common/constants";

export const claimDeanListAllowance = async (
    caller
  ) => {

    try {

      const WALLET_RESP = await CheckIfWalletConnected(wallet);
      if (!WALLET_RESP.success) {
        throw new Error('Wallet connection failed');
      }
      const contractInstance = await tezos.contract.at(NcuCoinDistributor);
      let batch = tezos.wallet.batch().withContractCall(contractInstance.methods.claimDeanListAllowance())
      const op = await batch.send();
      const hash = await op.confirmation(1);

      return {
        success: true,
        operationId: hash,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        error,
      };
    }
  };

export const claimSemestralAllowance = async (caller) => {
    try {
    
      const WALLET_RESP = await CheckIfWalletConnected(wallet);
      if (!WALLET_RESP.success) {
        throw new Error('Wallet connection failed');
      }
 
      const contractInstance = await tezos.contract.at(NcuCoinDistributor);
      let batch = tezos.wallet.batch().withContractCall(contractInstance.methods.claimSemestralAllowance())
      const op = await batch.send();
      const hash = await op.confirmation(1);

      return {
        success: true,
        operationId: hash,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        error,
      };
    }
  };

// Admin Functions

export const addStudent = async (
    caller,
    studentAddress,
  ) => {
    try {
     
      const WALLET_RESP = await CheckIfWalletConnected(wallet);
      if (!WALLET_RESP.success) {
        throw new Error('Wallet connection failed');
      }

      const contractInstance = await tezos.contract.at(NcuCoinDistributor);
      let batch = tezos.wallet.batch().withContractCall(contractInstance.methods.addStudent(studentAddress))
      const op = await batch.send();
      const hash = await op.confirmation(1);

      return {
        success: true,
        operationId: hash,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        error,
      };
    }
  };

export const removeStudent = async (
    caller,
    studentAddress,
  ) => {
    try {
     
      const WALLET_RESP = await CheckIfWalletConnected(wallet);
      if (!WALLET_RESP.success) {
        throw new Error('Wallet connection failed');
      }

      const contractInstance = await tezos.contract.at(NcuCoinDistributor);
      let batch = tezos.wallet.batch().withContractCall(contractInstance.methods.removeStudent(studentAddress))
      const op = await batch.send();
      const hash = await op.confirmation(1);

      return {
        success: true,
        operationId: hash,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        error,
      };
    }
  };

export const addDeansStudent = async (
    caller,
    studentAddress,
  ) => {
    try {
     
      const WALLET_RESP = await CheckIfWalletConnected(wallet);
      if (!WALLET_RESP.success) {
        throw new Error('Wallet connection failed');
      }

      const contractInstance = await tezos.contract.at(NcuCoinDistributor);
      let batch = tezos.wallet.batch().withContractCall(contractInstance.methods.addDeansStudent(studentAddress))
      const op = await batch.send();
      const hash = await op.confirmation(1);

      return {
        success: true,
        operationId: hash,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        error,
      };
    }
  };

export const togglePause = async (
    caller
  ) => {
    try {
     
      const WALLET_RESP = await CheckIfWalletConnected(wallet);
      if (!WALLET_RESP.success) {
        throw new Error('Wallet connection failed');
      }

      const contractInstance = await tezos.contract.at(NcuCoinDistributor);

      let batch = tezos.wallet.batch().withContractCall(contractInstance.methods.togglePause())
      const op = await batch.send();
      const hash = await op.confirmation(1);

      return {
        success: true,
        operationId: hash,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        error,
      };
    }
  };

export const updateAdmin = async (
    caller,
    newAdmin
  ) => {
    try {
     
      const WALLET_RESP = await CheckIfWalletConnected(wallet);
      if (!WALLET_RESP.success) {
        throw new Error('Wallet connection failed');
      }

      const contractInstance = await tezos.contract.at(NcuCoinDistributor);
      let batch = tezos.wallet.batch().withContractCall(contractInstance.methods.updateAdmin(newAdmin))
      const op = await batch.send();
      const hash = await op.confirmation(1);

      return {
        success: true,
        operationId: hash,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        error,
      };
    }
  };

export const updateAmount = async (
    caller,
    newAmount
  ) => {
    try {
     
      const WALLET_RESP = await CheckIfWalletConnected(wallet);
      if (!WALLET_RESP.success) {
        throw new Error('Wallet connection failed');
      }

      const contractInstance = await tezos.contract.at(NcuCoinDistributor);

      let batch = tezos.wallet.batch().withContractCall(contractInstance.methods.updateAmount(newAmount))
      const op = await batch.send();

      const hash = await op.confirmation(1);

      return {
        success: true,
        operationId: hash,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        error,
      };
    }
  };

export const updateTime = async (
    caller,
    newTime
  ) => {
    try {
     
      const WALLET_RESP = await CheckIfWalletConnected(wallet);
      if (!WALLET_RESP.success) {
        throw new Error('Wallet connection failed');
      }

      const contractInstance = await tezos.contract.at(NcuCoinDistributor);
      let batch = tezos.wallet.batch().withContractCall(contractInstance.methods.updateTime(newTime))
      const op = await batch.send();
      const hash = await op.confirmation(1);

      return {
        success: true,
        operationId: hash,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        error,
      };
    }
  };

export const updateToken = async (
    caller,
    newToken
  ) => {
    try {
     
      const WALLET_RESP = await CheckIfWalletConnected(wallet);
      if (!WALLET_RESP.success) {
        throw new Error('Wallet connection failed');
      }

      const contractInstance = await tezos.contract.at(NcuCoinDistributor);

      let batch = tezos.wallet.batch().withContractCall(contractInstance.methods.updateToken(newToken))
      const op = await batch.send();
      const hash = await op.confirmation(1);

      return {
        success: true,
        operationId: hash,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        error,
      };
    }
  };
