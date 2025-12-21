import { type ReactNode } from 'react';
interface IProps {
  children: ReactNode;
  className?: string;
}
const Table = ({ children, className }: IProps) => {
  return (
    <table border={1} className={`w-full table table-fixed ${className}`}>
      {children}
    </table>
  );
};

export default Table;
