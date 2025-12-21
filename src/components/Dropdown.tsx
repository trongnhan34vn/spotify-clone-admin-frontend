import React, {
  Fragment,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

export type AnchorProps =
  | 'top'
  | 'top start'
  | 'top end'
  | 'bottom'
  | 'bottom start'
  | 'bottom end'
  | 'left'
  | 'left start'
  | 'left end'
  | 'right'
  | 'right start'
  | 'right end';

type IProps = {
  button: ReactNode;
  children: ReactNode;
  buttonClassName?: string;
  itemsClassName?: string;
  anchor?: AnchorProps;
  isStatic?: boolean;
  onChange?: (status: boolean) => void;
};
const Dropdown = ({
  button,
  children,
  buttonClassName,
  itemsClassName,
  anchor,
  isStatic,
  onChange,
}: IProps) => {
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState();

  useEffect(() => {
    onChange?.(isOpen as any);
  }, [isOpen]);

  useEffect(() => {
    const element = menuButtonRef.current;
    if (!element) return;

    const checkMenuState = () => {
      const isOpen = element
        .getAttribute('data-headlessui-state')
        ?.includes('open');
      setIsOpen(isOpen as any);
    };

    // Initial check
    checkMenuState();

    // Watch for attribute changes
    const observer = new MutationObserver(checkMenuState);
    observer.observe(element, {
      attributes: true,
      attributeFilter: ['data-headlessui-state'],
    });

    return () => observer.disconnect();
  }, []);
  return (
    <Menu>
      <>
        <MenuButton
          ref={menuButtonRef}
          className={`${buttonClassName} inline-flex items-center outline-none`}
        >
          {button}
        </MenuButton>
        <MenuItems
          
          {...(isStatic ? { static: true } : {})}
          transition
          anchor={anchor ?? 'bottom end'}
          className={`${itemsClassName} w-52 z-50 overflow-hidden origin-top-right rounded border border-white/5 bg-[var(--color-bg-card)] text-sm/6 text-white transition duration-100 ease-out focus:outline-none data-closed:scale-95 data-closed:opacity-0`}
        >
          {children}
        </MenuItems>
      </>
    </Menu>
  );
};

export default Dropdown;
