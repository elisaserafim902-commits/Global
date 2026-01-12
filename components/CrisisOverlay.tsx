
import React from 'react';
import { 
  ShieldAlert, MapPin, PhoneCall, Zap, Waves, Mountain, Wind, 
  Droplets, Flame, LandPlot, Snowflake, Sun, Biohazard, CheckCircle,
  Clock, Heart, MessageSquareHeart, ShieldCheck
} from 'lucide-react';
import { DisasterEvent, DisasterType, SystemMode, HumanitarianResponse } from '../types';
import { DISASTER_META, UI_STRINGS } from '../constants';

interface CrisisOverlayProps {
  disaster: DisasterEvent;
  humanitarianData?: HumanitarianResponse;
  onCallRescue: () => void;
  onCallFamily: () => void;
  onConfirmSafety: () => void;
  language: string;
  mode: SystemMode;
}

const CrisisOverlay: React.FC<CrisisOverlayProps> = ({ 
  disaster, humanitarianData, onCallRescue, onCallFamily, onConfirmSafety, language, mode 
}) => {
  const isHumanitarian = mode === SystemMode.HUMANITARIAN;
  const meta = DISASTER_META[disaster.type] || DISASTER_META[DisasterType.OFFICIAL_ALERT];
  const t = UI_STRINGS[language as keyof typeof UI_STRINGS] || UI_STRINGS['en-US'];

  return (
    <div className={`fixed inset-0 z-[200] ${isHumanitarian ? 'bg-slate-900' : meta.color} text-white flex flex-col items-center p-10 animate-fadeIn overflow-y-auto`}>
      {/* Background Texture */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none overflow-hidden">
         <div className="w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_40px,rgba(255,255,255,0.1)_40px,rgba(255,255,255,0.1)_80px)]"></div>
      </div>
      
      {/* guidance Header */}
      <div className="bg-white/10 px-8 py-3 rounded-full border border-white/20 mb-12 relative z-10 backdrop-blur-md">
         <span className="text-sm font-black tracking-[0.5em] uppercase">⚠️ orientação do guide</span>
      </div>
      
      {/* Header */}
      <div className="text-center relative z-10 space-y-6 mb-12">
        <h2 className="text-7xl font-black tracking-tighter uppercase leading-none text-white">
          {meta.label}
        </h2>
        <p className="text-3xl font-bold opacity-80 max-w-sm mx-auto leading-tight">
          {t.crisisDesc}
        </p>
      </div>

      {/* RUPTURE 2: Simplified Survival Interface */}
      <div className="bg-white p-12 rounded-[80px] w-full mb-12 relative z-10 shadow-blueprint text-slate-900">
         <h3 className="text-2xl font-black uppercase tracking-widest mb-8 border-b-4 border-gray-100 pb-6 flex items-center gap-4 text-[#0B3C5D]">
            <ShieldCheck size={36} /> Próximos Passos
         </h3>
         <ul className="space-y-10">
            {(humanitarianData?.daily_routine || disaster.guidance).map((step, i) => (
              <li key={i} className="flex items-start gap-8">
                 <div className="w-14 h-14 rounded-3xl bg-[#0B3C5D] text-white flex items-center justify-center font-black text-2xl flex-shrink-0 mt-1 shadow-lg">
                   {i+1}
                 </div>
                 <p className="text-3xl font-bold leading-tight text-slate-800">{step}</p>
              </li>
            ))}
         </ul>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 gap-6 w-full relative z-10 pb-16">
         <button 
           onClick={onConfirmSafety}
           className="w-full bg-emerald-500 text-white py-14 rounded-[60px] font-black text-5xl shadow-4xl flex items-center justify-center gap-4 border-b-[20px] border-emerald-900 active:translate-y-4 active:border-b-0 transition-all"
         >
           ESTOU EM SEGURANÇA
         </button>

         <div className="grid grid-cols-2 gap-4">
           <button 
             onClick={onCallRescue}
             className="bg-white text-red-600 py-12 rounded-[50px] font-black text-4xl shadow-3xl flex items-center justify-center gap-3 border-b-[16px] border-gray-200 active:translate-y-4 active:border-b-0 transition-all"
           >
             <Zap size={40} fill="currentColor" /> SOCORRO
           </button>
           
           <button 
             onClick={onCallFamily}
             className="bg-slate-800 text-white py-12 rounded-[50px] font-black text-4xl shadow-3xl flex items-center justify-center gap-3 border-b-[16px] border-black active:translate-y-4 active:border-b-0 transition-all"
           >
             <PhoneCall size={40} /> REDE
           </button>
         </div>
      </div>

      {isHumanitarian && humanitarianData?.ethical_justification && (
        <div className="bg-white/5 border-2 border-white/10 p-10 rounded-[60px] w-full mb-20 relative z-10">
           <p className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-3">Pacto Ético Sustentado</p>
           <p className="text-2xl font-bold text-white/70 leading-relaxed italic">"{humanitarianData.ethical_justification}"</p>
        </div>
      )}

      <div className="mt-8 flex items-center gap-6 bg-white/5 p-8 rounded-[50px] border border-white/5 mb-24 text-white/50">
         <MapPin size={40} />
         <p className="text-2xl font-bold leading-tight">Zonas de Refúgio em {disaster.location}</p>
      </div>
    </div>
  );
};

export default CrisisOverlay;
