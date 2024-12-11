import Image from 'next/image';

interface LogoProps {
  src: string; // Path to the logo image
  alt?: string; // Alt text for the logo
  width?: number; // Width of the logo
  height?: number; // Height of the logo
  className?: string; // Additional styling classes
}

const Logo = ({
  src,
  alt = 'Logo',
  width = 40,
  height = 40,
  className = '',
}: LogoProps) => {
  return (
    <div className={`flex items-center space-x-2 text-primary hover:text-secondary ${className}`}>
        <div className="relative h-auto w-auto">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority
            className="object-contain"
          />
        </div>
    </div>
  );
};

export default Logo;
