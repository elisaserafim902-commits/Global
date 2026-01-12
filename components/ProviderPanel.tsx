
import React from 'react';
import { Order, OrderStatus, ProviderStatus } from '../types';
import { Truck, CheckCircle, Package, User, Clock, MapPin, ClipboardList, Shield, Zap, Award, Star, Settings } from 'lucide-react';
import { MOCK_PROVIDER } from '../constants';

interface ProviderPanelProps {
  orders: Order[];
  onUpdateStatus: (id: string, status: OrderStatus) => void;
}

const ProviderPanel: React.FC<ProviderPanelProps> = ({ orders, onUpdateStatus }) => {
  const jobs = orders.filter(o => o.familyApproved || o.status === OrderStatus.MATCHING);

  return (
    <div className="space-y-12 animate-fadeIn pb-24">
      <header className="bg-[#111827] p-12 rounded-[80px] text-white shadow-4xl border-b-[24px] border-blue-600 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="flex justify-between items-start relative z-10">
          <div className="flex items-center gap-6">
             <div className="w-24 h-24 rounded-[32px] border-4 border-white/20 overflow-hidden shadow-2xl">
                <img src={MOCK_PROVIDER.avatar} alt="Avatar" className="w-full h-full object-cover" />
             </div>
             <div>
                <h2 className="text-4xl font-black tracking-tighter uppercase">{MOCK_PROVIDER.name}</h2>
                <div className="flex items-center gap-2 mt-2">
                   <Award size={16} className="text-blue-400" />
                   <span className="text-sm font-black text-blue-400 uppercase tracking-widest">{MOCK_PROVIDER.status}</span>
                </div>
             </div>
          </div>
          <button className="bg-white/10 p-4 rounded-3xl border border-white/10">
             <Settings size={32} />
          </button>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-6 relative z-10">
           <div className="bg-white/5 p-6 rounded-[32px] border border-white/10 text-center">
              <p className="text-[10px] font-black opacity-40 uppercase tracking-[0.3em] mb-2">Ethical Score</p>
              <div className="flex items-center justify-center gap-2">
                 <Star size={24} className="text-amber-400 fill-current" />
                 <span className="text-4xl font-black">{MOCK_PROVIDER.ethicalScore}</span>
              </div>
           </div>
           <div className="bg-white/5 p-6 rounded-[32px] border border-white/10 text-center">
              <p className="text-[10px] font-black opacity-40 uppercase tracking-[0.3em] mb-2">Social Impact</p>
              <span className="text-4xl font-black">Gold</span>
           </div>
        </div>
      </header>

      <div className="space-y-10">
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-4">
              <ClipboardList size={32} className="text-blue-600" />
              <h3 className="text-4xl font-black tracking-tighter uppercase">Missões Ativas</h3>
           </div>
           <span className="bg-blue-600 text-white px-6 py-2 rounded-full font-black text-sm">{jobs.length}</span>
        </div>

        {jobs.length === 0 ? (
          <div className="text-center py-32 bg-gray-50 rounded-[80px] border-4 border-dashed border-gray-200">
            <Package size={100} className="mx-auto text-gray-200 mb-8" />
            <p className="text-3xl font-black text-gray-300 uppercase tracking-widest">Aguardando Luiza IA...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {jobs.map(job => (
              <div key={job.id} className="bg-white p-10 rounded-[70px] shadow-4xl border-4 border-gray-50 hover:border-blue-100 transition-all group">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                       <span className={`text-xs font-black px-4 py-1 rounded-full uppercase tracking-widest ${
                         job.urgency === 'urgent' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                       }`}>
                         {job.category}
                       </span>
                    </div>
                    <h3 className="font-black text-5xl text-gray-900 tracking-tighter leading-none">{job.patientName}</h3>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-3xl">
                     <MapPin size={32} className="text-blue-600" />
                  </div>
                </div>
                
                <div className="bg-gray-50/50 p-8 rounded-[40px] mb-10 border-2 border-gray-50 italic font-bold text-gray-600 text-2xl leading-snug">
                  "{job.description}"
                </div>

                <div className="flex flex-col gap-6">
                  {job.status === OrderStatus.MATCHING && (
                    <button 
                      onClick={() => onUpdateStatus(job.id, OrderStatus.PREPARING)}
                      className="w-full bg-blue-600 text-white py-10 rounded-[40px] font-black text-4xl shadow-xl active:scale-95 transition-all border-b-[16px] border-blue-900 uppercase tracking-tighter"
                    >
                      Aceitar Atendimento
                    </button>
                  )}
                  {job.status === OrderStatus.PREPARING && (
                    <button 
                      onClick={() => onUpdateStatus(job.id, OrderStatus.IN_PROGRESS)}
                      className="w-full bg-orange-500 text-white py-10 rounded-[40px] font-black text-4xl border-b-[16px] border-orange-800"
                    >
                      Iniciar Visita
                    </button>
                  )}
                  {job.status === OrderStatus.IN_PROGRESS && (
                    <button 
                      onClick={() => onUpdateStatus(job.id, OrderStatus.COMPLETED)}
                      className="w-full bg-emerald-600 text-white py-10 rounded-[40px] font-black text-4xl border-b-[16px] border-emerald-900"
                    >
                      Concluir Cuidado
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-blue-50 p-12 rounded-[70px] border-4 border-blue-100 flex items-center gap-10 shadow-inner">
         <div className="bg-white p-6 rounded-[32px] shadow-lg text-blue-600">
            <Shield size={64} />
         </div>
         <div>
            <h4 className="text-3xl font-black tracking-tight uppercase text-blue-900 leading-none mb-2">Ecossistema Seguro</h4>
            <p className="text-xl font-bold text-blue-700/70">Matching orquestrado por Luiza Decision Intelligence.</p>
         </div>
      </div>
    </div>
  );
};

export default ProviderPanel;
