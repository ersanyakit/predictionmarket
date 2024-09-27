import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  CircularProgress
} from "@nextui-org/react";

export interface WaitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WaitModal: React.FC<WaitModalProps> = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal
        hideCloseButton={true}
        backdrop="blur"
        placement="center"
        isOpen={isOpen}
        classNames={{
          body: "py-6",
          backdrop: "blur",
          base: "border-black bg-crypto dark:bg-crypto light:bg-crypto border-2 border-primary-100 bg-primary-300",
          header: "border-b-[1px] border-primary-100",
          footer: "border-t-[1px] border-dark"
        }}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col text-2xl items-center text-white/75 gap-1">
              Waiting Transaction
            </ModalHeader>
            <ModalBody className="flex justify-center items-center">
              <CircularProgress
                classNames={{
                  indicator: "stroke-white/75",
                  track: "stroke-transparent"
                }}
                size="lg"
                color="secondary"
                aria-label="Loading..."
              />
              <p className="text-white/75 sm:px-8 text-center">
                Please approve your transaction in your wallet
              </p>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};
export default WaitModal;
