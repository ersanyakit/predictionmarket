import { parseEther } from "viem";

export interface IContract {
  address: `0x${string}` | any;
  abi: object[];
  chainId: number;
  rpcUrl: string;
}
