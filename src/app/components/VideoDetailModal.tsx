import { X, Download, Calendar, Clock, Play } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

interface Video {
  id: string;
  title: string;
  uploadDate: string;
  status: 'in_progress' | 'completed';
  imageUrl: string;
  sport?: string;
  duration?: string;
}

interface VideoDetailModalProps {
  video: Video | null;
  isOpen: boolean;
  onClose: () => void;
  onDownload: (videoId: string) => void;
}

export function VideoDetailModal({ video, isOpen, onClose, onDownload }: VideoDetailModalProps) {
  if (!isOpen || !video) return null;

  const isCompleted = video.status === 'completed';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose}></div>

      <div className="relative bg-surface-container/95 backdrop-blur-xl rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2.5 hover:bg-surface-variant/60 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5 text-on-surface-variant" />
        </button>

        {/* Video Preview */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-6 bg-surface-variant">
          <ImageWithFallback
            src={video.imageUrl}
            alt={video.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

          {/* Play Button - только для завершенных */}
          {isCompleted && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-20 h-20 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform shadow-xl">
                <Play className="w-10 h-10 text-on-primary ml-1" fill="currentColor" />
              </button>
            </div>
          )}

          {/* In Progress Overlay */}
          {!isCompleted && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="text-center px-6">
                <Clock className="w-16 h-16 text-white mx-auto mb-4 animate-pulse" />
                <p className="text-white mb-2" style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                  Разбор в процессе
                </p>
                <p className="text-white/80" style={{ fontSize: '1rem' }}>
                  Тренер работает над вашим видео
                </p>
              </div>
            </div>
          )}

          {/* Duration Badge */}
          <div className="absolute bottom-4 left-4">
            <span className="px-4 py-2 bg-black/80 text-white rounded-full" style={{ fontSize: '0.9375rem', fontWeight: '500' }}>
              {video.duration}
            </span>
          </div>

          {/* Status Badge */}
          <div className="absolute top-4 right-4">
            {video.status === 'in_progress' ? (
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-tertiary to-orange-500 text-white rounded-full shadow-lg">
                <Clock className="w-5 h-5" />
                <span style={{ fontSize: '0.9375rem', fontWeight: '600' }}>В работе</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-secondary to-emerald-500 text-white rounded-full shadow-lg">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                <span style={{ fontSize: '0.9375rem', fontWeight: '600' }}>Готово</span>
              </span>
            )}
          </div>
        </div>

        {/* Video Info */}
        <div className="space-y-6">
          <div>
            <h2 className="text-on-surface mb-3" style={{ fontSize: '1.75rem', fontWeight: '600', lineHeight: '1.3' }}>
              {video.title}
            </h2>

            <div className="flex items-center gap-4 flex-wrap">
              {video.sport && (
                <div className="flex items-center gap-2 px-4 py-2 bg-primary-container rounded-full">
                  <span className="text-on-primary-container" style={{ fontSize: '0.9375rem', fontWeight: '500' }}>
                    {video.sport}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2 text-on-surface-variant">
                <Calendar className="w-4 h-4" />
                <span style={{ fontSize: '0.9375rem' }}>{video.uploadDate}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {isCompleted ? (
              <>
                <button
                  onClick={() => onDownload(video.id)}
                  className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-blue-600 text-on-primary rounded-full hover:shadow-xl shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-100"
                  style={{ fontSize: '1.125rem', fontWeight: '600' }}
                >
                  <Download className="w-6 h-6" />
                  Скачать разбор
                </button>

                <button
                  className="flex items-center gap-3 px-8 py-4 bg-surface-variant text-on-surface rounded-full hover:bg-surface-variant/80 transition-all"
                  style={{ fontSize: '1.125rem', fontWeight: '600' }}
                >
                  <Play className="w-6 h-6" />
                  Смотреть онлайн
                </button>
              </>
            ) : (
              <div className="w-full bg-gradient-to-br from-tertiary-container to-tertiary-container/60 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-on-tertiary-container mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-on-tertiary-container mb-1" style={{ fontSize: '1rem', fontWeight: '600' }}>
                      Разбор скоро будет готов
                    </p>
                    <p className="text-on-tertiary-container" style={{ fontSize: '0.9375rem', lineHeight: '1.6', opacity: 0.9 }}>
                      Обычно анализ видео занимает от 1 до 3 дней. Мы отправим уведомление, когда тренер закончит работу над вашим разбором.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Description Section */}
          {isCompleted && (
            <div className="bg-surface-variant/60 rounded-2xl p-6">
              <h3 className="text-on-surface mb-3" style={{ fontSize: '1.125rem', fontWeight: '600' }}>
                О разборе
              </h3>
              <p className="text-on-surface-variant" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
                Профессиональный анализ вашей игры от сертифицированного тренера. В разборе рассмотрены ключевые моменты, техника выполнения элементов, тактические решения и рекомендации по улучшению игры.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
