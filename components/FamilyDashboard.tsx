
import React from 'react';
import { COLORS } from '../constants';
import { Order, OrderStatus } from '../types';
import { CheckCircle2, XCircle, Clock, AlertCircle, Heart, Shield, Sparkles, UserCheck } from 'lucide-react';

interface FamilyDashboardProps {
  orders: Order[];
  onApprove: (id: string) => void;
  onCancel: (id: string) => void;
}

const FamilyDashboard: React.FC<FamilyDashboardProps> = ({ orders, onApprove, onCancel }) => {
  const pendingOrders = orders.filter(o => !o.familyApproved && o.status === OrderStatus.RECEIVED);
  const activeOrders = orders.filter(o => o.familyApproved || o.status !== OrderStatus.RECEIVED);

  return (
    <div className="space-y-12 animate-fadeIn pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">Rede de Afeto</h2>
          <p className="text-xl text-gray-500 font-bold mt-2">Monitorando: Maria Silva</p>
        </div>
        <div className="bg-blue-600 p-5 rounded-[24px] text-white shadow-2xl">
          <UserCheck size={40} />
        </div>
      </div>

      {/* Trust & Ethics Metrics */}
      <div className="grid grid-cols-1 gap-8">
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-12 rounded-[60px] shadow-3xl shadow-blue-100 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 -mr-20 -mt-20 rounded-full"></div>
          <div className="flex items-center justify-between mb-8 relative z-10">
             <Heart size={56} fill="currentColor" />
             <span className="bg-white/20 px-6 py-3 rounded-2xl text-sm font-black uppercase tracking-widest border border-white/30">Infraestrutura Ativa</span>
          </div>
          <p className="text-2xl font-bold opacity-90 mb-2">Paz de Espírito:</p>
          <p className="text-6xl font-black leading-none">Maria está <br/> em segurança</p>
          <div className="mt-10 flex items-center bg-white/10 p-5 rounded-3xl border border-white/10">
             <Shield className="mr-4 text-green-300" size={32} />
             <p className="text-xl font-bold">Monitoramento Ético LGPD Ativo</p>
          </div>
        </div>
      </div>

      {/* Approvals as Care Actions */}
      <section className="bg-white">
        <div className="flex items-center mb-10">
          <div className="w-16 h-16 bg-yellow-100 rounded-[28px] flex items-center justify-center text-yellow-600 mr-6 shadow-sm">
             <Sparkles size={40} />
          </div>
          <h3 className="font-black text-4xl text-gray-900">Ações de Cuidado ({pendingOrders.length})</h3>
        </div>
        
        {pendingOrders.length === 0 ? (
          <div className="bg-gray-50 border-4 border-dashed border-gray-200 p-16 rounded-[60px] text-gray-400 text-center font-black text-3xl">
            Maria está tranquila. <br/> <span className="text-xl opacity-60 font-bold">Nenhuma ajuda pendente agora.</span>
          </div>
        ) : (
          <div className="space-y-8">
            {pendingOrders.map(order => (
              <div key={order.id} className="bg-white border-4 border-yellow-100 p-12 rounded-[60px] shadow-3xl relative">
                <div className="flex justify-between items-start mb-8">
                  <span className="text-xl font-black bg-yellow-400 text-white px-6 py-3 rounded-2xl uppercase tracking-tighter shadow-md">{order.category}</span>
                  <span className="text-lg text-gray-400 font-bold">{order.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <p className="text-gray-950 font-black text-4xl mb-12 leading-tight">"{order.description}"</p>
                <div className="flex gap-8">
                  <button 
                    onClick={() => onApprove(order.id)}
                    className="flex-[2] bg-green-600 hover:bg-green-700 text-white py-10 rounded-[40px] font-black flex items-center justify-center text-3xl shadow-3xl active:scale-95 transition-all border-b-[16px] border-green-900"
                  >
                    <CheckCircle2 size={40} className="mr-4" /> Aprovar
                  </button>
                  <button 
                    onClick={() => onCancel(order.id)}
                    className="flex-1 bg-gray-100 text-gray-400 py-10 rounded-[40px] font-black flex items-center justify-center text-3xl active:scale-95 border-b-[16px] border-gray-300"
                  >
                    <XCircle size={40} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Global Transparency Timeline */}
      <section>
        <div className="flex items-center mb-10 pt-10">
           <div className="w-16 h-16 bg-blue-100 rounded-[28px] flex items-center justify-center text-blue-600 mr-6 shadow-sm">
             <Clock size={40} />
          </div>
          <h3 className="font-black text-4xl text-gray-900">Linha de Cuidado</h3>
        </div>
        
        <div className="bg-white rounded-[60px] border-4 border-gray-100 shadow-2xl overflow-hidden">
          {activeOrders.length === 0 ? (
            <p className="p-16 text-gray-400 text-center font-black text-2xl">Iniciando monitoramento...</p>
          ) : (
            <div className="divide-y-4 divide-gray-50">
              {activeOrders.slice().reverse().map(order => (
                <div key={order.id} className="p-12 flex items-start group hover:bg-blue-50/50 transition-colors">
                  <div className={`p-6 rounded-[32px] mr-10 shadow-md ${
                    order.status === OrderStatus.DELIVERED ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {order.status === OrderStatus.DELIVERED ? <CheckCircle2 size={48} /> : <Clock size={48} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <p className="font-black text-gray-900 text-3xl leading-tight">{order.description}</p>
                      <span className="text-sm text-gray-400 font-bold whitespace-nowrap ml-6 uppercase">{order.timestamp.toLocaleDateString([], {day: '2-digit', month: 'short'})}</span>
                    </div>
                    <div className="flex items-center">
                      <span className={`text-sm font-black uppercase tracking-[0.2em] px-6 py-2 rounded-2xl ${
                        order.status === OrderStatus.DELIVERED ? 'bg-green-100 text-green-700 border-2 border-green-200' : 'bg-blue-100 text-blue-700 border-2 border-blue-200'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default FamilyDashboard;
