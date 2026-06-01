import { X, Upload, FileVideo, AlertCircle } from 'lucide-react';
import { useState, useRef } from 'react';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OrderModal({ isOpen, onClose }: OrderModalProps) {
  const [title, setTitle] = useState('');
  const [sport, setSport] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sports = ['Хоккей', 'Футбол', 'Баскетбол', 'Теннис', 'Волейбол', 'Другое'];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('video/')) {
      setFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = () => {
    console.log('Заказ разбора:', { title, sport, file });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose}></div>

      <div className="relative bg-surface-container/95 backdrop-blur-xl rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2.5 hover:bg-surface-variant/60 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-on-surface-variant" />
        </button>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-blue-500/10 flex items-center justify-center">
            <Upload className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h2 className="text-on-surface mb-1" style={{ fontSize: '1.5rem', fontWeight: '600', letterSpacing: '-0.02em' }}>
              Заказать разбор
            </h2>
            <p className="text-on-surface-variant" style={{ fontSize: '0.9375rem' }}>
              Загрузите видео и получите профессиональный разбор
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-on-surface mb-3" style={{ fontSize: '0.875rem', fontWeight: '500' }}>
              Название видео
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-5 py-4 bg-surface-variant/60 rounded-2xl text-on-surface outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              style={{ fontSize: '1rem' }}
              placeholder="Например: Тренировка 01.06.2026"
            />
          </div>

          <div>
            <label className="block text-on-surface mb-4" style={{ fontSize: '0.9375rem', fontWeight: '500' }}>
              Вид спорта
            </label>
            <div className="grid grid-cols-3 gap-3">
              {sports.map((s) => (
                <button
                  key={s}
                  onClick={() => setSport(s)}
                  className={`px-4 py-3.5 rounded-2xl transition-all ${
                    sport === s
                      ? 'bg-gradient-to-r from-primary to-blue-600 text-on-primary shadow-md scale-105'
                      : 'bg-surface-variant/60 text-on-surface-variant hover:bg-primary-container/40'
                  }`}
                  style={{ fontSize: '0.9375rem', fontWeight: '600' }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-on-surface mb-4" style={{ fontSize: '0.9375rem', fontWeight: '500' }}>
              Видеофайл
            </label>

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-primary bg-gradient-to-br from-primary-container to-primary-container/60 scale-[1.02]'
                  : file
                  ? 'border-secondary bg-gradient-to-br from-secondary-container to-secondary-container/60'
                  : 'border-outline-variant bg-surface-variant/40 hover:bg-surface-variant/60 hover:border-primary/40'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {file ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-emerald-500 flex items-center justify-center shadow-lg">
                    <FileVideo className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-on-surface mb-1" style={{ fontSize: '1.125rem', fontWeight: '600' }}>
                      {file.name}
                    </p>
                    <p className="text-on-surface-variant" style={{ fontSize: '0.875rem' }}>
                      {(file.size / 1024 / 1024).toFixed(2)} МБ
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                    }}
                    className="px-5 py-2.5 bg-gradient-to-r from-error to-red-500 text-white rounded-full hover:shadow-lg transition-all"
                    style={{ fontSize: '0.875rem', fontWeight: '600' }}
                  >
                    Удалить файл
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-blue-500/10 flex items-center justify-center">
                    <Upload className="w-10 h-10 text-primary" />
                  </div>
                  <div>
                    <p className="text-on-surface mb-1" style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                      Перетащите видео сюда
                    </p>
                    <p className="text-on-surface-variant" style={{ fontSize: '0.9375rem' }}>
                      или нажмите, чтобы выбрать файл
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-br from-tertiary-container to-tertiary-container/60 rounded-2xl p-5 flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-on-tertiary-container mt-2 flex-shrink-0"></div>
            <div>
              <p className="text-on-tertiary-container mb-1" style={{ fontSize: '0.875rem', fontWeight: '600' }}>
                Стоимость разбора
              </p>
              <p className="text-on-tertiary-container" style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
                Индивидуальный разбор - 1000 ₽ • Командный разбор - 2000 ₽
              </p>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!title || !sport || !file}
            className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-blue-600 text-on-primary rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontSize: '1.125rem', fontWeight: '600' }}
          >
            <Upload className="w-6 h-6" />
            Отправить на разбор
          </button>
        </div>
      </div>
    </div>
  );
}
