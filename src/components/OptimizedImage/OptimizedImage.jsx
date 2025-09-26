import Image from "next/image";
import { useState } from "react";

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  fill = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  priority = false,
  className = "",
  style = {},
  loading = "lazy",
  quality = 75,
  placeholder = "blur",
  blurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=",
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  if (hasError) {
    return (
      <div 
        className={`${className} bg-gray-200 flex items-center justify-center`}
        style={{ width: fill ? '100%' : width, height: fill ? '100%' : height, ...style }}
      >
        <span className="text-gray-500 text-sm">Image unavailable</span>
      </div>
    );
  }

  const imageProps = {
    src: typeof src === 'string' ? src : (src?.src || src),
    alt: alt || "Image",
    className: `${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`,
    style: { objectFit: 'cover', ...style },
    onLoad: handleLoad,
    onError: handleError,
    quality,
    loading: priority ? 'eager' : loading,
    priority,
    ...props
  };

  if (fill) {
    return (
      <Image
        {...imageProps}
        fill
        sizes={sizes}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
      />
    );
  }

  return (
    <Image
      {...imageProps}
      width={width}
      height={height}
      sizes={sizes}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
    />
  );
};

export default OptimizedImage;