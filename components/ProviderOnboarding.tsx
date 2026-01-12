
import React, { useState } from 'react';
import { UserRole, ProviderType, ProviderStatus } from '../types';
import { ShieldCheck, User, Globe, Briefcase, FileCheck, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import { validateProfessionalCredential } from '../services/geminiService';

interface ProviderOnboardingProps {
  onComplete: (profile: any) => void;
  country: string;
}

const ProviderOnboarding: React.FC<ProviderOnboardingProps> = ({ onComplete, country }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    type: ProviderType.CARE,
    credentialId: '',
    specialties: ''
  });
  const [isValidating, setIsValidating] = useState(false);

  const handleNext = async () => {
    if (step === 2) {
      setIsValidating(true);
      const result = await validateProfessionalCredential(formData.credentialId, country);
      setIsValidating(false);
      if (result.valid) setStep(3);
      else alert("Documento não reconhecido. Por favor, verifique os dados.");
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="space-y-12 animate-slideUp pb-24">
      <header className="text-center space-y-4 pt-10">
        <div className="inline-flex items-center gap-2 bg-blue-50 px-6 py-2 rounded-full border-2 border-blue-100">
           <ShieldCheck size={20} className="text-blue-600" />
           <span className="text-sm font-black text-blue-600 uppercase tracking-tighter">VitaCare Ecosystem</span>
        </div>
        <h2 className="text-7xl font-black text-gray-900 tracking-tighter leading-tight">
          Crie sua <br/> <span className="text-blue-600">Missão Ética</span>
        </h2>
        <p className="text-3xl text-gray-500 font-bold">Trabalhe onde o cuidado humano é valorizado.</p>
      </header>

      <div className="bg-white p-12 rounded-[80px] shadow-4xl border-4 border-gray-50">
        <div className="flex justify-between mb-16 relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-100 -translate-y-1/2 z-0" />
          {[1, 2, 3].map(s => (
            <div key={s} className={`w-16 h-16 rounded-full flex items-center justify-center font-black text-2xl relative z-10 transition-all ${
              step >= s ? 'bg-blue-600 text-white shadow-xl' : 'bg-white text-gray-300 border-4 border-gray-100'
            }`}>
              {s}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-8 animate-fadeIn">
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400">Como devemos te chamar?</label>
              <input 
                type="text" 
                placeholder="Nome Completo"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full p-8 rounded-[40px] border-4 border-gray-50 bg-gray-50 focus:bg-white focus:border-blue-600 text-3xl font-bold outline-none transition-all"
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { id: ProviderType.HEALTH, label: 'Saúde', icon: <FileCheck /> },
                { id: ProviderType.CARE, label: 'Cuidado', icon: <User /> },
                { id: ProviderType.SUPPORT, label: 'Apoio', icon: <Briefcase /> },
                { id: ProviderType.VOLUNTEER, label: 'Solidário', icon: <Globe /> }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setFormData({...formData, type: t.id})}
                  className={`p-10 rounded-[50px] border-4 flex flex-col items-center justify-center transition-all ${
                    formData.type === t.id ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-50 text-gray-400'
                  }`}
                >
                  {/* Fixed TypeScript error by casting to React.ReactElement<any> */}
                  <div className="mb-4">{React.cloneElement(t.icon as React.ReactElement<any>, { size: 48 })}</div>
                  <span className="font-black text-xl uppercase tracking-tighter">{t.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-10 animate-fadeIn">
            <div className="bg-indigo-50 p-8 rounded-[40px] border-2 border-indigo-100">
               <p className="text-indigo-800 font-bold text-xl leading-relaxed">
                 <Sparkles className="inline-block mr-2 text-indigo-600" size={24} />
                 Luiza valida sua identidade através de APIs oficiais em {country}.
               </p>
            </div>
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400">Registro Profissional (ID)</label>
              <input 
                type="text" 
                placeholder="Ex: COREN-SP 123456"
                value={formData.credentialId}
                onChange={e => setFormData({...formData, credentialId: e.target.value})}
                className="w-full p-8 rounded-[40px] border-4 border-gray-100 text-3xl font-bold outline-none"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center space-y-12 py-10 animate-fadeIn">
            <div className="w-40 h-40 bg-green-100 rounded-[50px] flex items-center justify-center text-green-600 mx-auto shadow-2xl border-4 border-white">
               <CheckCircle size={80} strokeWidth={3} />
            </div>
            <div>
              <h3 className="text-5xl font-black text-gray-900 tracking-tighter">Validado com Ética</h3>
              <p className="text-2xl text-gray-500 font-bold mt-4">Sua conta foi classificada como <span className="text-blue-600 font-black">VALIDADA</span>. Bem-vindo à rede.</p>
            </div>
            <button 
              onClick={() => onComplete(formData)}
              className="w-full bg-[#111827] text-white py-12 rounded-[50px] font-black text-4xl shadow-4xl border-b-[20px] border-blue-600 uppercase"
            >
              Começar Missão
            </button>
          </div>
        )}

        {step < 3 && (
          <button 
            disabled={isValidating}
            onClick={handleNext}
            className="w-full bg-blue-600 text-white py-12 rounded-[50px] font-black text-4xl mt-12 shadow-4xl flex items-center justify-center border-b-[20px] border-blue-900 active:translate-y-4 active:border-b-0 transition-all disabled:opacity-50"
          >
            {isValidating ? 'Validando na Nuvem...' : (
              <>Próximo <ArrowRight className="ml-4" size={40} /></>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProviderOnboarding;
