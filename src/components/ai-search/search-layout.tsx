import { ReactNode } from "react";

interface SearchLayoutProps {
  children: ReactNode;
  title?: string;
}

export const SearchLayout = ({ children, title }: SearchLayoutProps) => {
  return (
    <div className="flex flex-col gap-6">
      {title && (
        <div className="mb-1">
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
      )}
      <div className="divide-y divide-gray-100">{children}</div>
    </div>
  );
};

export const SearchSection = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <div className={`py-4 ${className}`}>{children}</div>;
};
