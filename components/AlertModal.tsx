'use client';

interface AlertModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

export function AlertModal({ isOpen, title, message, onClose }: AlertModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity">
      {/* Container do Modal */}
      <div className="w-full max-w-sm rounded-xl border border-neutral-800 bg-neutral-900 p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Ícone de Aviso */}
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        {/* Texto do Modal */}
        <div className="mt-4 text-center">
          <h3 className="text-base font-bold text-neutral-100">{title}</h3>
          <p className="mt-2 text-sm text-neutral-400 font-medium leading-relaxed">
            {message}
          </p>
        </div>

        {/* Botão de Fechar */}
        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 font-semibold text-sm text-neutral-200 transition-colors cursor-pointer focus:outline-none"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
