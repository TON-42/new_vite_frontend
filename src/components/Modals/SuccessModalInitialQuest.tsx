import React from "react";
import {Modal, Button, Placeholder} from "@telegram-apps/telegram-ui";

type SuccessModalInitialQuestProps = {
  onClose: () => void;
};

const SuccessModalInitialQuest: React.FC<SuccessModalInitialQuestProps> = ({
  onClose,
}) => {
  return (
    <div className='fixed inset-0 w-full h-full bg-gray-400 dark:bg-black-400 bg-opacity-80 flex justify-center items-center z-50'>
      <Modal open={true} onOpenChange={onClose} className='z-50'>
        <Placeholder description='Quest completed!' header='Congrats!' />
        <div className='pb-8 text-center'>
          <Button mode='filled' size='s' onClick={onClose}>
            Close
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default SuccessModalInitialQuest;
