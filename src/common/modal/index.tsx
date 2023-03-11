import { useModal } from "@/hooks";
import { Modal } from "antd";
import React from "react";

type CenteredModalProps = {
  children: React.ReactNode;
  title: string;
  onClose?: () => void;
};

const CenteredModal: React.FC<CenteredModalProps> = ({
  children,
  title,
  onClose,
}) => {
  const { isModalOpen, closeModal } = useModal();

  return (
    <Modal
      title={title}
      open={isModalOpen}
      centered={true}
      closable={true}
      onCancel={() => {
        if (onClose) onClose();
        closeModal();
      }}
    >
      {children}
    </Modal>
  );
};

export default CenteredModal;
