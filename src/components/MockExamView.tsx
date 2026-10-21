import React, { useState } from 'react';
import { READING_TEXT, READING_QUESTIONS, GRAMMAR_EXERCISES, WRITING_MODEL } from '../data/workshopData';
import { AudioButton } from './AudioButton';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Award,
  Printer,
  CheckCircle,
  Clock,
  User,
  GraduationCap,
  Sparkles,
  FileCheck
} from 'lucide-react';

interface MockExamViewProps {
  studentName: string;
  setStudentName: (name: string) => void;
  studentGroup: string;
  setStudentGroup: (group: string) => void;
}

export const MockExamView: React.FC<MockExamViewProps> = ({
  studentName,
  setStudentName,
  studentGroup,
  setStudentGroup
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [examAnswers, setExamAnswers] = useState<Record<string, any>>({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
    q6: '',
    q7: '',
    g1: '',
    g2: '',
    g3: '',
    g4: '',
    g5: '',
    g6: '',
    g7: '',
    g8: '',
    g9: '',
    g10: '',
    writing: ''
  });

  const handleComputeGrade = () => {
    setSubmitted(true);
    try {
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    } catch {}
  };

  // Quick grading logic
  let grammarScore = 0;
  if (examAnswers.g1 === 'B') grammarScore++;
  if (examAnswers.g2 === 'A') grammarScore++;
  if (examAnswers.g3 === 'B') grammarScore++;
  if (examAnswers.g4 === 'A') grammarScore++;
  if (examAnswers.g5 === 'B') grammarScore++;
  if (examAnswers.g6 === 'B') grammarScore++;
  if (examAnswers.g7 === 'C') grammarScore++;
  if (examAnswers.g8 === 'A') grammarScore++;
  if (examAnswers.g9 === 'A') grammarScore++;
  if (examAnswers.g10 === 'B') grammarScore++;

  let readingScore = 0;
  if (examAnswers.q1 === 'FAUX') readingScore += 1.5;
  if ((examAnswers.q2 || '').length > 10) readingScore += 2.0;
  if (examAnswers.q3 === 'a') readingScore += 1.0;
  if ((examAnswers.q4 || '').length > 10) readingScore += 2.0;
  if (examAnswers.q5 === 'FAUX') readingScore += 1.5;
  if ((examAnswers.q6 || '').length > 10) readingScore += 2.0;
  if (examAnswers.q7 === 'c') readingScore += 1.0;

  const words = (examAnswers.writing || '').trim().split(/\s+/).filter(Boolean).length;
  let writingScore = 0;
  if (words >= 100) writingScore = 8;
  else if (words >= 70) writingScore = 6;
  else if (words >= 40) writingScore = 4;
  else if (words > 0) writingScore = 2;

  const totalPoints = readingScore + grammarScore + writingScore; // Max 29
  const scoreOver20 = ((totalPoints / 29) * 20).toFixed(1);
  const scoreOver5 = ((totalPoints / 29) * 5.0).toFixed(1); // Standard Colombian scale

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold uppercase tracking-wider mb-3">
              <GraduationCap className="w-3.5 h-3.5" />
              Examen Blanc Cumulatif – 7e Année (I Période)
            </div>
            <h2 className="text-2xl sm:text-3xl font-black">
              Simulation Complète de l'Examen
            </h2>
            <p className="text-slate-300 text-sm mt-2 max-w-xl">
              Teste-toi en conditions réelles avec les 3 sections notées de l'atelier : Compréhension Écrite (11 pts), Grammaire (10 pts), et Rédaction (8 pts).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold flex items-center gap-2 text-white transition-all"
            >
              <Printer className="w-4 h-4" /> Imprimer le sujet
            </button>
          </div>
        </div>
      </div>

      {/* Student Identification Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Nom et Prénom de l'élève :</label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Ex : Sofia Gómez"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold text-slate-800"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Groupe / Classe :</label>
            <input
              type="text"
              value={studentGroup}
              onChange={(e) => setStudentGroup(e.target.value)}
              placeholder="Ex : 7e A"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold text-slate-800"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Période scolaire :</label>
            <div className="px-3 py-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 font-semibold">
              I Période 2026-2027
            </div>
          </div>
        </div>
      </div>

      {/* Submitted Results Banner */}
      {submitted && (
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl p-6 sm:p-8 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6 animate-fadeIn">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase mb-2">
              <Trophy className="w-3.5 h-3.5" />
              Bulletin de Notes Officiel
            </div>
            <h3 className="text-2xl font-black">
              Félicitations, {studentName || 'Élève de 7e'} !
            </h3>
            <p className="text-emerald-100 text-xs sm:text-sm mt-1">
              Ton examen blanc a été corrigé automatiquement selon le barème officiel.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
            <div className="text-center px-3 border-r border-white/20">
              <span className="text-[11px] uppercase font-bold text-emerald-200">Total Points</span>
              <div className="text-2xl font-black">{totalPoints.toFixed(1)} / 29</div>
            </div>
            <div className="text-center px-3 border-r border-white/20">
              <span className="text-[11px] uppercase font-bold text-emerald-200">Note / 5.0 (Colombie)</span>
              <div className="text-2xl font-black text-amber-300">{scoreOver5} / 5.0</div>
            </div>
            <div className="text-center px-3">
              <span className="text-[11px] uppercase font-bold text-emerald-200">Note / 20 (France)</span>
              <div className="text-2xl font-black">{scoreOver20} / 20</div>
            </div>
          </div>
        </div>
      )}

      {/* Section 1: Compréhension Écrite */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">
            Partie 2 – Compréhension Écrite (11 points)
          </h3>
          <span className="text-xs font-semibold px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full">
            11 pts
          </span>
        </div>

        <div className="p-4 bg-slate-50 rounded-xl text-xs sm:text-sm text-slate-700 leading-relaxed italic border border-slate-200">
          « {READING_TEXT.paragraphs.slice(0, 2).join(' ')} ... »
        </div>

        <div className="space-y-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <label className="font-bold text-slate-800 block">
              1. Les super-héros plaisent seulement aux adultes. (1,5 pt)
            </label>
            <div className="flex gap-3">
              {['VRAI', 'FAUX'].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setExamAnswers({ ...examAnswers, q1: opt })}
                  className={`px-4 py-1.5 rounded-lg font-bold border ${
                    examAnswers.q1 === opt ? 'bg-indigo-600 text-white' : 'bg-white text-slate-700'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <label className="font-bold text-slate-800 block">
              2. Donne deux caractéristiques de Mulan. (2 pts)
            </label>
            <input
              type="text"
              value={examAnswers.q2}
              onChange={(e) => setExamAnswers({ ...examAnswers, q2: e.target.value })}
              placeholder="Mulan est..."
              className="w-full px-3 py-2 rounded-lg border bg-white"
            />
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <label className="font-bold text-slate-800 block">
              3. Spider-Man est très populaire parce qu'il… (1 pt)
            </label>
            <div className="flex gap-2">
              {['a', 'b', 'c'].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setExamAnswers({ ...examAnswers, q3: opt })}
                  className={`px-3 py-1.5 rounded-lg font-bold border uppercase ${
                    examAnswers.q3 === opt ? 'bg-indigo-600 text-white' : 'bg-white text-slate-700'
                  }`}
                >
                  Option {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Grammaire QCM */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">
            Partie 4 – Grammaire QCM Express (10 points)
          </h3>
          <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-100 text-indigo-800 rounded-full">
            10 pts
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {GRAMMAR_EXERCISES.ex1.map((item) => (
            <div key={item.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <span className="font-bold text-slate-800 block">
                {item.id}. {item.question}
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {item.options.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => setExamAnswers({ ...examAnswers, [`g${item.id}`]: opt.label })}
                    className={`p-1.5 rounded-lg font-bold border text-center transition-all ${
                      examAnswers[`g${item.id}`] === opt.label
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    {opt.label}. {opt.text}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Production Écrite */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">
            Partie 3 – Production Écrite (8 points)
          </h3>
          <span className="text-xs font-semibold px-2.5 py-1 bg-teal-100 text-teal-800 rounded-full">
            8 pts
          </span>
        </div>

        <p className="text-xs text-slate-500">
          Présente un personnage célèbre à la première personne (« je ») au présent de l'indicatif (100 mots minimum).
        </p>

        <textarea
          value={examAnswers.writing}
          onChange={(e) => setExamAnswers({ ...examAnswers, writing: e.target.value })}
          rows={6}
          placeholder="Bonjour ! Je m'appelle..."
          className="w-full p-4 rounded-xl border border-slate-300 text-sm leading-relaxed"
        />

        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Mots rédigés : <strong>{words}</strong> / 100</span>
          <span>Critère : 100 mots min, être, avoir, -er, connecteurs.</span>
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center pt-4">
        <button
          onClick={handleComputeGrade}
          className="px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-base shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center gap-2 mx-auto"
        >
          <CheckCircle className="w-5 h-5" />
          Calculer ma Note Finale &amp; Corriger l'Examen
        </button>
      </div>
    </div>
  );
};
