import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import Header2 from "@/components/Header";

import { Web3ModalProvider } from "../providers/web3Prodiver";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3ModalProvider>
      <NextUIProvider>
          <Header2 />
          <div className={` w-full h-full py-[100px]`}>

          <Component {...pageProps} />
        </div>
      </NextUIProvider>
    </Web3ModalProvider>
  );
}
