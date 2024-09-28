import { ethers, parseEther } from "ethers";
import { formatEther } from "viem";

export const unixToDateTime = (unixTimestamp : any) => {
  // Unix zaman damgası milisaniye değil, saniye cinsinden olduğu için 1000 ile çarpıyoruz
  const date = new Date(Number(unixTimestamp) * 1000);
  
  // Tarihi ve saati yerel formatta döndürüyoruz
  return date.toLocaleString();
}

export const formatData = (data: any) => {
  if(data >= ethers.MaxUint256){
    return formatEther(parseEther("0"))
  }else{
    return formatEther(data)
  }
}