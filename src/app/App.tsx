import { useState } from 'react';
import { Header } from './components/Header';
import { VideoGridAlt } from './components/VideoGridAlt';
import { TopUpModal } from './components/TopUpModal';
import { OrderModal } from './components/OrderModal';
import { Upload } from 'lucide-react';

export default function App() {
  const [balance] = useState(12500);
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const videos = [
    {
      id: '1',
      title: 'Тренировка 28.05.2026',
      uploadDate: '28 мая 2026',
      status: 'completed' as const,
      imageUrl: 'https://images.unsplash.com/photo-1545471977-94cac22e71ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob2NrZXklMjBwbGF5ZXIlMjBhY3Rpb24lMjBpY2V8ZW58MXx8fHwxNzgwMzQ4NjY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      sport: 'Хоккей',
      duration: '15:42',
    },
    {
      id: '2',
      title: 'Игра - финты и удары',
      uploadDate: '25 мая 2026',
      status: 'in_progress' as const,
      imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHNvY2NlciUyMHBsYXllciUyMGtpY2t8ZW58MXx8fHwxNzgwMzQ4NjY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      sport: 'Футбол',
      duration: '18:30',
    },
    {
      id: '3',
      title: 'Командная игра',
      uploadDate: '22 мая 2026',
      status: 'completed' as const,
      imageUrl: 'https://images.unsplash.com/flagged/photo-1550585477-a025700d7fce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxob2NrZXklMjBwbGF5ZXIlMjBhY3Rpb24lMjBpY2V8ZW58MXx8fHwxNzgwMzQ4NjY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      sport: 'Хоккей',
      duration: '22:15',
    },
    {
      id: '4',
      title: 'Броски',
      uploadDate: '20 мая 2026',
      status: 'in_progress' as const,
      imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwcGxheWVyJTIwZHVua3xlbnwxfHx8fDE3ODAzNDg2Njl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      sport: 'Баскетбол',
      duration: '14:20',
    },
    {
      id: '5',
      title: 'Передачи мяча',
      uploadDate: '18 мая 2026',
      status: 'completed' as const,
      imageUrl: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxmb290YmFsbCUyMHNvY2NlciUyMHBsYXllciUyMGtpY2t8ZW58MXx8fHwxNzgwMzQ4NjY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      sport: 'Футбол',
      duration: '12:55',
    },
    {
      id: '6',
      title: 'Подача 15.05',
      uploadDate: '15 мая 2026',
      status: 'completed' as const,
      imageUrl: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjBwbGF5ZXIlMjBzZXJ2ZXxlbnwxfHx8fDE3ODAzNDg2Njl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      sport: 'Теннис',
      duration: '16:10',
    },
    {
      id: '7',
      title: 'Матч - команда',
      uploadDate: '12 мая 2026',
      status: 'completed' as const,
      imageUrl: 'https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxiYXNrZXRiYWxsJTIwcGxheWVyJTIwZHVua3xlbnwxfHx8fDE3ODAzNDg2Njl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      sport: 'Баскетбол',
      duration: '25:30',
    },
    {
      id: '8',
      title: 'Игра 10.05',
      uploadDate: '10 мая 2026',
      status: 'completed' as const,
      imageUrl: 'https://images.unsplash.com/photo-1632649177901-89d46eec248f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxob2NrZXklMjBwbGF5ZXIlMjBhY3Rpb24lMjBpY2V8ZW58MXx8fHwxNzgwMzQ4NjY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      sport: 'Хоккей',
      duration: '20:45',
    },
    {
      id: '9',
      title: 'Дриблинг',
      uploadDate: '8 мая 2026',
      status: 'completed' as const,
      imageUrl: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxmb290YmFsbCUyMHNvY2NlciUyMHBsYXllciUyMGtpY2t8ZW58MXx8fHwxNzgwMzQ4NjY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      sport: 'Футбол',
      duration: '13:25',
    },
  ];

  const handleTopUp = () => {
    setIsTopUpModalOpen(true);
  };

  const handleNewOrder = () => {
    setIsOrderModalOpen(true);
  };

  const handleVideoClick = (videoId: string) => {
    console.log('Открыть видео:', videoId);
  };

  const handleDownload = (videoId: string) => {
    console.log('Скачать видео:', videoId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50/30">
      <Header
        userName="Иван Петров"
        balance={balance}
        onTopUp={handleTopUp}
      />

      <main className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-on-surface mb-2" style={{ fontSize: '2rem', fontWeight: '600' }}>
              Мои видеоразборы
            </h1>
            <p className="text-on-surface-variant" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
              Все ваши разборы от профессиональных тренеров
            </p>
          </div>

          <button
            onClick={handleNewOrder}
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-blue-600 text-on-primary rounded-full hover:shadow-xl shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-100"
            style={{ fontSize: '1.125rem', fontWeight: '600' }}
          >
            <Upload className="w-6 h-6" />
            Заказать разбор
          </button>
        </div>

        <VideoGridAlt
          videos={videos}
          onVideoClick={handleVideoClick}
          onDownload={handleDownload}
        />
      </main>

      <TopUpModal
        isOpen={isTopUpModalOpen}
        onClose={() => setIsTopUpModalOpen(false)}
      />

      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      />
    </div>
  );
}
