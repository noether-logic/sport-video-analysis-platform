import { X, Smartphone, Copy, Check, Wallet } from 'lucide-react';
import { useState } from 'react';

interface TopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TopUpModal({ isOpen, onClose }: TopUpModalProps) {
  const [amount, setAmount] = useState('1000');
  const [copied, setCopied] = useState(false);
  const phoneNumber = '+7 (999) 123-45-67';

  const handleCopy = () => {
    navigator.clipboard.writeText(phoneNumber.replace(/\D/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose}></div>

      <div className="relative bg-surface-container/95 backdrop-blur-xl rounded-3xl p-8 max-w-lg w-full animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2.5 hover:bg-surface-variant/60 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-on-surface-variant" />
        </button>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-blue-500/10 flex items-center justify-center">
            <Wallet className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h2 className="text-on-surface mb-1" style={{ fontSize: '1.5rem', fontWeight: '600', letterSpacing: '-0.02em' }}>
              Пополнение баланса
            </h2>
            <p className="text-on-surface-variant" style={{ fontSize: '0.9375rem' }}>
              Через Систему Быстрых Платежей
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-on-surface mb-4" style={{ fontSize: '0.9375rem', fontWeight: '500' }}>
              Выберите сумму
            </label>
            <div className="grid grid-cols-4 gap-3 mb-5">
              {['500', '1000', '2000', '5000'].map((val) => (
                <button
                  key={val}
                  onClick={() => setAmount(val)}
                  className={`px-4 py-3.5 rounded-2xl transition-all ${
                    amount === val
                      ? 'bg-primary text-on-primary scale-105'
                      : 'bg-surface-variant/60 text-on-surface-variant hover:bg-primary-container/40'
                  }`}
                  style={{ fontSize: '0.9375rem', fontWeight: '600' }}
                >
                  {val}
                </button>
              ))}
            </div>
            <div className="relative">
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))}
                className="w-full px-6 py-5 bg-surface-variant/60 rounded-2xl text-on-surface outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                style={{ fontSize: '1.5rem', fontWeight: '600', letterSpacing: '-0.02em' }}
                placeholder="0"
              />
              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-on-surface-variant" style={{ fontSize: '1.25rem', fontWeight: '500' }}>
                ₽
              </span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-secondary-container to-secondary-container/60 rounded-2xl p-6 space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                <Smartphone className="w-6 h-6 text-on-secondary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-on-secondary-container mb-1" style={{ fontSize: '0.8125rem', fontWeight: '500', opacity: 0.8 }}>
                  Номер телефона для СБП
                </p>
                <p className="text-on-secondary-container break-all" style={{ fontSize: '1.25rem', fontWeight: '600', letterSpacing: '-0.01em' }}>
                  {phoneNumber}
                </p>
              </div>
            </div>

            <button
              onClick={handleCopy}
              className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 bg-secondary text-on-secondary rounded-xl hover:shadow-lg transition-all"
              style={{ fontSize: '0.9375rem', fontWeight: '600' }}
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" />
                  Номер скопирован
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  Скопировать номер
                </>
              )}
            </button>
          </div>

          <div className="bg-tertiary-container/60 rounded-2xl p-5 flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-on-tertiary-container mt-2 flex-shrink-0"></div>
            <p className="text-on-tertiary-container" style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
              Баланс пополнится автоматически в течение 1-2 минут после оплаты
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
