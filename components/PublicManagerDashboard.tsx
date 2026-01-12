
import React from 'react';
import { Globe2, Map, FileSpreadsheet, Sparkles, TrendingUp, Award, ShieldAlert, Heart, Activity } from 'lucide-react';

const PublicManagerDashboard: React.FC = () => {
  return (
    <div className="space-y-12 animate-fadeIn pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase leading-none">Gestão Pública</h2>
          <p className="text-xl text-gray-500 font-bold mt-2">Observatório Global VitaCare</p>
        </div>
        <div className="bg-[#1F2937] p-5 rounded-[24px] text-white shadow-2xl">
          <Globe2 size={40} />
        </div>
      </div>

      {/* Global Scaling Metrics */}
      <div className="bg-[#1F2937] p-12 rounded-[70px] text-white shadow-4xl relative overflow-hidden border-b-[24px] border-blue-600">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 -mr-32 -mt-32 rounded-full"></div>
        <div className="flex justify-between items-start mb-12 relative z-10">
          <Map size={56} className="text-blue-400" />
          <span className="bg-blue-600 px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest">Painel Governamental</span>
        </div>
        <p className="text-3xl font-bold opacity-80 mb-2">Pessoas Monitoradas:</p>
        <p className="text-8xl font-black leading-none tracking-tighter">12.8k <span className="text-4xl opacity-50 font-bold tracking-normal">Usuários</span></p>
        
        <div className="mt-14 grid grid-cols-2 gap-8 relative z-10">
          <div className="bg-white/5 p-8 rounded-[40px] border border-white/10 shadow-inner">
            <p className="text-xs font-black opacity-50 uppercase tracking-[0.2em] mb-3 text-blue-300">Eficiência Geriátrica</p>
            <p className="text-5xl font-black text-white">+34%</p>
          </div>
          <div className="bg-white/5 p-8 rounded-[40px] border border-white/10 shadow-inner">
            <p className="text-xs font-black opacity-50 uppercase tracking-[0.2em] mb-3 text-green-300">Custos Reduzidos</p>
            <p className="text-5xl font-black text-white">R$ 1.8M</p>
          </div>
        </div>
      </div>

      {/* Trust & Stability Metrics */}
      <div className="grid grid-cols-2 gap-6">
         {[
           { icon: <ShieldAlert />, label: 'Confiança', val: '98%', col: 'text-blue-500' },
           { icon: <Heart />, label: 'Estabilidade', val: '86%', col: 'text-emerald-500' },
           { icon: <TrendingUp />, label: 'Engajamento', val: '72%', col: 'text-indigo-500' },
           { icon: <Activity />, label: 'Prevenção', val: '94%', col: 'text-orange-500' }
         ].map(s => (
           <div key={s.label} className="bg-white p-8 rounded-[40px] border-4 border-gray-50 shadow-3xl text-center">
              <div className={`flex justify-center mb-4 ${s.col}`}>
                {React.cloneElement(s.icon as React.ReactElement<any>, { size: 32 })}
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{s.label}</p>
              <p className={`text-5xl font-black ${s.col}`}>{s.val}</p>
           </div>
         ))}
      </div>

      {/* Social Impact Cards */}
      <div className="grid grid-cols-1 gap-10">
        <div className="bg-white p-12 rounded-[60px] border-4 border-gray-50 shadow-3xl flex items-start group hover:border-blue-100 transition-all">
          <div className="bg-blue-100 p-10 rounded-[32px] mr-12 text-blue-600 group-hover:scale-110 transition-transform">
            <Award size={56} />
          </div>
          <div>
            <h3 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">Impacto Social Ouro</h3>
            <p className="text-2xl text-gray-500 font-bold leading-tight mt-2">Nível recorde de dignidade humana e redução de isolamento social.</p>
          </div>
        </div>
      </div>

      {/* Real-time Indicator Panels */}
      <section className="pt-8">
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-5xl font-black tracking-tighter uppercase leading-none">Indicadores Ativos</h3>
          <button className="text-blue-600 bg-blue-50 p-5 rounded-[24px] active:scale-90 shadow-md">
             <FileSpreadsheet size={40} />
          </button>
        </div>
        <div className="space-y-8">
           {[
             { label: 'Visitas CRAS Prioritárias', val: '24', color: 'bg-red-600', trend: 'CRÍTICO' },
             { label: 'Inclusão Digital Geriátrica', val: '88%', color: 'bg-emerald-600', trend: 'ALTO' },
             { label: 'Economia de Emergência', val: 'R$ 420k', color: 'bg-blue-600', trend: 'MENSAL' }
           ].map(stat => (
             <div key={stat.label} className="bg-white p-10 rounded-[50px] border-4 border-gray-50 flex items-center justify-between shadow-2xl">
                <div className="flex flex-col">
                  <span className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-2">{stat.label}</span>
                  <span className="text-5xl font-black text-gray-950 leading-none">{stat.val}</span>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-black text-white px-6 py-3 rounded-2xl shadow-lg uppercase tracking-widest ${stat.color}`}>{stat.trend}</span>
                </div>
             </div>
           ))}
        </div>
      </section>

      <div className="bg-blue-50 p-16 rounded-[70px] border-4 border-blue-100 text-center shadow-inner">
         <Sparkles className="mx-auto text-blue-600 mb-8" size={72} />
         <h3 className="text-4xl font-black text-blue-900 mb-6 tracking-tighter uppercase">Visão Histórica</h3>
         <p className="text-2xl text-blue-800 font-bold leading-relaxed max-w-lg mx-auto">
           VitaCare não é apenas tecnologia. É a reconstrução do pacto social de cuidado em escala mundial.
         </p>
      </div>
    </div>
  );
};

export default PublicManagerDashboard;
