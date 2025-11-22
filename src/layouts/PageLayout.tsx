import PageHeader from '../components/PageHeader';
import type { PageLayoutProps } from '../types/ui/PageLayout.type';

const PageLayout = ({ children, title, path }: PageLayoutProps) => {
  return (
    <div className="flex-1 w-full relative h-full bg-[var(--color-secondary-background)] rounded p-4">
      {/* Header */}
      <PageHeader title={title} path={path} />

      {/* Body */}
      {children}
    </div>
  );
};

export default PageLayout;
