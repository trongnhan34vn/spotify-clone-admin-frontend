import { useCallback, useEffect, useState } from 'react';
import SideModal from '../../../components/SideModal';
import { type Genre } from '../../../types/entities/genre.type';
import DetailGenreForm from '../forms/DetailGenreForm';
import { useHandle } from '../../../hooks/useHandle';
import { updateGenreThunk } from '../../../thunks/genre.thunk';
import { updateGenreSelector } from '../../../redux/selector/selector';
import { resetUpdate } from '../../../redux/slices/genre.slice';
import Spinner, { spinner } from '../../../components/Spinner';
import toast from 'react-hot-toast';

interface IProps {
  detail: Genre;
  open: boolean;
  close: () => void;
}
const DetailGenreModal = ({ detail, open, close }: IProps) => {
  const [changes, setChanges] = useState<string[]>([]);

  const addChanges = useCallback((change: string) => {
    setChanges(prev => {
      const isExistChange = prev.includes(change);
      if (!isExistChange) {
        return [...prev, change];
      }
      return [...prev];
    });
  }, []);

  const resetChanges = useCallback(() => {
    setChanges([]);
  }, []);

  const handleCloseModal = useCallback(() => {
    resetChanges();
    close();
  }, []);

  const {
    loading: editLoading,
    error: editError,
    data: editData,
    execute,
  } = useHandle({
    thunk: updateGenreThunk,
    options: {
      selector: updateGenreSelector,
      resetFn: resetUpdate,
    },
  });

  const handleEdit = useCallback((data: Genre) => {
    console.log(data);
    resetChanges();
    execute(data);
  }, []);

  useEffect(() => {
    if (editLoading) {
      spinner.show()
    } else {
      spinner.hide()
    }
  }, [editLoading])

  useEffect(() => {
    if (editError) {
      toast.error(editError)
      return;
    }

    if (editData) {
      toast.success("Genre updated.")
      return;
    }
  }, [editError, editData])

  return (
    <SideModal title="Genre Detail" open={open} closeModal={close}>
      <Spinner />
      <DetailGenreForm
        detail={detail}
        closeModal={handleCloseModal}
        addChanges={addChanges}
        changes={changes}
        handleEdit={handleEdit}
      />
    </SideModal>
  );
};

export default DetailGenreModal;
