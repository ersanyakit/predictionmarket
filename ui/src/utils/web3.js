import { Contract, JsonRpcProvider, BrowserProvider, isAddress } from "ethers";
import { getContract } from "viem";

import {
  MAGGO_DIAMOND_CONTRACT,
  clients
} from "./constants";

export const selectedClient = clients.spicyClient;

export async function GetSigner(wallet) {
  return new BrowserProvider(wallet).getSigner();
}

export function GetContractAt(contract) {
  return new Contract(
    contract.address,
    contract.abi,
    new JsonRpcProvider(contract.rpcUrl)
  );
}
