
import { useState, useEffect } from 'react';
import { getTextColor } from '@/lib/utils/color';
import { PhotoItem } from '@shared/schema';

interface PhotoSlideshowProps {
  photos: PhotoItem[];
  color: string;
  settings: {
    slideshowInterval?: number;
    transitionDuration?: number;
  };
}

export function PhotoSlideshow({ photos, color, settings }: PhotoSlideshowProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const textColor = getTextColor(color);
  const currentPhoto = photos[currentPhotoIndex];
  
  useEffect(() => {
    if (!photos || photos.length <= 1) return;
    
    const interval = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
        setTransitioning(false);
      }, settings?.transitionDuration || 750);
    }, (settings?.slideshowInterval || 7) * 1000);
    
    return () => clearInterval(interval);
  }, [photos, settings]);
  
  if (!photos || photos.length === 0) {
    return (
      <div className="h-full rounded-xl bg-white shadow-soft overflow-hidden">
        <div className="px-4 py-2 text-white" style={{ backgroundColor: color }}>
          <h2 className="font-bold" style={{ color: textColor }}>Family Photos</h2>
        </div>
        <div className="flex items-center justify-center h-full p-4">
          <p className="text-center text-[#7A7A7A]">No photos available</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-full rounded-xl bg-white shadow-soft overflow-hidden">
      <div className="px-4 py-2 text-white" style={{ backgroundColor: color }}>
        <h2 className="font-bold" style={{ color: textColor }}>Family Photos</h2>
      </div>
      
      <div className="photo-slideshow w-full h-[calc(100%-40px)] relative overflow-hidden">
        {currentPhoto && (
          <img 
            src={currentPhoto.path}
            alt="Family photo"
            className={`w-full h-full object-contain transition-opacity duration-750 ${
              transitioning ? 'opacity-0' : 'opacity-100'
            }`}
            style={{ 
              backgroundColor: '#f0f0f0'
            }}
            onError={(e) => console.error('Image failed to load:', e)}
          />
        )}
      </div>
    </div>
  );
}
