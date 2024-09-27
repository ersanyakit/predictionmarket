import React from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button
} from "@nextui-org/react";
import Image from "next/image";
import { CloseIcon } from "../Icons";

export interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ isOpen, onClose }) => {
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
          base: "border-black bg-crypto dark:bg-crypto light:bg-crypto border-2 border-primary-100 bg-primary-300",
          header: "border-b-[1px] border-dark",
          footer: "border-t-[1px] border-dark"
        }}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="flex items-center text-white/75">
                <div className="relative flex justify-center items-center">
                  <div className="absolute top-0">
                    <CloseIcon size={40} fill={"#EF1212"} />
                  </div>
                  <Image
                    width={450}
                    height={450}
                    className="w-[90%]"
                    src="/icons/transfer.svg"
                    alt="wallets"
                  />
                </div>
                <p>The transaction is cancelled.</p>
                <p>Please try again.</p>
              </ModalBody>
              <ModalFooter className="flex items-center justify-center">
                <Button
                  radius="sm"
                  className="bg-transparent border-2 border-white/70 text-xl text-white w-full "
                  onPress={onClose}>
                  Back
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default ErrorModal;
