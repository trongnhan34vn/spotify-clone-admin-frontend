import { useCallback, useRef, useState } from 'react';
import SideModal from '../../../components/SideModal';
import DetailAdminForm from '../forms/DetailAdminForm';

import { useModal } from '../../../hooks/useModal';
import AlertModal from '../../../modals/AlertSaveModal';
import type { Group, User } from '../../../types/entities/user.type';
interface IProps {
  open: boolean;
  close: () => void;
  detail: User;
  onEdit?: (data: User) => void;
  adminGroups?: Group[];
}
const DetailAdminModal = ({
  open,
  close,
  detail,
  onEdit,
  adminGroups,
}: IProps) => {
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

  const handleCloseAlertModal = useCallback(() => {
    // handleResetChanges();
    plugAlertModal.close();
  }, []);

  const handleAbort = useCallback(() => {
        handleResetChanges();
        close()
  }, [])

  return (
    <div>
      <SideModal
        title="Admin Information"
        open={open}
        closeModal={handleCloseSideModal}
        size={'2xl'}
      >
        <DetailAdminForm
          defaultValue={detail}
          onCloseModal={handleCloseSideModal}
          onEdit={onEdit}
          adminGroups={adminGroups}
          changes={changes}
          addChanges={handleAddChanges}
          formRef={formRef}
          resetChanges={handleResetChanges}
        />
      </SideModal>
      <AlertModal
        open={plugAlertModal.isOpen}
        closeModal={handleCloseAlertModal}
        onSave={handleSave}
        onAbort={handleAbort}
      />
    </div>
  );
};

export default DetailAdminModal;
