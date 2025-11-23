import { FaTrash } from 'react-icons/fa6';
import Button from '../../../components/Button';
import Form from '../../../components/Form';
import TextField from '../../../components/TextField';

type IProps = {
  defaultValue: any;
  onDelete: (id: string) => void;
  onCloseModal: () => void;
};
const DeleteAdminForm = ({ defaultValue, onDelete, onCloseModal }: IProps) => {
  return (
    <div>
      <p className="mb-4">
        This action cannot be undone. Deleting this user will permanently remove
        all associated data. To confirm, please type the username{' '}
        <span className="font-bold text-red-500">{defaultValue.username}</span>{' '}
        below.
      </p>
      <Form
        defaultValues={{ ...defaultValue, username: '' }}
        onSubmit={() => onDelete(defaultValue.id)}
      >
        <TextField id="id" name="id" hidden />
        <TextField
          id="username"
          name="username"
          label="Confirmation"
          required
          hiddenLabel
          validateValue={defaultValue.username}
          placeholder="Confirm..."
          validateMessage="Confirmation text does not match."
        />
        <div className='flex gap-4 float-right'>
          <Button onClick={onCloseModal} className='!w-fit bg-transparent hover:!text-[var(--color-primary)] transition-all duration-150 ease-in hover:!scale-none !text-white !font-medium' label="Cancel"  />
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
  );
};

export default DeleteAdminForm;
