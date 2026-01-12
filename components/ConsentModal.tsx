
import React from 'react';
import { Shield, Check, X } from 'lucide-react';
import { UI_STRINGS } from '../constants';

interface ConsentModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
  language: string;
}

const ConsentModal: React.FC<ConsentModalProps> = ({ isOpen, onAccept, onDecline, language }) => {
  if (!isOpen) return null;
  const t = UI_STRINGS[language as keyof typeof UI_STRINGS] || UI_STRINGS['en-US'];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-[70px] w-full max-w-md p-14 shadow-4xl border-4 border-blue-100 flex flex-col items-center text-center">
        <div className="bg-blue-50 p-8 rounded-[40px] text-blue-600 mb-10 shadow-inner">
           <Shield size={80} strokeWidth={2.5} />
        </div>
        <h3 className="text-5xl font-black text-gray-900 tracking-tighter leading-tight mb-4">
          {t.consentRequest}
        </h3>
        <p className="text-2xl text-gray-500 font-bold mb-12">
          {t.consentExplain}
        </p>
        
        <div className="flex flex-col gap-6 w-full">
          <button 
            onClick={onAccept}
            className="w-full bg-blue-600 text-white py-10 rounded-[40px] font-black text-4xl shadow-3xl flex items-center justify-center border-b-[16px] border-blue-900 active:translate-y-4 active:border-b-0 transition-all"
          >
            <Check className="mr-4" size={40} /> Autorizar
          </button>
          <button 
            onClick={onDecline}
            className="w-full bg-gray-100 text-gray-400 py-10 rounded-[40px] font-black text-4xl active:scale-95 transition-all"
          >
            <X className="mr-4" size={40} /> Agora não
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentModal;
