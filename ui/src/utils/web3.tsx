import { Contract, JsonRpcProvider, BrowserProvider, isAddress } from "ethers";
import { getContract } from "viem";

import {
  ARENA_DIAMOND_CONTRACT,
  clients
} from "./constants";

export const selectedClient = clients.spicyClient;

export async function GetSigner(wallet:any) {
  return new BrowserProvider(wallet).getSigner();
}

export function GetContractAt(contract:any) {
  return new Contract(
    contract.address,
    contract.abi,
    new JsonRpcProvider(contract.rpcUrl)
  );
}

interface FetchMarketDataResponse {
  data: any | null;
  error: any | null;
}

export const FETCH_MARKET_DATA = async (): Promise<FetchMarketDataResponse> => {
  try {
    const contract = getContract({
      address: ARENA_DIAMOND_CONTRACT.address,
      abi: ARENA_DIAMOND_CONTRACT.abi,
      client: selectedClient,
    });

    console.log("selectedClient",selectedClient)

    console.log(contract)

    const marketItems = await contract.read.fetch();
    return { data: marketItems, error: null };
  } catch (error) {
    console.error('Error fetching market data:', error); // Log error for debugging
    return { data: null, error };
  }
};

