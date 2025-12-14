import { FaEdit } from 'react-icons/fa';
import Button from '../../../components/Button';
import EditorField from '../../../components/EditorField';
import Form from '../../../components/Form';
import SideModal from '../../../components/SideModal';
import SwitchField from '../../../components/SwitchField';
import TextField from '../../../components/TextField';
import { GenreStatus, type Genre } from '../../../types/entities/genre.type';
import { capitalizeFirst } from '../../../types/utils/string.format';
import { AiOutlineStop } from 'react-icons/ai';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';

interface IProps {
  detail: Genre;
  open: boolean;
  close: () => void;
}
const DetailGenreModal = ({ detail, open, close }: IProps) => {
  const fields: {
    accessorKey: keyof Genre;
    type: string;
    editable: boolean;
  }[] = [
    {
      accessorKey: 'id',
      type: 'text',
      editable: false,
    },
    {
      accessorKey: 'code',
      type: 'text',
      editable: false,
    },
    {
      accessorKey: 'name',
      type: 'text',
      editable: false,
    },
    {
      accessorKey: 'color',
      type: 'color',
      editable: false,
    },
    {
      accessorKey: 'description',
      type: 'editor',
      editable: true,
    },
    {
      accessorKey: 'createdBy',
      type: 'text',
      editable: false,
    },
    {
      accessorKey: 'createdAt',
      type: 'text',
      editable: false,
    },
  ];

  const renderInput = (field: {
    accessorKey: keyof Genre;
    type: string;
    editable: boolean;
  }) => {
    const { type, editable, accessorKey } = field;
    switch (type) {
      case 'text':
        return (
          <TextField
            className="w-full"
            id={accessorKey}
            label={capitalizeFirst(accessorKey)}
            name={accessorKey}
            disabled={!editable}
          />
        );
      case 'editor':
        return (
          <EditorField
            containerClassName="!w-full"
            name={accessorKey}
            id={accessorKey}
            label={capitalizeFirst(accessorKey)}
            disabled={true}
          />
        );
      case 'color':
        return (
          <div className="mb-5 w-full">
            <p className="mb-2 font-bold">Color:</p>
            <div
              className="w-24 h-10 rounded border-1 border-white"
              style={{ backgroundColor: detail?.color ?? '#fff' }}
            ></div>
          </div>
        );
    }
  };

  const renderInputs = () => {
    return fields.map(f => (
      <div key={f.accessorKey} className="flex w-full items-center gap-4">
        {renderInput(f)}{' '}
        {f.editable ? (
          <Button
            // onClick={() => addChanges?.(f.key)}
            className={`!flex-1 !bg-transparent group text-white`}
            // className={`!flex-1  !bg-transparent group
            //   ${checkIsExistField(f.key) ? '!text-[var(--color-primary)]' : 'text-white'}
            //   `}
            label={
              <FaEdit className="group-hover:!text-[var(--color-primary)] transition-all duration-200 ease-in" />
            }
          />
        ) : (
          <Button
            disabled
            className="!flex-1 !w-fit !bg-transparent hover:!text-[var]"
            label={<AiOutlineStop className="text-red-500" />}
          />
        )}
      </div>
    ));
  };

  const newDetail = detail
    ? {
        ...detail,
        status:
          detail.status.toLowerCase() == GenreStatus.ACTIVE.toLowerCase()
            ? true
            : false,
      }
    : {};

  return (
    <div>
      <SideModal title="Genre Detail" open={open} closeModal={close}>
        <div className="px-6">
          {/* image */}
          <div className="w-full h-48 rounded overflow-hidden mb-5">
            <img
              className="w-full h-full object-cover"
              src={detail?.image ?? ''}
              alt=""
            />
          </div>
          {/* title */}

          <Form
            className="w-full"
            defaultValues={newDetail}
            onSubmit={() => {}}
          >
            <div className="flex justify-between w-full items-center  mb-5">
              <div>
              <p className="font-bold mb-2 text-2xl">{detail?.name ?? 'Title'}</p>
              <div className='text-sm' dangerouslySetInnerHTML={{__html: detail?.description}}></div>
              </div>
              <SwitchField
                className="!mb-0 !w-fit"
                label="Status"
                name="status"
              />
            </div>
            {renderInputs()}
            <div className="sticky  bottom-0 bg-[var(--color-secondary-background)] p-4 items-center w-full flex gap-4 justify-end">
              <Button
                type="submit"
                className="!w-fit !mt-2 !rounded !p-2 hover:!scale-100 "
                label={
                  <div className="flex items-center gap-2 text-white">
                    <IoIosCheckmarkCircleOutline
                      size={24}
                      className="text-white group-hover:text-black transition-all duration-150 ease-in"
                    />
                    <p>Save</p>
                  </div>
                }
              />

              <Button
                // onClick={() => onCloseModal()}
                className="!w-fit !mt-2 !bg-transparent text-white hover:!text-red-500 !rounded !p-2 hover:!scale-100 "
                label={
                  <div className="flex items-center gap-2">
                    <p>Close</p>
                  </div>
                }
              />
            </div>
          </Form>
        </div>
      </SideModal>
    </div>
  );
};

export default DetailGenreModal;
