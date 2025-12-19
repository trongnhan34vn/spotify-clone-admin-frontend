import { useCallback, useMemo } from 'react';
import { AiOutlineStop } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';
import Button from '../../../components/Button';
import ColorField from '../../../components/ColorField';
import EditorField from '../../../components/EditorField';
import Form from '../../../components/Form';
import SwitchField from '../../../components/SwitchField';
import TextField from '../../../components/TextField';
import { GenreStatus, type Genre } from '../../../types/entities/genre.type';
import { capitalizeFirst } from '../../../types/utils/string.format';

interface IProps {
  detail: Genre;
  closeModal: () => void;
  addChanges?: (change: string) => void;
  changes?: string[];
  handleEdit?: (data: Genre) => void;
}
const DetailGenreForm = ({
  detail,
  closeModal,
  addChanges,
  changes = [],
  handleEdit,
}: IProps) => {
  const resignDetail = useMemo(() => {
    return detail
      ? {
          ...detail,
          status:
            detail.status.toLowerCase() == GenreStatus.ACTIVE.toLowerCase()
              ? true
              : false,
        }
      : {};
  }, [detail]);

  const checkIsExistField = useCallback(
    (field: string) => {
      const isExistField = changes?.includes(field);
      if (isExistField) return true;
      return false;
    },
    [changes]
  );

  const renderEditLabelComponent = useCallback((field: string) => {
    return (
      <div className="flex items-center gap-2">
        <p className="inline-block">{capitalizeFirst(field)}</p>
        <MdEdit className="text-[var(--color-primary)]" />
      </div>
    );
  }, []);

  const generateField = useCallback(() => {
    const ORDER = [
      'id',
      'code',
      'name',
      'color',
      'description',
      'createdBy',
      'updatedBy',
      'createdAt',
    ];

    const fields = Object.entries(detail)
      .sort(([keyA], [keyB]) => {
        const indexA = ORDER.indexOf(keyA);
        const indexB = ORDER.indexOf(keyB);

        return (
          (indexA === -1 ? Infinity : indexA) -
          (indexB === -1 ? Infinity : indexB)
        );
      })
      .map(([key, value]) => ({
        key: key,
        value: value,
      }));

    const unableEditFields = [
      'id',
      'code',
      'name',
      'createdBy',
      'createdAt',
      'updatedBy',
    ];

    const nonRequireFields: string[] = ['updatedBy'];

    const fieldComponents = fields.map((f, index) => {
      if (f.key == 'status' || f.key == 'image') return;

      let fc = (
        <TextField
          className="w-full"
          id={f.key}
          label={capitalizeFirst(f.key)}
          name={f.key}
          disabled={!checkIsExistField(f.key)}
          required={nonRequireFields.includes(f.key) ? false : true}
        />
      );

      if (f.key == 'description') {
        fc = (
          <EditorField
            containerClassName="!w-full"
            name={f.key}
            id={f.key}
            label={
              checkIsExistField(f.key)
                ? renderEditLabelComponent(f.key)
                : capitalizeFirst(f.key)
            }
            disabled={!checkIsExistField(f.key)}
          />
        );
      }

      if (f.key == 'color') {
        if (checkIsExistField(f.key)) {
          fc = (
            <div className="w-full">
              <ColorField
                containerClassName="mb-4"
                label={
                  checkIsExistField(f.key)
                    ? renderEditLabelComponent(f.key)
                    : capitalizeFirst(f.key)
                }
                id="color"
                name="color"
              />
            </div>
          );
        } else {
          fc = (
            <div className="mb-5 w-full">
              <p className="mb-2 font-bold">Color</p>
              <div
                className="w-24 h-10 rounded border-1 border-white"
                style={{ backgroundColor: detail?.color ?? '#fff' }}
              ></div>
            </div>
          );
        }
      }

      const isAbleEdit = !unableEditFields.includes(f.key);

      return (
        <div key={index} className="flex items-center gap-4">
          {fc}

          {isAbleEdit ? (
            <Button
              onClick={() => addChanges?.(f.key)}
              className={`!flex-1  !bg-transparent group ${checkIsExistField(f.key) ? '!text-[var(--color-primary)]' : 'text-white'}`}
              label={
                <FaEdit className="group-hover:!text-[var(--color-primary)] transition-all duration-200 ease-in" />
              }
            />
          ) : (
            <Button
              disabled
              className="!flex-1 !bg-transparent hover:!text-[var]"
              label={<AiOutlineStop className="text-red-500" />}
            />
          )}
        </div>
      );
    });

    return fieldComponents;
  }, [detail, changes]);

  return (
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
        defaultValues={resignDetail}
        onSubmit={data => handleEdit?.(data)}
      >
        <div className="flex justify-between w-full items-center gap-5 mb-5">
          <div className="!flex-1">
            <p className="font-bold mb-2 text-2xl">{detail?.name ?? 'Title'}</p>
            <div
              className="text-sm text-[#ccc]"
              dangerouslySetInnerHTML={{ __html: detail?.description }}
            ></div>
          </div>
          <SwitchField
            onToggle={() => addChanges?.('status')}
            className="!mb-0 !w-fit"
            label="Status"
            name="status"
          />
        </div>
        <div>{generateField()}</div>
        <div className="sticky  bottom-0 bg-[var(--color-secondary-background)] p-4 items-center w-full flex gap-4 justify-end">
          {changes.length > 0 && (
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
          )}

          <Button
            onClick={() => closeModal()}
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
  );
};

export default DetailGenreForm;
