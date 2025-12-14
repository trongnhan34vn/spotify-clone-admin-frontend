import PageHeader from '../components/PageHeader';
import type { PageLayoutProps } from '../types/ui/PageLayout.type';

const PageLayout = ({ children, title, path }: PageLayoutProps) => {
  return (
    <div className="flex-1 overflow-y-scroll w-full relative h-full bg-[var(--color-secondary-background)] rounded">
      {/* Header */}
      <PageHeader title={title} path={path} />

      {/* Body */}
      <div className="pb-4 px-4">{children}</div>
    </div>
  );
};

export default PageLayout;
