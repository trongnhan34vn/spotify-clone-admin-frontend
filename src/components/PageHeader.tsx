import { useLocation, useNavigate } from 'react-router-dom';
import type { PageHeaderProps } from '../types/ui/PageHeader.type';
import { MdArrowRight } from 'react-icons/md';
import { routes } from '../routes/routes';

const PageHeader = ({ title }: PageHeaderProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const segments = pathname.split('/').filter(Boolean);
  const validPaths = routes.map(r => r.name.toString());
  const buildPath = (segments: string[], index: number) => {
    return '/' + segments.slice(0, index + 1).join('/');
  };

  return (
    <div className={`sticky top-0 bg-[var(--color-secondary-background)] z-20 p-4`}>
      {/* Title */}
      <p className="font-bold text-2xl mb-4">{title}</p>
      <div className="flex items-start justify-between">
        {/* Path */}
        <div className="text-sm text-[var(--color-muted)] flex">
          {/* <span>/</span> */}
          {/* <span className="cursor-pointer hover:underline">{path}</span> */}
          {segments.map((s, index) => {
            const path = buildPath(segments, index);
            const subPaths = path.split("/").filter(Boolean);
            const isValidPath = subPaths.some(p => validPaths.includes(p));
            
            return (
              <div
                key={index}
                onClick={() => isValidPath && navigate(path)}
                className="flex items-center"
              >
                <span
                  className={`cursor-pointer hover:underline 
                  ${index == segments.length - 1 ? 'font-bold' : ''}
                `}
                >
                  {s}
                </span>
                {index != segments.length - 1 && (
                  <span>
                    <MdArrowRight />
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
