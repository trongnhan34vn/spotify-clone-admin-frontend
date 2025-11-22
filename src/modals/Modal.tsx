import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { type ReactNode } from 'react';
import { FaXmark } from 'react-icons/fa6';

export type IProps = {
  children: ReactNode;
  open: boolean;
  title: string;
  closeModal: () => void;
  size?: 'xl' | '2xl' | '4xl' | '6xl' | '7xl';
};
const Modal = ({
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
    sizeMap.set('4xl', 'max-w-4xl');
    sizeMap.set('6xl', 'max-w-6xl');
    sizeMap.set('7xl', 'max-w-7xl');
    if (!sizeMap.get(size)) return sizeMap.get('xl');
    return sizeMap.get(size);
  };

  return (
    <Dialog
      open={open}
      as="div"
      className="relative z-[999] focus:outline-none"
      onClose={closeModal}
    >
      <div
        className="fixed inset-0 bg-black/50 transition-opacity ease-in-out duration-100"
        aria-hidden="true"
      />
      <div className="fixed inset-0 z-9999 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className={`w-full relative ${getSize(size)} rounded-xl bg-[var(--color-third)] p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0`}
          >
            <DialogTitle
              as="h3"
              className="text-2xl mb-5 font-medium text-white"
            >
              {title}
            </DialogTitle>
            <div
              onClick={closeModal}
              className="absolute bg-transparent w-10 h-10 flex cursor-pointer items-center justify-center top-2 opacity-70 hover:opacity-100 transition-all duration-150 ease-in right-2"
            >
              <FaXmark size={22} />
            </div>
            <div>{children}</div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
