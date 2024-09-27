import { CONTRACT_ADRESSES } from "@/contracts/addresses";
import { MAGGO_NFT_CONTRACT } from "@/utils/constants";
import Moralis from "moralis";
import { useEffect, useState } from "react";
import { isAddress } from "viem";

const useMoralisGetNFTs = (userAddress: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [nfts, setNFTs] = useState<any>();

  const startedMoralis = async () => {
    try {
      if(Moralis.Core.isStarted){
        console.log("Already started");
        return
      }
      await Moralis.start({
        apiKey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImExNGNmMjA0LTk3MjktNGE4NC05YmY1LWU3NDg3OGVlN2NmMyIsIm9yZ0lkIjoiMzE4NTc1IiwidXNlcklkIjoiMzI3NTI0IiwidHlwZUlkIjoiNWU2ZWQ4YWMtZDQzNC00ZDg5LTg4ZmMtZmNiYjI0MTlmMjc3IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODQ0OTkzOTUsImV4cCI6NDg0MDI1OTM5NX0.40JzlXVo9cIu5_FZhXCoG_E0QJt5Yjg36h6JUXMyukY",
      });
    } catch (error) {
      console.log("Moralis Initalization Exception.",error);
    }
  };

  useEffect(() => {
    startedMoralis();
  }, []);

  useEffect(() => {
    const userNFTsGetter = async () => {
      try {
        if (!isAddress(userAddress) || !userAddress) {
          return;
        }
        setIsLoading(true);
        const response = await Moralis.EvmApi.nft.getWalletNFTs({
          chain: MAGGO_NFT_CONTRACT.chainId,
          format: "decimal",
          tokenAddresses: [CONTRACT_ADRESSES.MAGGOONFT],
          mediaItems: false,
          address: userAddress,
        });

        setNFTs(response.raw);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    userNFTsGetter();
  }, [userAddress]);

  return { isLoading, nfts };
};

export default useMoralisGetNFTs;
