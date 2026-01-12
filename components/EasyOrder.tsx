
import React, { useState } from 'react';
import { ServiceCategory, OrderStatus, Order, UserContext, AIActionResponse } from '../types';
import { Apple, Pill, HeartPulse, Sparkles, ArrowLeft, Mic, UserCheck, ShieldCheck, HeartHandshake } from 'lucide-react';
import { processHumanNeed } from '../services/geminiService';

interface EasyOrderProps {
  onBack: () => void;
  onOrderCreated: (order: Order) => void;
  userContext: UserContext;
}

const EasyOrder: React.FC<EasyOrderProps> = ({ onBack, onOrderCreated, userContext }) => {
  const [helpText, setHelpText] = useState('');
  const [phase, setPhase] = useState<'IDLE' | 'ANALYZING' | 'MATCHING' | 'RESULT'>('IDLE');
  const [aiAction, setAiAction] = useState<AIActionResponse | null>(null);

  const categories = [
    { id: ServiceCategory.MARKET, label: 'Mercado', icon: <Apple size={64} />, color: '#4F46E5' },
    { id: ServiceCategory.PHARMACY, label: 'Remédios', icon: <Pill size={64} />, color: '#EF4444' },
    { id: ServiceCategory.COMPANIONSHIP, label: 'Conversar', icon: <HeartHandshake size={64} />, color: '#EC4899' },
    { id: ServiceCategory.PROFESSIONAL_CARE, label: 'Cuidado', icon: <HeartPulse size={64} />, color: '#10B981' },
  ];

  const handleSimpleOrder = (category: ServiceCategory) => {
    setPhase('MATCHING');
    setTimeout(() => {
      const newOrder: Order = {
        id: `ORD-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        category,
        description: `Necessidade de ${category.toLowerCase()}`,
        status: OrderStatus.MATCHING,
        timestamp: new Date(),
        patientName: "Dona Maria",
        familyApproved: false,
        urgency: category === ServiceCategory.COMPANIONSHIP ? 'emotional' : 'routine',
        matchedProvider: {
          name: "Dra. Helena",
          type: "Enfermeira Local",
          rating: 4.9,
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Helena"
        }
      };
      onOrderCreated(newOrder);
      setAiAction({
        detected_need: category,
        urgency_level: 'low',
        recommended_action: 'Matching provider',
        service_type: 'provider_presential',
        notify_family: true,
        notify_provider: true,
        explanation: `Oi Maria! Já encontrei a Dra. Helena para te ajudar. Ela está a caminho e seu filho já autorizou.`
      });
      setPhase('RESULT');
    }, 2000);
  };

  const handleHelpSubmit = async () => {
    if (!helpText.trim()) return;
    setPhase('ANALYZING');
    const result = await processHumanNeed(helpText, userContext);
    setAiAction(result);
    
    setTimeout(() => {
      setPhase('MATCHING');
      setTimeout(() => {
        const newOrder: Order = {
          id: `ORD-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
          category: ServiceCategory.HELP,
          description: helpText,
          status: result.notify_provider ? OrderStatus.MATCHING : OrderStatus.RECEIVED,
          timestamp: new Date(),
          patientName: "Dona Maria",
          familyApproved: !result.notify_family,
          urgency: result.urgency_level === 'critical' || result.urgency_level === 'high' ? 'urgent' : 'routine'
        };
        onOrderCreated(newOrder);
        setPhase('RESULT');
      }, 1500);
    }, 1200);
  };

  return (
    <div className="space-y-12 animate-slideUp min-h-screen">
      <button onClick={onBack} className="flex items-center text-gray-900 font-black text-5xl mb-10 p-8 -ml-8 rounded-[40px] active:bg-gray-100 transition-colors">
        <ArrowLeft size={64} className="mr-8 text-blue-600" /> Voltar
      </button>

      {phase === 'ANALYZING' && (
        <div className="flex flex-col items-center justify-center py-40 text-center space-y-12">
           <div className="relative">
              <div className="w-48 h-48 bg-blue-100 rounded-full animate-ping absolute opacity-20"></div>
              <div className="w-48 h-48 bg-blue-600 rounded-full flex items-center justify-center text-white relative z-10 shadow-4xl">
                 <Sparkles size={100} className="animate-pulse" />
              </div>
           </div>
           <h2 className="text-6xl font-black text-gray-900 tracking-tighter">Luiza está ouvindo...</h2>
           <p className="text-3xl font-bold text-gray-400">Interpretando sua necessidade com carinho.</p>
        </div>
      )}

      {phase === 'MATCHING' && (
        <div className="flex flex-col items-center justify-center py-40 text-center space-y-12 animate-fadeIn">
           <div className="flex gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-24 h-24 bg-gray-100 rounded-[30px] animate-pulse flex items-center justify-center text-gray-300">
                   <UserCheck size={40} />
                </div>
              ))}
           </div>
           <h2 className="text-6xl font-black text-gray-900 tracking-tighter uppercase">Orquestrando Rede</h2>
           <p className="text-3xl font-bold text-blue-600">Buscando o melhor cuidado em {userContext.country}...</p>
        </div>
      )}

      {phase === 'RESULT' && aiAction && (
        <div className={`p-16 rounded-[90px] shadow-4xl border-b-[24px] animate-fadeIn text-center ${
          aiAction.urgency_level === 'critical' ? 'bg-red-900 border-red-600' : 'bg-[#111827] border-blue-600'
        } text-white`}>
          <div className="flex justify-center mb-12">
             <div className="w-32 h-32 bg-blue-600/20 rounded-full flex items-center justify-center border-4 border-blue-500/30">
                <ShieldCheck size={84} className="text-blue-400" />
             </div>
          </div>
          <p className="text-5xl font-black leading-tight mb-16 tracking-tight">"{aiAction.explanation}"</p>
          <button 
            onClick={onBack}
            className="w-full bg-blue-600 text-white py-12 rounded-[50px] font-black text-5xl shadow-3xl active:scale-95 transition-transform uppercase tracking-tighter border-b-[12px] border-blue-900"
          >
            Entendido
          </button>
        </div>
      )}

      {phase === 'IDLE' && (
        <>
          <div className="bg-white">
            <h2 className="text-8xl font-black leading-none tracking-tighter text-gray-900">Como está você <br/> hoje, Maria?</h2>
            <p className="text-4xl font-bold mt-8 text-gray-400">Diga para a Luiza o que você sente.</p>
          </div>

          <div className="grid grid-cols-2 gap-10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleSimpleOrder(cat.id)}
                className="flex flex-col items-center justify-center p-14 rounded-[80px] shadow-3xl border-4 border-gray-50 active:border-blue-500 bg-white transition-all transform active:scale-90"
              >
                <div className="mb-10 p-10 rounded-[40px] shadow-inner" style={{ backgroundColor: `${cat.color}10`, color: cat.color }}>
                  {cat.icon}
                </div>
                <span className="font-black text-4xl text-gray-800 tracking-tighter">{cat.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-20">
            <div className="bg-gray-50 p-14 rounded-[90px] border-4 border-gray-100 shadow-inner">
              <div className="flex items-center mb-10">
                <div className="bg-blue-600 p-6 rounded-[24px] mr-8 text-white shadow-xl">
                  <Mic size={56} />
                </div>
                <h3 className="text-5xl font-black text-gray-900 tracking-tighter">Falar com a Luiza</h3>
              </div>
              
              <div className="space-y-10">
                <textarea
                  value={helpText}
                  onChange={(e) => setHelpText(e.target.value)}
                  placeholder="Fale naturalmente sobre o que precisa..."
                  className="w-full p-12 rounded-[60px] border-4 border-gray-100 focus:ring-16 focus:ring-blue-100 text-4xl min-h-[400px] shadow-xl font-bold placeholder-gray-300 outline-none bg-white"
                />
                
                <button
                  disabled={!helpText}
                  onClick={handleHelpSubmit}
                  className="w-full flex items-center justify-center bg-blue-600 text-white p-14 rounded-[70px] font-black text-6xl disabled:bg-gray-300 shadow-4xl active:scale-95 transition-transform border-b-[24px] border-blue-900"
                >
                  Ouvir e Agir
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EasyOrder;
