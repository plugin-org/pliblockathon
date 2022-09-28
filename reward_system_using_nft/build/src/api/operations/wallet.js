import {connectedNetwork , rpcNode } from '../../common/constants.js'
import { BeaconWallet } from '@taquito/beacon-wallet';
import { TezosToolkit } from '@taquito/taquito';


// Beacon Wallet instance
export const wallet = new BeaconWallet({
    name: "College Network",
    preferredNetwork: 'custom'
  });
  
  // Tezos instance
export const tezos = new TezosToolkit(rpcNode);
tezos.setWalletProvider(wallet);
tezos.setRpcProvider(rpcNode);
  

export const ConnectWalletAPI = async () => {
  try {
    let account = await wallet.client.getActiveAccount();
    if (!account) {
      await wallet.requestPermissions({
        network: {
          type: 'custom',
          rpcUrl: rpcNode,
        }
      });
      
      account = await wallet.client.getActiveAccount();
    }
    if (account) {
      return {
        success: true,
        wallet: account.address,
      };
    } else {
      return {
        success: false,
        wallet: null,
      };
    }
  } catch (error) {
    return {
      success: false,
      wallet: null,
      error,
    };
  }
};

export const DisconnectWalletAPI = async () => {
  try {
    await wallet.disconnect();
    return {
      success: true,
      wallet: null,
    };
  } catch (error) {
    return {
      success: false,
      wallet: null,
      error,
    };
  }
};

export const FetchWalletAPI = async () => {
  try {
    const account = await wallet.client.getActiveAccount();

    if (!account) {
      return {
        success: false,
        wallet: null,
      };
    }
    return {
      success: true,
      wallet: account.address,
    };
  } catch (error) {
    return {
      success: false,
      wallet: null,
    };
  }
};

export const CheckIfWalletConnected = async (wallet) => {
    try {
      const activeAccount = await wallet.client.getActiveAccount();
      if (!activeAccount) {
        await wallet.client.requestPermissions({
          network: {
            type: connectedNetwork,
            rpcUrl: rpcNode,
          },
        });
      }
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  };