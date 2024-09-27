import { Contract, JsonRpcProvider, BrowserProvider, isAddress } from "ethers";
import { getContract } from "viem";

import {
  MAGGO_DIAMOND_CONTRACT,
  chilizClient,
  MAGGO_NFT_CONTRACT,
  BODY_TOKEN_ID_START,
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

export async function checkBalancesOfBody(address, bodyId) {
  try {
    if (!isAddress(address) || Number(bodyId) < BODY_TOKEN_ID_START) {
      return null;
    }
    const contract = getContract({
      address: MAGGO_DIAMOND_CONTRACT.address,
      abi: MAGGO_DIAMOND_CONTRACT.abi,
      client: selectedClient
    });

    const balances = await contract.read.checkBalances([address, bodyId]);
    return balances;
  } catch (error) {
    return null;
  }
}

export async function getMetadata(tokenId) {
  try {
    if (!tokenId && Number(tokenId) < 1) {
      return null;
    }
    const contract = getContract({
      address: MAGGO_NFT_CONTRACT.address,
      abi: MAGGO_NFT_CONTRACT.abi,
      client: selectedClient
    });

    try {
      const metadata = await contract.read.uri([BigInt(tokenId)]);
      return metadata;
    } catch (error) {
      const metadata = await contract.read.tokenURI([BigInt(tokenId)]);
      return metadata;
    }
  } catch (error) {
    return null;
  }
}

export async function getCollections() {
  try {
    const contract = getContract({
      address: MAGGO_DIAMOND_CONTRACT.address,
      abi: MAGGO_DIAMOND_CONTRACT.abi,
      client: selectedClient
    });

    const collections = await contract.read.fetchCollections();
    const fetchedNFTs = await contract.read.fetch([
      Number(collections[0]?.collectionId.toString())
    ]);

    return fetchedNFTs;
  } catch (error) {}
}

export async function getItem(collectionId, tokenId) {
  try {
    const contract = getContract({
      address: MAGGO_DIAMOND_CONTRACT.address,
      abi: MAGGO_DIAMOND_CONTRACT.abi,
      client: selectedClient
    });

    const [marketItem, collectionInfo] = await contract.read.fetchItem([
      collectionId,
      tokenId
    ]);
    return { marketItem: marketItem, collectionInfo: collectionInfo };
  } catch (error) {
    return { marketItem: null, collectionInfo: null };
  }
}

export async function getMintHistory(addr) {
  try {
    if (!isAddress(addr)) {
      return;
    }

    const contract = getContract({
      address: MAGGO_DIAMOND_CONTRACT.address,
      abi: MAGGO_DIAMOND_CONTRACT.abi,
      client: selectedClient
    });

    const mintHistory = await contract.read.getMintHistory([addr]);
    return mintHistory;
  } catch (error) {
    return null;
  }
}

export async function getChar(tokenId) {
  try {
    const contract = getContract({
      address: MAGGO_DIAMOND_CONTRACT.address,
      abi: MAGGO_DIAMOND_CONTRACT.abi,
      client: selectedClient
    });

    const charInfo = await contract.read.getCharacter([tokenId]);
    return charInfo;
  } catch (error) {
    return null;
  }
}

export async function getNativeBalance(addresssss) {
  try {
    if (!addresssss) {
      return "0";
    }
    const balance = await selectedClient.getBalance({
      address: addresssss,
      blockTag: "latest"
    });

    return balance;
  } catch (error) {}
}

export async function getCharacters() {
  try {
    const contract = getContract({
      address: MAGGO_DIAMOND_CONTRACT.address,
      abi: MAGGO_DIAMOND_CONTRACT.abi,
      client: selectedClient
    });

    return await contract.read.getCharacters();
  } catch (error) {
    return null;
  }
}
