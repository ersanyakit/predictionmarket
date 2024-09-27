import { createPublicClient, http } from "viem";
import { CHILIZ, CHILIZ_SPICY } from "./chains";
import { chiliz, spicy } from "viem/chains";
import { IContract } from "@/types";

import ARENA_DIAMOND_ABI from "../contracts/abi/ARENADIAMOND.json";

import { CONTRACT_ADRESSES } from "@/contracts/addresses";


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
      multicall: true,
    },
    cacheTime: 10_000,
    pollingInterval: 10_000,
    chain: spicy,
    transport: http(CHILIZ_SPICY.rpcUrl[1]),
  }),

};



export const MAGGO_DIAMOND_CONTRACT: IContract = {
  address: CONTRACT_ADRESSES.ARENADIAMOND,
  abi: ARENA_DIAMOND_ABI.abi,
  chainId: CHILIZ_SPICY.chainId,
  rpcUrl: CHILIZ_SPICY.rpcUrl[1]
};

 