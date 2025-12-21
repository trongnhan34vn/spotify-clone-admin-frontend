import { useCallback, useRef, useState } from 'react';
import SideModal from '../../../components/SideModal';
import { useModal } from '../../../hooks/useModal';
import AlertSaveModal from '../../../modals/AlertSaveModal';
import { type Genre } from '../../../types/entities/genre.type';
import DetailGenreForm from '../forms/DetailGenreForm';

interface IProps {
  detail: Genre;
  open: boolean;
  close: () => void;
  onEdit?: (data: Genre) => void;
}
const DetailGenreModal = ({ detail, open, close, onEdit }: IProps) => {
  const plugAlertModal = useModal();

  const [changes, setChanges] = useState<string[]>([]);

  const checkIsExistField = useCallback(
    (field: string) => {
      const isExistField = changes.includes(field);
      if (isExistField) return true;
      return false;
    },
    [changes]
  );

  const handleAddChanges = useCallback(
    (field: string) => {
      const isExistField = checkIsExistField(field);
      if (!isExistField) {
        setChanges(prev => [...prev, field]);
      }
    },
    [changes]
  );

  const handleResetChanges = () => {
    setChanges([]);
  };

  const handleCloseSideModal = () => {
    if (changes.length > 0) {
      plugAlertModal.open();
    } else {
      handleResetChanges();
      close();
    }
  };

  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSave = () => {
    setChanges([]);
    plugAlertModal.close();
    formRef?.current?.requestSubmit?.();
  };

  const handleAbort = useCallback(() => {
    handleResetChanges();
    close()
  }, []);

  return (
    <div>
      <SideModal
        title="Genre Detail"
        open={open}
        closeModal={handleCloseSideModal}
      >
        <DetailGenreForm
          detail={detail}
          closeModal={handleCloseSideModal}
          onEdit={onEdit}
          changes={changes}
          addChanges={handleAddChanges}
          ref={formRef}
          resetChanges={handleResetChanges}
        />
      </SideModal>
      <AlertSaveModal
        open={plugAlertModal.isOpen}
        closeModal={plugAlertModal.close}
        onSave={handleSave}
        onAbort={handleAbort}
      />
    </div>
  );
};

export default DetailGenreModal;
