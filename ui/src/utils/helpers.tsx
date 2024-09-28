import { ethers, parseEther } from "ethers";
import { formatEther, formatUnits, parseUnits } from "viem";

export const unixToDateTime = (unixTimestamp : any) => {
  // Unix zaman damgası milisaniye değil, saniye cinsinden olduğu için 1000 ile çarpıyoruz
  const date = new Date(Number(unixTimestamp) * 1000);
  
  // Tarihi ve saati yerel formatta döndürüyoruz
  return date.toLocaleString();
}

export const formatData = (data: any,decimals:any) => {
  if(data >= ethers.MaxUint256){
    return formatUnits(parseUnits("0",0),0)
  }else{
    return formatUnits(data,0)
  }
}