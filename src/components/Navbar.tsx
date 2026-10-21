import React from 'react';
import { TabType } from '../types';
import { stopSpeech } from '../utils/speech';
import {
  BookOpen,
  CheckSquare,
  Gamepad2,
  FileText,
  PenTool,
  Headphones,
  Award,
  VolumeX,
  User,
  GraduationCap
} from 'lucide-react';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  studentName: string;
  setStudentName: (name: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  studentName,
  setStudentName
}) => {
  const tabs = [
    { id: 'fiches' as TabType, label: 'Fiches & Règles', icon: BookOpen, badge: 'Partie 1' },
    { id: 'grammaire' as TabType, label: 'Exercices Grammaire', icon: CheckSquare, badge: 'Ex. 1 à 8' },
    { id: 'jeux' as TabType, label: 'Jeux & Défis', icon: Gamepad2, badge: 'Ludique' },
    { id: 'comprehension_ecrite' as TabType, label: 'Compréhension Écrite', icon: FileText, badge: '11 pts' },
    { id: 'production_ecrite' as TabType, label: 'Production Écrite', icon: PenTool, badge: '8 pts' },
    { id: 'comprehension_orale' as TabType, label: 'Compréhension Orale', icon: Headphones, badge: 'Audio FLE' },
    { id: 'examen_blanc' as TabType, label: 'Examen Blanc', icon: GraduationCap, badge: 'Note / 20' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Brand Bar */}
        <div className="flex items-center justify-between py-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            {/* French Flag icon accent */}
            <div className="flex h-8 w-8 rounded-xl overflow-hidden shadow-xs border border-slate-200">
              <div className="w-1/3 bg-blue-600 h-full"></div>
              <div className="w-1/3 bg-white h-full"></div>
              <div className="w-1/3 bg-red-600 h-full"></div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-black text-slate-900 text-base sm:text-lg tracking-tight">
                  FLE 7<sup className="text-xs">e</sup>
                </h1>
                <span className="text-xs px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100">
                  I Période 2026-2027
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Atelier interactif • Présent de l'indicatif &amp; Compréhension FLE débutants
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Student Name field */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs">
              <User className="w-3.5 h-3.5 text-slate-500" />
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Ton prénom..."
                className="bg-transparent border-none text-xs font-semibold text-slate-800 focus:outline-none w-24 sm:w-32"
              />
            </div>

            {/* Silence Audio button */}
            <button
              onClick={() => stopSpeech()}
              title="Arrêter la voix audio"
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <VolumeX className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Navigation Tabs */}
        <nav className="flex items-center space-x-1 py-2 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  stopSpeech();
                  setActiveTab(tab.id);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-150 select-none ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-md font-semibold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
