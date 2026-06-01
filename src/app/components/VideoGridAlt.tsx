import { VideoCardAlt } from './VideoCardAlt';

interface Video {
  id: string;
  title: string;
  uploadDate: string;
  status: 'in_progress' | 'completed';
  imageUrl: string;
  sport?: string;
  duration?: string;
}

interface VideoGridAltProps {
  videos: Video[];
  onVideoClick: (videoId: string) => void;
  onDownload: (videoId: string) => void;
}

export function VideoGridAlt({ videos, onVideoClick, onDownload }: VideoGridAltProps) {
  if (videos.length === 0) {
    return (
      <div className="bg-surface-container/60 backdrop-blur-xl rounded-3xl p-20 text-center">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary-container flex items-center justify-center">
          <svg className="w-12 h-12 text-on-primary-container" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="mb-3 text-on-surface" style={{ fontSize: '1.5rem', fontWeight: '600' }}>Пока нет разборов</h3>
        <p className="text-on-surface-variant max-w-md mx-auto" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
          Загрузите первое видео, чтобы получить профессиональный разбор от тренера
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <VideoCardAlt
          key={video.id}
          {...video}
          onClick={() => onVideoClick(video.id)}
          onDownload={video.status === 'completed' ? () => onDownload(video.id) : undefined}
        />
      ))}
    </div>
  );
}
