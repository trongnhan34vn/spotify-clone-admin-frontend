import Button from '../components/Button';
import Modal from './Modal';

type IProps = {
  open: boolean;
  closeModal: () => void;
  onSave?: () => void;
  onAbort?: () => void;
};

const AlertSaveModal = ({ open, closeModal, onSave, onAbort }: IProps) => {
  return (
    <Modal open={open} closeModal={closeModal} title="Alert" size="2xl">
      <>
        <p className="mb-5">
          You have unsaved changes. Do you want to save before leaving?
        </p>
        <div className="flex items-center justify-end gap-4">
          <Button
            className="!w-fit !bg-transparent hover:!text-red-500 !text-white"
            onClick={() => {
              closeModal();
              onAbort?.();
            }}
            label="Abort"
          />
          <Button
            className="!w-fit !rounded !px-3"
            onClick={() => {
              onSave?.();
              closeModal();
            }}
            label="Save"
          />
        </div>
      </>
    </Modal>
  );
};

export default AlertSaveModal;
