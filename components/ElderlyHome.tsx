
import React from 'react';
import { UI_STRINGS, COLORS } from '../constants';
import { UserContext, SystemMode, LifeState } from '../types';
import { Compass, ShieldCheck, Heart, AlertCircle, Eye, Activity, ShieldAlert } from 'lucide-react';

interface ElderlyHomeProps {
  onOrient: () => void;
  onRequestHelp: () => void;
  userContext: UserContext;
}

const ElderlyHome: React.FC<ElderlyHomeProps> = ({ onOrient, onRequestHelp, userContext }) => {
  const { language, mode, lifeState, twin, orientation } = userContext;
  const t = UI_STRINGS[language] || UI_STRINGS['pt-BR'];
  const isUrgent = mode === SystemMode.CRISIS || lifeState === LifeState.MASS_ALERT;

  return (
    <div className="flex flex-col items-center justify-between min-h-[75vh] py-12 animate-fadeIn">
      {/* The guide Presence Orb */}
      <div className="relative group cursor-pointer" onClick={onOrient}>
        <div className={`w-80 h-80 rounded-full flex items-center justify-center transition-all duration-1000 ${
          isUrgent ? 'bg-red-500/10' : 'bg-[#0B3C5D]/5'
        }`}>
          <div className={`w-64 h-64 rounded-full flex items-center justify-center border-4 border-dashed animate-spin-slow ${
            isUrgent ? 'border-red-400/30' : 'border-[#0B3C5D]/20'
          }`}></div>
          <div className={`absolute w-44 h-44 rounded-full shadow-blueprint flex flex-col items-center justify-center transition-all duration-700 ${
            isUrgent ? 'bg-red-600' : 'bg-[#0B3C5D]'
          } active:scale-90`}>
             <Compass size={90} className="text-white animate-pulse" />
          </div>
        </div>
        
        {/* Active Protection Signaling */}
        <div className="absolute -top-4 -right-4 bg-emerald-500 text-white p-5 rounded-full shadow-lg border-4 border-white animate-bounce-slow">
           <ShieldCheck size={40} />
        </div>
      </div>

      <div className="text-center space-y-4 max-w-sm px-4">
        <h2 className="text-5xl font-black text-[#0B3C5D] tracking-tighter leading-none">
          {t.presence}
        </h2>
        <p className="text-2xl font-bold text-gray-400 leading-tight">
          {isUrgent ? 'Visão Âmbar Prioritária Ativa.' : 'Caminhando em coerência com você.'}
        </p>
      </div>

      {/* RUPTURE 1: Active Life State Adaptation */}
      <div className="w-full space-y-8 px-4">
        {lifeState !== LifeState.STABLE && (
          <div className={`p-8 rounded-[40px] border-2 flex items-start gap-6 shadow-sm transition-colors ${
            isUrgent ? 'bg-red-50 border-red-100' : 'bg-amber-50 border-amber-100'
          }`}>
             {isUrgent ? <ShieldAlert className="text-red-600 mt-1" size={48} /> : <Eye className="text-amber-600 mt-1" size={48} />}
             <div>
                <p className={`text-xs font-black uppercase tracking-widest mb-1 ${isUrgent ? 'text-red-700' : 'text-amber-700'}`}>
                  {isUrgent ? t.massAlert : 'Visão Âmbar: Orientação'}
                </p>
                <p className={`text-2xl font-bold leading-tight ${isUrgent ? 'text-red-900' : 'text-amber-900'}`}>
                  {orientation?.primaryGoal || 'Luiza percebe seu silêncio. Tudo bem?'}
                </p>
             </div>
          </div>
        )}

        <div className="flex flex-col gap-6">
          <button 
            onClick={onOrient}
            className="w-full bg-[#0B3C5D] text-white py-12 rounded-[60px] font-black text-4xl shadow-blueprint border-b-[20px] border-[#082d47] active:translate-y-4 active:border-b-0 transition-all flex items-center justify-center gap-4"
          >
            {t.askGuide}
          </button>
          
          <button 
            onClick={onRequestHelp}
            className="w-full bg-[#111827] text-white py-12 rounded-[60px] font-black text-4xl shadow-4xl border-b-[20px] border-red-900/40 active:translate-y-4 active:border-b-0 transition-all flex items-center justify-center gap-4"
          >
            <AlertCircle size={44} /> {t.needSupport}
          </button>
        </div>
      </div>

      {/* RUPTURE 3: Vital Infrastructure Status */}
      <div className="w-full max-w-xs mt-8">
        <div className="flex justify-between items-end mb-2">
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Coerência Humanitária</p>
           <Activity size={18} className="text-emerald-500" />
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
           <div className="h-full bg-emerald-500 transition-all duration-[2000ms] ease-in-out" style={{ width: `${twin.vitalCoherence}%` }} />
        </div>
      </div>
    </div>
  );
};

export default ElderlyHome;
