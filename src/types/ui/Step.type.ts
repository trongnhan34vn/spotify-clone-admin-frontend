import type { ReactNode } from 'react';

export type Step = {
  step: number;
  title: string;
  component: ReactNode;
  active?: boolean;
  completed?: boolean;
};
