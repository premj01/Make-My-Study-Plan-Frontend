import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { FaServer } from "react-icons/fa";
import axios from "axios";
import hostname from "./utils/hostname";

const NoserverConneted = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isServerDown, setIsServerDown] = useState(false);

  window.onload = async () => {
    try {
      const response = await axios.get(hostname);

      if (!response.data || !response.data.message) {
        setIsServerDown(true);
        onOpen();
      }
    } catch (error) {
      setIsServerDown(true);
      onOpen();
    }
  };

  if (!isServerDown) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      backdrop="blur"
      classNames={{
        base: "bg-background/60  backdrop-blur-md border border-default-800 text-white",
        header: "border-b border-default-200 text-white",
        footer: "border-t border-default-200 text-white",
      }}
    >
      <ModalContent className="bg-background/5 backdrop-blur-lg  border border-default-400 shadow-2xl text-white">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-danger/10">
                  <FaServer className="text-danger text-xl" />
                </div>
                <span className="text-xl font-semibold">
                  Service Unavailable
                </span>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <p className="text-foreground/80 text-white">
                  The service is currently unavailable. This is due to the
                  backend server is down because of Server Maintenance.
                </p>
                <div className="p-4 rounded-lg bg-default-10/50 backdrop-blur-sm border border-default-900 text-white">
                  <p className="text-default-500 text-white">
                    If you want me to start this service, please contact me.
                    <br />
                    Email:{" "}
                    <a
                      className="text-primary hover:text-primary-500 transition-colors"
                      href="mailto:premjadhav00002@gmail.com"
                    >
                      premjadhav00002@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={onClose}
                className="hover:bg-danger/10"
              >
                Close
              </Button>
              <Button
                color="secondary"
                variant="bordered"
                onPress={() => window.location.reload()}
                // className="bg-primary/90 hover:bg-primary"
              >
                Retry Connection
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default NoserverConneted;
