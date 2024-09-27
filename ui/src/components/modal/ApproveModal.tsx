import React from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button
} from "@nextui-org/react";
import { CheckIcon } from "../Icons";

export interface ApproveModalProps {
  isOpen: boolean;
  onClose: () => void;
  deposit: () => void;
  desc: string;
  desc2: string;
}

const ApproveModal: React.FC<ApproveModalProps> = ({
  isOpen,
  onClose,
  deposit,
  desc,
  desc2
}) => {
  return (
    <>
      <Modal
        hideCloseButton={true}
        backdrop="blur"
        placement="center"
        isOpen={isOpen}
        onClose={onClose}
        classNames={{
          body: "py-6",
          backdrop: "blur",
          base: "border-black bg-crypto dark:bg-crypto light:bg-crypto border-2 border-inpurple/50",
          header: "border-b-[1px] border-dark",
          footer: "border-t-[1px] border-dark"
        }}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="flex items-center sm:text-center">
                <CheckIcon size={60} fill={"#A950F0"} />
                <p>{desc}</p>
                <p>{desc2}</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  radius="sm"
                  className="text-lg w-1/2 dropdown-transparent-button-for-item text-white"
                  onPress={onClose}>
                  Back
                </Button>
                <Button
                  radius="sm"
                  onClick={() => deposit()}
                  className="w-1/2 dropdown-gradient-button-for-item text-lg">
                  {desc2 === "Please continue to stake your NFT."
                    ? "Stake NFT"
                    : desc2 === "Please continue to upgrade your NFT."
                    ? "Upgrade"
                    : desc2 === "Please continue to buy."
                    ? "Buy"
                    : desc2 === "Please continue to deposit."
                    ? "Deposit Now"
                    : desc2 === "Please continue to create."
                    ? "Create Now"
                    : ""}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default ApproveModal;
