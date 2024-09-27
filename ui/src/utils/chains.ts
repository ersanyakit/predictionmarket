import { chiliz,spicy } from "viem/chains";

export const CHILIZ = {
  chainId: chiliz.id,
  name: chiliz.name,
  currency: chiliz.nativeCurrency.symbol,
  explorerUrl: chiliz.blockExplorers.default.url,
  rpcUrl: chiliz.rpcUrls.default.http,
  image: "/logo/chiliz.svg",
};

export const CHILIZ_SPICY = {
  chainId: spicy.id,
  name: spicy.name,
  currency: spicy.nativeCurrency.symbol,
  explorerUrl: spicy.blockExplorers.default.url,
  rpcUrl: spicy.rpcUrls.default.http,
  image: "/logo/chiliz.svg",
};

export const ALL_CHAINS = [CHILIZ,CHILIZ_SPICY];
