import { createPublicClient, http } from "viem";
import { CHILIZ, CHILIZ_SPICY } from "./chains";
import { chiliz, spicy } from "viem/chains";
import { IContract } from "@/types";

import ARENA_DIAMOND_ABI from "../contracts/abi/ARENADIAMOND.json";
import ERC20_ABI from "../contracts/abi/ERC20.json";

import { CONTRACT_ADRESSES } from "@/contracts/addresses";


export const metadata = {
  name: "PREDICTION MARKET APP",
  description: "Desx.",
  url: "https://kewl.exchange",
  icons: ["/logo/logo-symbol.png"],
};

export const clients = {
  chilizClient: createPublicClient({
    batch: {
      multicall: true,
    },
    cacheTime: 10_000,
    pollingInterval: 10_000,
    chain: chiliz,
    transport: http(CHILIZ.rpcUrl[1]),
  }),

  spicyClient: createPublicClient({
    batch: {
      multicall: false,
    },
    cacheTime: 10_000,
    pollingInterval: 10_000,
    chain: spicy,
    transport: http("https://spicy-rpc.chiliz.com"),
  }),

};



export const ARENA_DIAMOND_CONTRACT: IContract = {
  address: CONTRACT_ADRESSES.ARENADIAMOND,
  abi: ARENA_DIAMOND_ABI.abi,
  chainId: CHILIZ_SPICY.chainId,
  rpcUrl: CHILIZ_SPICY.rpcUrl[0]
};

 
export const ERC20_CONTRACT = (address: string): IContract => {
  return {
    address: address,
    abi: ERC20_ABI.abi,
    chainId: CHILIZ_SPICY.chainId,
    rpcUrl: "https://spicy-rpc.chiliz.com",
  };
};

