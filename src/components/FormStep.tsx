import React from 'react';
import { FaCheck } from 'react-icons/fa6';

interface IProps {
  step: number;
  title: string;
  completed?: boolean;
  active?: boolean;
}
const FormStep = ({
  step,
  title,
  completed = false,
  active = false,
}: IProps) => {
  return (
    <div className="flex items-center gap-2">
      <p
        className={`${active || completed ? 'bg-[var(--color-primary)] font-bold' : 'bg-transparent text-[#777]'}  px-2.5 py-1 w-8 h-8 flex items-center justify-center  border-[1px] border-[var(--color-primary)] rounded-[50%]`}
      >
        {completed ? <FaCheck size={24} /> : step}
      </p>
      <p
        className={`${completed ? 'font-bold text-[var(--color-primary)]' : active ? 'font-bold text-white' : 'text-[#777]'}`}
      >
        {title}
      </p>
    </div>
  );
};

export default FormStep;
