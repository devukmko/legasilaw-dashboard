import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  gutter?: boolean; // Toggles padding
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'auto'; // Controls maxWidth
}

const Container = ({
  children,
  gutter = false,
  maxWidth = 'xl', // Default maxWidth is 'lg'
}: ContainerProps) => {
  const maxWidthClass = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-7xl',
    full: 'max-w-full',
    auto: 'max-w-auto',
  }[maxWidth];

  return (
    <div
      className={`container relative mx-auto px-1 md:px-4 ${
        gutter ? 'py-6' : ''
      } ${maxWidthClass}`}
    >
      {children}
    </div>
  );
};

export default Container;
