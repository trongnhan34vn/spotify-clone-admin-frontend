import { FaTrash } from 'react-icons/fa';
import Modal from '../modals/Modal';
import Button from './Button';
import Form from './Form';
import TextField from './TextField';

interface IProps<T> {
  open: boolean;
  close: () => void;
  target: T;
  onDelete?: (id: string) => void;
  title: string;
  type: 'user' | 'genre'
}
const DeleteModal = <
  T extends {
    name?: string;
    title?: string;
    username?: string;
    label?: string;
    id: string;
    code: string
  },
>({
  open,
  close,
  target,
  onDelete,
  title,
  type
}: IProps<T>) => {
  if (!target) return;

  const FIXED_SIZE = '2xl';
  const mapping = () => {
    if (target?.name) {
      return 'name';
    }
    if (target?.username) {
      return 'username';
    }
    if (target?.label) {
      return 'label';
    }
    return 'title';
  };

  return (
    <Modal title={title} open={open} closeModal={close} size={FIXED_SIZE}>
      <div>
        <p className="mb-4">
          This action cannot be undone. Deleting this {type} <span className='font-bold text-red-500'>#{target.code}</span> will permanently
          remove all associated data. To confirm, please type {' '}
          <span className="font-bold text-red-500">
            {target.username ?? target.name ?? target.title ?? target.label}
          </span>{' '}
          below.
        </p>
        <Form
          defaultValues={{ ...target, username: '', name: '', title: '', label: '' }}
          onSubmit={() => onDelete?.(target.id)}
        >
          <TextField id="id" name="id" hidden />
          <TextField
            id={mapping()}
            name={mapping()}
            label="Confirmation"
            required
            hiddenLabel
            validateValue={
              target.username ?? target.name ?? target.title ?? target.label
            }
            placeholder="Confirm..."
            validateMessage="Confirmation text does not match."
          />
          <div className="flex gap-4 float-right">
            <Button
              onClick={close}
              className="!w-fit bg-transparent hover:!text-[var(--color-primary)] transition-all duration-150 ease-in hover:!scale-none !text-white !font-medium"
              label="Cancel"
            />
            <Button
              type="submit"
              className="!w-fit !border-red-500 !border-[1px] !rounded hover:!scale-100 hover:!bg-red-500 hover:!text-black group !px-2 !float-right text-red-500 !bg-transparent"
              label={
                <div className="flex items-center gap-2">
                  <FaTrash
                    size={16}
                    className="text-red-500 group-hover:text-black transition-all duration-150 ease-in"
                  />
                  <p>Delete</p>
                </div>
              }
            />
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default DeleteModal;
