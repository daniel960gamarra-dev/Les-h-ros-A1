import React, { useState } from 'react';
import { READING_TEXT, READING_QUESTIONS } from '../data/workshopData';
import { AudioButton } from './AudioButton';
import { BookOpen, CheckCircle, HelpCircle, Eye, EyeOff, Award, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ReadingComprehensionView: React.FC = () => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [justifications, setJustifications] = useState<Record<number, string>>({});
  const [showCorrection, setShowCorrection] = useState(false);

  // Quick self-check score calculation
  const getSelfScore = () => {
    let pts = 0;
    // Q1: FAUX
    if (answers[1] === 'FAUX') pts += 0.5;
    if ((justifications[1] || '').trim().length > 10) pts += 1.0;
    // Q2: Open (if filled)
    if ((answers[2] || '').trim().length > 10) pts += 2.0;
    // Q3: 'a'
    if (answers[3] === 'a') pts += 1.0;
    // Q4: Open (if filled)
    if ((answers[4] || '').trim().length > 10) pts += 2.0;
    // Q5: FAUX
    if (answers[5] === 'FAUX') pts += 0.5;
    if ((justifications[5] || '').trim().length > 10) pts += 1.0;
    // Q6: Open (if filled)
    if ((answers[6] || '').trim().length > 10) pts += 2.0;
    // Q7: 'c'
    if (answers[7] === 'c') pts += 1.0;
    return pts;
  };

  const fullText = READING_TEXT.paragraphs.join(' ');

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-sky-700 to-indigo-800 text-white rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold uppercase tracking-wider mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              Partie 2 – Compréhension Écrite (Note sur 11 points)
            </div>
            <h2 className="text-2xl sm:text-3xl font-black">
              {READING_TEXT.title}
            </h2>
            <p className="text-blue-100 text-sm mt-2 max-w-2xl">
              Conseils : Lis le texte deux fois. Pour les VRAI/FAUX, copie la phrase du texte qui justifie ta réponse. Pour les questions ouvertes, commence par le sujet et le verbe.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center border border-white/20">
            <span className="text-xs uppercase font-bold text-blue-200">Barème officiel</span>
            <div className="text-3xl font-black mt-1">
              {getSelfScore().toFixed(1)} <span className="text-sm font-normal text-blue-200">/ 11 pts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reading Text Box */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            📰 Le Texte de l'Atelier
          </h3>
          <AudioButton text={fullText} label="Écouter tout le texte" size="md" />
        </div>

        <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
          {READING_TEXT.paragraphs.map((para, idx) => (
            <div key={idx} className="p-3.5 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3">
              <span className="text-xs font-mono text-slate-400 mt-1 select-none">§{idx + 1}</span>
              <p className="flex-1">{para}</p>
              <AudioButton text={para} size="sm" />
            </div>
          ))}
        </div>
      </div>

      {/* Questions Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              Questions de Compréhension (7 questions)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Réponds directement dans les formulaires ci-dessous. Tu peux ensuite comparer tes réponses avec le corrigé officiel.
            </p>
          </div>

          <button
            onClick={() => {
              setShowCorrection(!showCorrection);
              if (!showCorrection) {
                try {
                  confetti({ particleCount: 30, spread: 50 });
                } catch {}
              }
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              showCorrection
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs'
            }`}
          >
            {showCorrection ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showCorrection ? 'Masquer le corrigé officiel' : 'Vérifier avec le corrigé (Page 8)'}
          </button>
        </div>

        {/* Question 1: VRAI/FAUX Super-héros */}
        <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 text-sm">
              1. Les super-héros plaisent seulement aux adultes. (1,5 point)
            </span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 font-semibold">
              1,5 pt
            </span>
          </div>

          <div className="flex gap-4">
            {['VRAI', 'FAUX'].map((choice) => (
              <button
                key={choice}
                onClick={() => setAnswers({ ...answers, 1: choice })}
                className={`px-6 py-2 rounded-xl text-sm font-bold border transition-all ${
                  answers[1] === choice
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300'
                }`}
              >
                {choice}
              </button>
            ))}
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">
              Justification (copie la phrase exacte du texte) :
            </label>
            <input
              type="text"
              value={justifications[1] || ''}
              onChange={(e) => setJustifications({ ...justifications, 1: e.target.value })}
              placeholder="« Les super-héros plaisent... »"
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white"
            />
          </div>

          {showCorrection && (
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
              <strong className="block text-amber-950">✓ Corrigé officiel :</strong>
              <p>Réponse : <strong>FAUX</strong> (0,5 pt).</p>
              <p>Justification : <em>« Les super-héros plaisent aux jeunes et aux adultes de tous les pays. »</em> (1 pt).</p>
            </div>
          )}
        </div>

        {/* Question 2: Caractéristiques de Mulan */}
        <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 text-sm">
              2. Donne deux caractéristiques de Mulan. (2 points : 1 pt par caractéristique)
            </span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 font-semibold">
              2,0 pts
            </span>
          </div>

          <textarea
            value={answers[2] || ''}
            onChange={(e) => setAnswers({ ...answers, 2: e.target.value })}
            placeholder="Ex : Mulan est jeune, elle est... Elle porte..."
            rows={2}
            className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white"
          />

          {showCorrection && (
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
              <strong className="block text-amber-950">✓ Corrigé officiel :</strong>
              <p>Mulan est <strong>jeune</strong>, <strong>courageuse</strong> et <strong>(très) intelligente</strong> (deux au choix). Elle porte aussi <strong>l'uniforme d'un soldat</strong> pour protéger son père.</p>
            </div>
          )}
        </div>

        {/* Question 3: Spider-Man QCM */}
        <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 text-sm">
              3. Spider-Man est très populaire parce qu'il… (1 point)
            </span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 font-semibold">
              1,0 pt
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
              { label: 'a', text: 'aide les habitants de la ville.' },
              { label: 'b', text: 'habite en Chine.' },
              { label: 'c', text: 'déteste les enfants.' }
            ].map((opt) => (
              <button
                key={opt.label}
                onClick={() => setAnswers({ ...answers, 3: opt.label })}
                className={`p-3 rounded-xl text-xs font-semibold text-left border transition-all ${
                  answers[3] === opt.label
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300'
                }`}
              >
                <strong className="block mb-0.5">{opt.label}.</strong>
                {opt.text}
              </button>
            ))}
          </div>

          {showCorrection && (
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
              <strong className="block text-amber-950">✓ Corrigé officiel :</strong>
              <p><strong>a. aide les habitants de la ville.</strong> (1 pt)</p>
            </div>
          )}
        </div>

        {/* Question 4: Peter Parker costume */}
        <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 text-sm">
              4. Où habite Peter Parker et comment est son costume ? Donne une réponse complète. (2 points)
            </span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 font-semibold">
              2,0 pts
            </span>
          </div>

          <textarea
            value={answers[4] || ''}
            onChange={(e) => setAnswers({ ...answers, 4: e.target.value })}
            placeholder="Commence par le sujet et le verbe : Peter Parker habite à... et son costume est..."
            rows={2}
            className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white"
          />

          {showCorrection && (
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
              <strong className="block text-amber-950">✓ Corrigé officiel :</strong>
              <p><strong>Peter Parker (Spider-Man) habite à New York</strong> (1 pt pour le lieu) et <strong>son costume est rouge et bleu</strong> avec un masque (1 pt pour le costume).</p>
            </div>
          )}
        </div>

        {/* Question 5: Frida Kahlo */}
        <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 text-sm">
              5. Frida Kahlo arrête de peindre après son accident. (1,5 point)
            </span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 font-semibold">
              1,5 pt
            </span>
          </div>

          <div className="flex gap-4">
            {['VRAI', 'FAUX'].map((choice) => (
              <button
                key={choice}
                onClick={() => setAnswers({ ...answers, 5: choice })}
                className={`px-6 py-2 rounded-xl text-sm font-bold border transition-all ${
                  answers[5] === choice
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300'
                }`}
              >
                {choice}
              </button>
            ))}
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">
              Justification (copie la phrase du texte) :
            </label>
            <input
              type="text"
              value={justifications[5] || ''}
              onChange={(e) => setJustifications({ ...justifications, 5: e.target.value })}
              placeholder="« ...mais elle continue à... »"
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white"
            />
          </div>

          {showCorrection && (
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
              <strong className="block text-amber-950">✓ Corrigé officiel :</strong>
              <p>Réponse : <strong>FAUX</strong> (0,5 pt).</p>
              <p>Justification : <em>« ...mais elle continue à peindre. »</em> (1 pt).</p>
            </div>
          )}
        </div>

        {/* Question 6: Lionel Messi */}
        <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 text-sm">
              6. Mentionne deux actions héroïques de Lionel Messi. (2 points)
            </span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 font-semibold">
              2,0 pts
            </span>
          </div>

          <textarea
            value={answers[6] || ''}
            onChange={(e) => setAnswers({ ...answers, 6: e.target.value })}
            placeholder="Deux actions : 1) Il... 2) Il..."
            rows={2}
            className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white"
          />

          {showCorrection && (
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
              <strong className="block text-amber-950">✓ Corrigé officiel :</strong>
              <p>Il travaille beaucoup ; il continue à jouer (malgré son problème de santé) ; il aide les enfants malades avec sa fondation (deux au choix - 2 pts).</p>
            </div>
          )}
        </div>

        {/* Question 7: Selon le texte, un héros... */}
        <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 text-sm">
              7. Selon le texte, un héros… (1 point)
            </span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 font-semibold">
              1,0 pt
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
              { label: 'a', text: 'a besoin de super-pouvoirs.' },
              { label: 'b', text: 'porte toujours un masque.' },
              { label: 'c', text: 'est généreux et protège les autres.' }
            ].map((opt) => (
              <button
                key={opt.label}
                onClick={() => setAnswers({ ...answers, 7: opt.label })}
                className={`p-3 rounded-xl text-xs font-semibold text-left border transition-all ${
                  answers[7] === opt.label
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300'
                }`}
              >
                <strong className="block mb-0.5">{opt.label}.</strong>
                {opt.text}
              </button>
            ))}
          </div>

          {showCorrection && (
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
              <strong className="block text-amber-950">✓ Corrigé officiel :</strong>
              <p><strong>c. est généreux et protège les autres.</strong> (1 pt)</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
