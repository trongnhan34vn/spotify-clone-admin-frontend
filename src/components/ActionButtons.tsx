import { IoEyeOutline } from 'react-icons/io5';
import { MdDelete, MdEdit } from 'react-icons/md';
import Button from './Button';

type IProps<T> = {
  onDetail?: (id: string) => void;
  onEdit?: (data: T) => void;
  onDelete?: (data: T) => void;
  data: T;
};
const ActionButtons = <T,>({ data, onDelete, onDetail, onEdit }: IProps<T>) => {
  return (
    <div className="flex gap-3">
      {onDetail && (
        <Button
          onClick={() => onDetail((data as any).id)}
          label={<IoEyeOutline size={16} />}
          className="cursor-pointer !text-center !w-fit !p-0 !text-white !bg-transparent hover:!scale-110 hover:!text-blue-400 transition-all duration-150 ease-in"
        />
      )}

      {onEdit && (
        <Button
          onClick={() => onEdit(data)}
          label={<MdEdit size={16} />}
          className="cursor-pointer !text-center !w-fit !p-0 !text-white !bg-transparent hover:!scale-110 hover:!text-green-400 transition-all duration-150 ease-in"
        />
      )}

      {onDelete && (
        <Button
          onClick={() => onDelete(data)}
          label={<MdDelete size={16} />}
          className="cursor-pointer !text-center !w-fit !p-0 !text-white !bg-transparent hover:!scale-110 hover:!text-red-400 transition-all duration-150 ease-in"
        />
      )}
    </div>
  );
};

export default ActionButtons;
