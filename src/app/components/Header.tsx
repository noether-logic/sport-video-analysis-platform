import { User, Bell, Video, Wallet, Plus } from 'lucide-react';

interface HeaderProps {
  userName: string;
  balance: number;
  onTopUp: () => void;
}

export function Header({ userName, balance, onTopUp }: HeaderProps) {
  return (
    <header className="bg-surface/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/20">
            <Video className="w-6 h-6 text-on-primary" />
          </div>
          <div>
            <h2 className="text-on-surface leading-tight">Видеоразборы</h2>
            <p className="text-on-surface-variant" style={{ fontSize: '0.875rem' }}>Спортивная платформа</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-gradient-to-r from-secondary-container to-secondary-container/80 rounded-full pl-5 pr-2 py-2 shadow-sm">
            <Wallet className="w-5 h-5 text-on-secondary-container mr-2.5" />
            <div className="flex items-baseline gap-1.5 mr-3">
              <span className="text-on-secondary-container" style={{ fontSize: '1.125rem', fontWeight: '600', letterSpacing: '-0.01em' }}>
                {balance.toLocaleString('ru-RU')}
              </span>
              <span className="text-on-secondary-container opacity-70" style={{ fontSize: '0.875rem' }}>₽</span>
            </div>

            <button
              onClick={onTopUp}
              className="flex items-center gap-2 px-5 py-2.5 bg-tertiary-container text-on-tertiary-container rounded-full hover:shadow-md transition-all"
              style={{ fontSize: '0.875rem', fontWeight: '500' }}
            >
              <Plus className="w-4 h-4" />
              Пополнить
            </button>
          </div>

          <button className="relative p-3 hover:bg-surface-variant rounded-full transition-colors">
            <Bell className="w-5 h-5 text-on-surface-variant" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-error rounded-full"></span>
          </button>

          <button className="flex items-center gap-3 px-3 py-2 hover:bg-surface-variant rounded-full transition-colors">
            <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center">
              <User className="w-5 h-5 text-on-primary-container" />
            </div>
            <div className="text-left pr-2">
              <p className="text-on-surface leading-none" style={{ fontSize: '0.9375rem', fontWeight: '500' }}>{userName}</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
