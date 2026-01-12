
import React from 'react';
import { MOCK_TERRITORY, COLORS } from '../constants';
import { RiskLevel } from '../types';
import { Users, AlertTriangle, CheckCircle, MapPin, Search } from 'lucide-react';

const PublicAgentPanel: React.FC = () => {
  const getRiskColor = (risk: RiskLevel) => {
    switch (risk) {
      case RiskLevel.CRITICAL: return 'bg-red-600 text-white';
      case RiskLevel.HIGH: return 'bg-red-100 text-red-700';
      case RiskLevel.MEDIUM: return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-green-100 text-green-700';
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">Agente Comunitário</h2>
        <p className="text-xl text-gray-500 font-bold">Território: Zona Sul - Setor A</p>
      </div>

      <div className="bg-white p-6 rounded-3xl border-4 border-gray-50 flex items-center shadow-sm">
        <Search className="text-gray-400 mr-4" />
        <input type="text" placeholder="Buscar idoso por nome ou ID..." className="text-xl font-bold w-full outline-none" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-600 p-8 rounded-[32px] text-white shadow-xl shadow-blue-100">
           <Users size={32} className="mb-2" />
           <p className="text-sm font-bold opacity-80 uppercase">Atendidos</p>
           <p className="text-4xl font-black">124</p>
        </div>
        <div className="bg-red-600 p-8 rounded-[32px] text-white shadow-xl shadow-red-100">
           <AlertTriangle size={32} className="mb-2" />
           <p className="text-sm font-bold opacity-80 uppercase">Prioritários</p>
           <p className="text-4xl font-black">12</p>
        </div>
      </div>

      <section>
        <h3 className="text-2xl font-black mb-6 flex items-center">
           <MapPin className="mr-2 text-blue-600" /> Sua Lista de Cuidado
        </h3>
        <div className="space-y-4">
          {MOCK_TERRITORY.map(person => (
            <div key={person.id} className="bg-white p-6 rounded-[32px] border-2 border-gray-100 shadow-md flex items-center justify-between">
              <div className="flex-1">
                <p className="text-2xl font-black text-gray-900">{person.name}</p>
                <div className="flex items-center mt-1">
                  <span className={`text-xs font-black px-3 py-1 rounded-full uppercase mr-2 ${getRiskColor(person.risk)}`}>
                    Risco {person.risk}
                  </span>
                  <span className="text-xs text-gray-400 font-bold">Cód: {person.id}</span>
                </div>
              </div>
              <button className="bg-blue-50 text-blue-600 p-4 rounded-2xl active:scale-95 transition-transform">
                <CheckCircle size={28} />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PublicAgentPanel;
