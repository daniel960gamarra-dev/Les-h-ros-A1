import React, { useState, useEffect } from 'react';
import { TabType } from './types';
import { Navbar } from './components/Navbar';
import { FichesView } from './components/FichesView';
import { GrammarExercisesView } from './components/GrammarExercisesView';
import { GamesView } from './components/GamesView';
import { ReadingComprehensionView } from './components/ReadingComprehensionView';
import { WritingProductionView } from './components/WritingProductionView';
import { OralComprehensionView } from './components/OralComprehensionView';
import { MockExamView } from './components/MockExamView';
import { ExternalLink, Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('fiches');
  const [studentName, setStudentName] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('fle_student_name') || '';
    }
    return '';
  });
  const [studentGroup, setStudentGroup] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('fle_student_group') || '7e';
    }
    return '7e';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('fle_student_name', studentName);
      localStorage.setItem('fle_student_group', studentGroup);
    }
  }, [studentName, studentGroup]);

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        studentName={studentName}
        setStudentName={setStudentName}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'fiches' && <FichesView />}
        {activeTab === 'grammaire' && <GrammarExercisesView />}
        {activeTab === 'jeux' && <GamesView />}
        {activeTab === 'comprehension_ecrite' && <ReadingComprehensionView />}
        {activeTab === 'production_ecrite' && <WritingProductionView />}
        {activeTab === 'comprehension_orale' && <OralComprehensionView />}
        {activeTab === 'examen_blanc' && (
          <MockExamView
            studentName={studentName}
            setStudentName={setStudentName}
            studentGroup={studentGroup}
            setStudentGroup={setStudentGroup}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="font-bold text-slate-700">
              Atelier d'étude – Français Débutants – 7<sup className="text-[10px]">e</sup> • I période 2026-2027
            </p>
            <p className="mt-1">
              Plateforme interactive conçue pour la préparation à l'examen cumulatif de français.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 text-[11px]">
            <span className="text-slate-400">Ressources orales associées :</span>
            <a
              href="https://www.lepointdufle.net/ressources_fle/audio_valerie-se-presente.htm"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 hover:underline flex items-center gap-1 font-medium"
            >
              Le Point du FLE (Valérie) <ExternalLink className="w-3 h-3" />
            </a>
            <span className="hidden sm:inline text-slate-300">•</span>
            <a
              href="https://www.podcastfrancaisfacile.com/texte/victor_hugo-1.html"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 hover:underline flex items-center gap-1 font-medium"
            >
              Podcast Français Facile (Victor Hugo) <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
