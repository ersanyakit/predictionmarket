import React from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button
} from "@nextui-org/react";

import { CheckIcon } from "../Icons";

export interface SuccessModalProps {
  isOpen: boolean;
  desc: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, desc }) => {
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
          base: "bg-primary-300 border border-primary-100",
          header: "border-b-[1px] border-primary-100",
          footer: "border-t-[1px] border-primary-100"
        }}>
        <ModalContent>
          <>
            <ModalBody className="flex items-center text-center">
              <CheckIcon size={60} fill={"#fff"} />
              <p>{desc}</p>
            </ModalBody>
            <ModalFooter>
              <Button
                radius="sm"
                className="text-lg w-full dropdown-transparent-button-for-item text-white"
                onClick={() => window.location.reload()}>
                Back
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};
export default SuccessModal;
