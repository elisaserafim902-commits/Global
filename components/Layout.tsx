
import React from 'react';
import { UserRole, SystemMode } from '../types';
import { UI_STRINGS } from '../constants';
import { Shield, Globe, WifiOff, Compass, HeartHandshake } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  currentView: string;
  onViewChange: (view: string) => void;
  language: string;
  mode: SystemMode;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, activeRole, onRoleChange, currentView, onViewChange, language, mode 
}) => {
  const t = UI_STRINGS[language] || UI_STRINGS['pt-BR'];
  const isCollapse = mode === SystemMode.CRISIS || mode === SystemMode.OFFLINE;

  return (
    <div className={`min-h-screen flex flex-col max-w-md mx-auto shadow-4xl bg-white relative overflow-hidden font-sans transition-colors duration-1000 ${
      isCollapse ? 'bg-red-50' : 'bg-white'
    }`}>
      <header className={`px-10 py-12 flex justify-between items-center sticky top-0 backdrop-blur-md z-50 transition-colors ${
        isCollapse ? 'bg-red-900 text-white' : 'bg-white/80'
      }`}>
        <div className="cursor-pointer" onClick={() => onViewChange('HOME')}>
          <h1 className="text-3xl font-black tracking-tighter uppercase leading-none">
            {t.appName}
          </h1>
          <div className="flex items-center mt-1">
            <div className={`w-2 h-2 rounded-full mr-2 ${isCollapse ? 'bg-white animate-pulse' : 'bg-[#0B3C5D]'}`} />
            <p className="text-[9px] font-black tracking-[0.4em] uppercase opacity-50">Global Infrastructure</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {mode === SystemMode.OFFLINE && <WifiOff size={20} />}
          <div className="bg-gray-100/10 p-3 rounded-2xl">
             <Globe size={20} />
          </div>
        </div>
      </header>

      <main className="flex-1 px-10 pb-44 overflow-y-auto">
        {children}
      </main>

      <nav className={`fixed bottom-0 left-0 right-0 max-w-md mx-auto py-10 flex justify-around items-center px-10 z-50 transition-all ${
        isCollapse ? 'bg-red-950 text-white border-t border-white/10' : 'bg-white border-t-2 border-gray-50'
      }`}>
        {[
          { id: 'HOME', icon: Compass, label: 'GUIDE' },
          { id: 'ORDERS', icon: HeartHandshake, label: 'NETWORK' },
          { id: 'PROFILE', icon: Shield, label: 'TRUST' }
        ].map(item => (
          <button 
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`flex flex-col items-center p-3 rounded-3xl transition-all ${
              currentView === item.id ? 'opacity-100 scale-110' : 'opacity-30'
            }`}
          >
            <item.icon size={36} strokeWidth={currentView === item.id ? 3 : 2} />
          </button>
        ))}
      </nav>

      {/* Infrastructure Tag */}
      <div className="absolute top-0 left-0 w-full flex justify-center pointer-events-none">
         <span className="bg-[#0B3C5D] text-[7px] font-black text-white px-6 py-2 rounded-b-xl uppercase tracking-[0.5em]">{t.privacy}</span>
      </div>
    </div>
  );
};

export default Layout;
