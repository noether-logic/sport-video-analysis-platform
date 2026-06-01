import { Clock, CheckCircle, Play } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

interface VideoCardAltProps {
  id: string;
  title: string;
  uploadDate: string;
  status: 'in_progress' | 'completed';
  imageUrl: string;
  sport?: string;
  duration?: string;
  onClick: () => void;
}

export function VideoCardAlt({
  title,
  uploadDate,
  status,
  imageUrl,
  sport,
  duration = '12:45',
  onClick,
}: VideoCardAltProps) {

  return (
    <button
      onClick={onClick}
      className="w-full group bg-surface-container/80 backdrop-blur-sm rounded-3xl overflow-hidden hover:bg-surface-container transition-all text-left"
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-video overflow-hidden bg-surface-variant">
        <ImageWithFallback
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
            <Play className="w-7 h-7 text-on-primary ml-1" fill="currentColor" />
          </div>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="px-3 py-1.5 bg-black/80 text-white rounded-full" style={{ fontSize: '0.875rem', fontWeight: '500' }}>
            {duration}
          </span>
        </div>

        {/* Sport Badge */}
        {sport && (
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1.5 bg-primary-container/95 backdrop-blur-sm text-on-primary-container rounded-full" style={{ fontSize: '0.875rem', fontWeight: '500' }}>
              {sport}
            </span>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          {status === 'in_progress' ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-tertiary to-orange-500 text-white rounded-full shadow-lg">
              <Clock className="w-4 h-4" />
              <span style={{ fontSize: '0.8125rem', fontWeight: '600' }}>В работе</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-secondary to-emerald-500 text-white rounded-full shadow-lg">
              <CheckCircle className="w-4 h-4" />
              <span style={{ fontSize: '0.8125rem', fontWeight: '600' }}>Готово</span>
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-on-surface mb-3 line-clamp-2" style={{ fontSize: '1.125rem', fontWeight: '600', lineHeight: '1.4' }}>
          {title}
        </h3>

        <div className="flex items-center justify-between pt-3">
          <span className="text-on-surface-variant" style={{ fontSize: '0.875rem' }}>
            {uploadDate}
          </span>
        </div>
      </div>
    </button>
  );
}
