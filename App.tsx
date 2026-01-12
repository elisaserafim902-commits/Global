
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import ElderlyHome from './components/ElderlyHome';
import EasyOrder from './components/EasyOrder';
import FamilyDashboard from './components/FamilyDashboard';
import ConsentModal from './components/ConsentModal';
import DigitalTwinView from './components/DigitalTwinView';
import CrisisOverlay from './components/CrisisOverlay';
import { 
  UserRole, Order, OrderStatus, SystemMode, LifeState, UserContext, CareDigitalTwin, OrientationPath, DisasterEvent, DisasterType
} from './types';
import { MOCK_ELDERLY_USER, UI_STRINGS } from './constants';
import { assessLifeOrientation, translateOfficialAlert } from './services/geminiService';

const App: React.FC = () => {
  const [activeRole, setActiveRole] = useState<UserRole>(UserRole.USER);
  const [currentView, setCurrentView] = useState<string>('HOME');
  const [systemMode, setSystemMode] = useState<SystemMode>(SystemMode.NORMAL);
  const [lifeState, setLifeState] = useState<LifeState>(LifeState.STABLE);
  const [isConsentOpen, setIsConsentOpen] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);
  const [activeDisaster, setActiveDisaster] = useState<DisasterEvent | null>(null);

  const [twin, setTwin] = useState<CareDigitalTwin>({
    lastKnownMood: 'Balanced',
    behavioralPattern: 'Routine Coherence',
    vitalCoherence: 94,
    socialDensity: 78,
    resilienceScore: 90
  });

  const [ctx, setCtx] = useState<UserContext>({
    language: 'pt-BR',
    country: 'Brasil',
    complexity: MOCK_ELDERLY_USER.complexity,
    mode: systemMode,
    lifeState,
    twin,
    scores: {
      trust: 98,
      stability: 92,
      socialEngagement: 76,
      vulnerability: 8
    }
  });

  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const consent = localStorage.getItem('vitacare_trust_pact');
    if (!consent) setIsConsentOpen(true);
    else setHasConsented(true);
  }, []);

  const handleAcceptConsent = () => {
    localStorage.setItem('vitacare_trust_pact', 'true');
    setHasConsented(true);
    setIsConsentOpen(false);
  };

  // Continuous Life State Assessment
  useEffect(() => {
    if (!hasConsented || systemMode === SystemMode.CRISIS) return;
    const interval = setInterval(async () => {
      const orientation = await assessLifeOrientation(ctx);
      setCtx(prev => ({ ...prev, orientation }));
    }, 60000);
    return () => clearInterval(interval);
  }, [hasConsented, ctx, systemMode]);

  // RUPTURE 3: Mass Orientation Alert Logic
  const triggerOfficialMassAlert = async (rawMessage: string) => {
    setSystemMode(SystemMode.CRISIS);
    setLifeState(LifeState.MASS_ALERT);
    const steps = await translateOfficialAlert(rawMessage);
    setActiveDisaster({
      type: DisasterType.OFFICIAL_ALERT,
      location: 'Sua região local',
      guidance: steps,
      officialSource: 'Defesa Civil / Governo Central',
      translatedBy: 'guide'
    });
  };

  const renderView = () => {
    if (activeDisaster && activeRole === UserRole.USER) {
      return (
        <CrisisOverlay 
          disaster={activeDisaster}
          onCallRescue={() => alert("🚨 SOCORRO VITACARE ACIONADO.")}
          onCallFamily={() => alert("📞 Rede de afeto notificada.")}
          onConfirmSafety={() => { 
            setActiveDisaster(null); 
            setSystemMode(SystemMode.NORMAL); 
            setLifeState(LifeState.STABLE);
          }}
          language={ctx.language}
          mode={systemMode}
        />
      );
    }

    switch (currentView) {
      case 'HOME':
        return (
          <ElderlyHome 
            onOrient={() => setCurrentView('EASY_ORDER')} 
            onRequestHelp={() => triggerOfficialMassAlert("ALERTA: Possíveis chuvas extremas na região. Evite áreas de risco.")} 
            userContext={ctx}
          />
        );
      case 'EASY_ORDER':
        return <EasyOrder onBack={() => setCurrentView('HOME')} onOrderCreated={(o) => setOrders(p => [...p, o])} userContext={ctx} />;
      case 'ORDERS':
        return <FamilyDashboard orders={orders} onApprove={() => {}} onCancel={() => {}} />;
      case 'PROFILE':
        return (
          <div className="space-y-12 pb-24 animate-fadeIn">
            <DigitalTwinView context={ctx} />
            <div className="bg-gray-100 p-8 rounded-[50px] space-y-6">
               <p className="text-xs font-black uppercase text-gray-400 tracking-widest">Infraestrutura: Simulações</p>
               <div className="grid grid-cols-1 gap-4">
                  <button onClick={() => setSystemMode(SystemMode.OFFLINE)} className="bg-[#111827] text-white p-8 rounded-3xl font-black text-2xl">Simular Falha de Infraestrutura</button>
                  <button onClick={() => setLifeState(LifeState.ISOLATION_RISK)} className="bg-amber-500 text-white p-8 rounded-3xl font-black text-2xl">Simular Declínio Silencioso</button>
                  <button onClick={() => triggerOfficialMassAlert("AVISO OFICIAL: Protocolo de segurança sanitária nível 3 ativado.")} className="bg-red-600 text-white p-8 rounded-3xl font-black text-2xl">Simular Alerta de Massa</button>
                  <button onClick={() => { setSystemMode(SystemMode.NORMAL); setLifeState(LifeState.STABLE); setActiveDisaster(null); }} className="bg-emerald-600 text-white p-8 rounded-3xl font-black text-2xl">Restaurar Coerência</button>
               </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout 
      activeRole={activeRole} 
      onRoleChange={setActiveRole} 
      currentView={currentView}
      onViewChange={setCurrentView}
      language={ctx.language}
      mode={systemMode}
    >
      <ConsentModal 
        isOpen={isConsentOpen} 
        onAccept={handleAcceptConsent}
        onDecline={() => setIsConsentOpen(false)}
        language={ctx.language}
      />
      {renderView()}
    </Layout>
  );
};

export default App;
