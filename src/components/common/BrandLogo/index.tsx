import React from 'react';

interface BrandLogoProps {
  className?: string;
  logoUrl?: string;
}

const BrandLogo: React.FC<BrandLogoProps> = ({ logoUrl, className }) => {
  if (!logoUrl) return null;

  return (
    <img
      src={logoUrl}
      className={className}
      alt="Brand Logo"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain'
      }}
    />
  );
};

export default BrandLogo;
