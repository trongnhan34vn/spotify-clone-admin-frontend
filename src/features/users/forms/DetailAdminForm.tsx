import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import Button from '../../../components/Button';
import Form from '../../../components/Form';
import SelectField from '../../../components/SelectField';
import TextField from '../../../components/TextField';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { AiOutlineStop } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import SwitchField from '../../../components/SwitchField';
import type { Group, User } from '../../../types/entities/user.type';
import { capitalizeFirst } from '../../../types/utils/string.format';

type IProps = {
  defaultValue: User;
  onCloseModal: () => void;
  onEdit?: (data: User) => void;
  adminGroups?: Group[];
  changes?: string[];
  addChanges?: (change: string) => void;
  formRef?: any
  resetChanges?: () => void
};
const DetailAdminForm = ({
  defaultValue,
  onCloseModal,
  onEdit,
  adminGroups = [],
  changes = [],
  addChanges,
  formRef,
  resetChanges
}: IProps) => {
  const adminGroupOptions = useMemo(() => {
    return adminGroups.map(ag => ({
      label: ag.name,
      value: ag.name,
    }));
  }, [adminGroups]);

  const editFieldComponent = useCallback((field: string) => {
    return (
      <div className="flex items-center gap-2">
        <p className="inline-block">{capitalizeFirst(field)}</p>
        <MdEdit className="text-[var(--color-primary)]" />
      </div>
    );
  }, []);

  const checkIsExistField = useCallback(
    (field: string) => {
      const isExistField = changes?.includes(field);
      if (isExistField) return true;
      return false;
    },
    [changes]
  );

  const generateField = useCallback(() => {
    const fields = Object.entries(defaultValue).map(([key, value]) => ({
      key: key,
      value: value,
    }));
    const unableEditFields = ['username', 'email', 'id', 'createdAt', 'status'];
    const noneRequireFields = ['birthDay', 'phone', 'address'];
    const fieldComponents = fields.map((f, index) => {
      if (f.key == 'status') return;
      if (f.key == 'image') return;

      let fc =
        f.key == 'groups' ? (
          <SelectField
            id={f.key}
            name={f.key}
            label={
              checkIsExistField(f.key)
                ? editFieldComponent(f.key)
                : capitalizeFirst(f.key)
            }
            disabled={!checkIsExistField(f.key)}
            required
            multiple
            selectClassName="w-full"
            placeholder="Select groups..."
            options={adminGroupOptions}
          />
        ) : (
          <TextField
            className="w-full"
            id={f.key}
            disabled={!checkIsExistField(f.key)}
            required={noneRequireFields.includes(f.key) ? false : true}
            label={
              f.key == 'id'
                ? 'ID'
                : changes?.includes(f.key)
                  ? editFieldComponent(f.key)
                  : capitalizeFirst(f.key)
            }
            name={f.key}
          />
        );

      const ableEdit = !unableEditFields.includes(f.key);

      if (ableEdit) {
        return (
          <div key={index} className="flex items-center gap-4">
            {fc}
            <Button
              onClick={() => addChanges?.(f.key)}
              className={`!flex-1  !bg-transparent group ${checkIsExistField(f.key) ? '!text-[var(--color-primary)]' : 'text-white'}`}
              label={
                <FaEdit className="group-hover:!text-[var(--color-primary)] transition-all duration-200 ease-in" />
              }
            />
          </div>
        );
      }
      return (
        <div key={index} className="flex items-center gap-4">
          {fc}
          <Button
            disabled
            className="!flex-1 !bg-transparent hover:!text-[var]"
            label={<AiOutlineStop className="text-red-500" />}
          />
        </div>
      );
    });
    return fieldComponents;
  }, [defaultValue, changes, adminGroupOptions]);

  const handleEdit = (data: any) => {
    resetChanges?.();
    onEdit?.(data);
  };

  return (
    <div className="w-full gap-8">
      <Form
        ref={formRef}
        className="w-full"
        defaultValues={defaultValue}
        onSubmit={data => handleEdit(data)}
      >
        <div className="p-4">
          <div className="rounded w-28 h-28 mb-1">
            <img
              className="rounded"
              src={defaultValue?.image ?? 'images/default.png'}
              alt=""
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="w-full">
              <p className="font-bold mb-1">{defaultValue.username}</p>
              <p className="font-light text-sm">{defaultValue.email}</p>
            </div>
            <div className="w-1/4">
              <SwitchField
                className="flex-1"
                label="Status"
                enabled={defaultValue?.status}
                name="status"
                onToggle={() => addChanges?.('status')}
              />
            </div>
          </div>
        </div>
        <div className="px-4">{generateField()}</div>
        <div className="sticky  bottom-0 bg-[var(--color-secondary-background)] p-4 items-center w-full flex gap-4 justify-end">
          { changes.length > 0 && (
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
            onClick={() => onCloseModal()}
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

export default DetailAdminForm;
