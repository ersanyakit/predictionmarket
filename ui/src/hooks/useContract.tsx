import {
  useWeb3ModalAccount,
  useWeb3ModalProvider
} from "@web3modal/ethers/react";
import { BrowserProvider } from "ethers";
import { Contract, ethers } from "ethers";
import { useMemo } from "react";

export function useContract(
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
  ABI: any,
  withSignerIfPossible = true
) {
  const { address, chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  return useMemo(() => {
    if (!addressOrAddressMap || !ABI || !walletProvider || !chainId)
      return null;
    let address: string | undefined;
    if (typeof addressOrAddressMap === "string") address = addressOrAddressMap;
    else address = addressOrAddressMap[chainId];
    if (!address) return null;
    try {
      return getContract(address, ABI, walletProvider);
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [
    addressOrAddressMap,
    ABI,
    walletProvider,
    chainId,
    withSignerIfPossible,
    address
  ]);
}

export function getContract(
  address: string,
  ABI: any,

  rpc: any
) {
  return new Contract(address, ABI, rpc);
}
