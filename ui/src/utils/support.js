import { ALL_CHAINS } from "@/utils/chains";
import { stringToBytes } from "viem";
import { Contract, JsonRpcProvider, BrowserProvider } from "ethers";

export const HexToInteger = (hexValue) => parseInt(hexValue, 10);

export function FormatAddressDesign(address, startChars = 6, endChars = 6) {
  if (address.length <= startChars + endChars) {
    return address;
  }

  const visiblePart =
    address.substring(0, startChars) +
    "..." +
    address.substring(address.length - endChars);
  return visiblePart;
}

export function CheckChain(chainId) {
  for (const chain of ALL_CHAINS) {
    if (chain.chainId === chainId) {
      return true;
    }
  }
  return false;
}

export function NumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function ConvertIpfsUrl(ipfsURL) {
  const ipfsPrefix = "ipfs://";
  if (stringToBytes(ipfsURL).length > 20) {
    if (ipfsURL && ipfsURL.startsWith(ipfsPrefix)) {
      const convertedUrl = `https://ipfs.infura.io/ipfs/${
        ipfsURL.split("://")[1]
      }`;
      return convertedUrl;
    } else {
      const convertedUrl = `https://ipfs.infura.io/ipfs/${ipfsURL}`;
      return convertedUrl;
    }
  } else {
    return ipfsURL;
  }
}

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
 