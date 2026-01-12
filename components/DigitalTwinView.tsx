
import React from 'react';
import { UserContext } from '../types';
import { Activity, ShieldAlert, Heart, Zap, Brain, Sparkles, TrendingUp } from 'lucide-react';

interface DigitalTwinViewProps {
  context: UserContext;
}

const DigitalTwinView: React.FC<DigitalTwinViewProps> = ({ context }) => {
  const { scores, twin } = context;

  const getScoreColor = (val: number) => {
    if (val > 80) return 'text-emerald-500';
    if (val > 50) return 'text-blue-500';
    return 'text-amber-500';
  };

  return (
    <div className="space-y-10 animate-fadeIn">
      <header className="flex items-center gap-6 mb-4">
        <div className="p-4 bg-indigo-600 text-white rounded-[24px] shadow-lg">
           <Brain size={40} />
        </div>
        <div>
           <h3 className="text-4xl font-black tracking-tighter uppercase leading-none">Gêmeo Digital</h3>
           <p className="text-xl font-bold text-gray-400">Padrão: {twin.behavioralPattern}</p>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-6">
        {[
          { icon: <ShieldAlert />, label: 'Confiança', val: scores.trust, key: 'trust' },
          { icon: <Heart />, label: 'Estabilidade', val: scores.stability, key: 'stability' },
          { icon: <TrendingUp />, label: 'Social', val: scores.socialEngagement, key: 'social' },
          { icon: <Activity />, label: 'Vulnerabilidade', val: scores.vulnerability, key: 'vuln' }
        ].map(s => (
          <div key={s.key} className="bg-white p-8 rounded-[40px] border-4 border-gray-50 shadow-3xl text-center relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                {/* Fixed TypeScript error by casting to React.ReactElement<any> */}
                {React.cloneElement(s.icon as React.ReactElement<any>, { size: 48 })}
             </div>
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{s.label}</p>
             <p className={`text-5xl font-black ${getScoreColor(s.val)}`}>{s.val}%</p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-[#111827] to-blue-900 p-10 rounded-[60px] text-white shadow-4xl relative">
        <div className="flex items-center gap-4 mb-6">
           <Sparkles size={32} className="text-blue-400" />
           <h4 className="text-2xl font-black uppercase tracking-tight">Análise de IA Ética</h4>
        </div>
        <p className="text-2xl font-bold italic opacity-80 leading-relaxed">
          "O padrão de sono e interação sugere um leve isolamento. Luiza recomenda uma visita familiar nos próximos 2 dias para fortalecer a estabilidade emocional."
        </p>
        <div className="mt-8 pt-8 border-t border-white/10 flex justify-between items-center">
           <span className="text-xs font-black uppercase tracking-widest text-blue-400">Aprendizado Contínuo v2.4</span>
           <Zap size={24} className="text-amber-400" />
        </div>
      </div>
      
      <div className="p-8 bg-blue-50 rounded-[40px] border-2 border-blue-100">
         <p className="text-blue-900 font-bold text-lg leading-snug">
           💡 <span className="font-black uppercase text-xs tracking-widest">Dica Luiza:</span> Tente perguntar sobre histórias de infância hoje. Isso estimula a memória afetiva e reduz a ansiedade noturna.
         </p>
      </div>
    </div>
  );
};

export default DigitalTwinView;
