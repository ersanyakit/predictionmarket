import React, { useEffect, useState } from "react";
import {
  useSwitchNetwork,
  useWeb3Modal,
  useWeb3ModalAccount
} from "@web3modal/ethers/react";
import { Button } from "@nextui-org/react";
import { CheckChain, FormatAddressDesign } from "../utils/support";
import classNames from "classnames";

export default function ConnectButton() {
  const { open } = useWeb3Modal();
  const { switchNetwork } = useSwitchNetwork();
  const { address, chainId, isConnected } = useWeb3ModalAccount();

  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const UnsupportedChainComp = () => {
    return (
      <div
        className={classNames(
          "flex items-center gap-2",
          CheckChain(chainId) === true ? "hidden" : "flex"
        )}>
        <p className=" text-[#FF0000] font-onest-medium">Switch Network</p>
      </div>
    );
  };

  return (
    <>
      {isLoading === false ? (
        <>
          {isConnected === true ? (
            <div className="sm:w-full">
              <Button
                radius="sm"
                variant="flat"
                color="secondary"
                onClick={() =>
                  CheckChain(chainId) === true
                    ? open({ view: "Account" })
                    : open({ view: "Networks" })
                }
                className="capitalize btn btn-primary  sm:w-full  ">
                {CheckChain(chainId) === true ? (
                  <div className="flex gap-2   text-white">
                    <span>{FormatAddressDesign(address)}</span>
                  </div>
                ) : (
                  <UnsupportedChainComp />
                )}
              </Button>
            </div>
          ) : (
            <div className="sm:w-full">
              <Button
                radius="sm"
                onClick={() => open()}
                className="btn btn-primary text-xl">
                Connect
              </Button>
            </div>
          )}
        </>
      ) : (
        <div></div>
      )}
    </>
  );
}
