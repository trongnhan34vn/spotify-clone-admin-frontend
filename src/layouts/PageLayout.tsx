import PageHeader from '../components/PageHeader';
import { spinner } from '../components/Spinner';
import type { PageLayoutProps } from '../types/ui/PageLayout.type';

const PageLayout = ({ children, title, path }: PageLayoutProps) => {
  const state = spinner.get();
  
  return (
    <div className={`flex-1 ${state ? 'overflow-hidden' : 'overflow-y-scroll'}  w-full relative h-full bg-[var(--color-secondary-background)] rounded`}>
      {/* Header */}
      <PageHeader title={title} path={path} />

      {/* Body */}
      <div className="pb-4 px-4">{children}</div>
    </div>
  );
};

export default PageLayout;
