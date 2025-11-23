import React, { Fragment } from 'react';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from '@headlessui/react';
import { type ReactNode } from 'react';
import { FaXmark } from 'react-icons/fa6';

export type IProps = {
  children: ReactNode;
  open: boolean;
  title: string;
  closeModal: () => void;
  size?: 'xl' | '2xl' | '3xl' | '4xl' | '6xl' | '7xl';
};
const SideModal = ({
  children,
  open,
  title,
  closeModal,
  size = 'xl',
}: IProps) => {
  const getSize = (size: string) => {
    const sizeMap = new Map();
    sizeMap.set('xl', 'max-w-xl');
    sizeMap.set('2xl', 'max-w-2xl');
    sizeMap.set('3xl', 'max-w-3xl');
    sizeMap.set('4xl', 'max-w-4xl');
    sizeMap.set('6xl', 'max-w-6xl');
    sizeMap.set('7xl', 'max-w-7xl');
    if (!sizeMap.get(size)) return sizeMap.get('xl');
    return sizeMap.get(size);
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        // open={isOpen}
        as="div"
        className="relative z-[999] min-h-screen h-full focus:outline-none"
        onClose={closeModal}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-black/50 h-full transition-opacity ease-in-out duration-100"
            aria-hidden="true"
          />
        </Transition.Child>

        <div className="fixed inset-0 z-[9999] w-screen overflow-y-auto">
          <div className="flex items-center justify-end">
            <Transition.Child
              as={Fragment}
              enter="transform transition duration-200"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition duration-200"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <DialogPanel
                transition
                className={`relative h-full ${getSize(size)} w-full bg-[var(--color-bg-card)] duration-300 ease-out data-closed:opacity-0`}
              >
                <DialogTitle
                  as="h3"
                  className="text-2xl mb-5 font-medium bg-[var(--color-secondary-background)] p-4 text-white"
                >
                  {title}
                </DialogTitle>
                <div
                  onClick={closeModal}
                  className="absolute bg-transparent w-10 h-10 flex cursor-pointer items-center justify-center top-3 opacity-70 hover:opacity-100 transition-all duration-150 ease-in right-2"
                >
                  <FaXmark size={22} />
                </div>
                <div className="w-full h-full">{children}</div>
              </DialogPanel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SideModal;
