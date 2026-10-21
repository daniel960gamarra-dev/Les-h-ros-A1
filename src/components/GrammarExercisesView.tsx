import React, { useState } from 'react';
import { GRAMMAR_EXERCISES } from '../data/workshopData';
import { AudioButton } from './AudioButton';
import confetti from 'canvas-confetti';
import {
  CheckCircle,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  BookOpen,
  ArrowRight,
  Eye,
  EyeOff,
  Trophy,
  Check
} from 'lucide-react';

export const GrammarExercisesView: React.FC = () => {
  const [activeExercise, setActiveExercise] = useState<number>(1);
  const [showGlobalAnswers, setShowGlobalAnswers] = useState<boolean>(false);

  // States for Exercise 1 (MCQ)
  const [ex1Answers, setEx1Answers] = useState<Record<number, string>>({});

  // States for Fill-in Exercises 2, 3, 4, 5
  const [ex2Answers, setEx2Answers] = useState<Record<number, string>>({});
  const [ex3Answers, setEx3Answers] = useState<Record<number, string>>({});
  const [ex4Answers, setEx4Answers] = useState<Record<number, string>>({});
  const [ex5Answers, setEx5Answers] = useState<Record<number, string>>({});

  // States for Exercise 6 (Error correction)
  const [ex6Answers, setEx6Answers] = useState<Record<number, string>>({});

  // States for Exercise 7 (Word ordering)
  const [ex7WordPiles, setEx7WordPiles] = useState<Record<number, string[]>>({});

  // States for Exercise 8 (Léa's text)
  const [ex8Answers, setEx8Answers] = useState<Record<number, string>>({});

  // Trigger confetti
  const celebrate = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // fallback
    }
  };

  // Helper for word order exercise
  const handleWordClick = (exId: number, word: string, allWords: string[]) => {
    const current = ex7WordPiles[exId] || [];
    if (current.includes(word)) {
      setEx7WordPiles({
        ...ex7WordPiles,
        [exId]: current.filter((w) => w !== word)
      });
    } else {
      const next = [...current, word];
      setEx7WordPiles({
        ...ex7WordPiles,
        [exId]: next
      });
      // Check if finished and matches
      const expected = GRAMMAR_EXERCISES.ex7.find((item) => item.id === exId)?.correctOrder;
      const cleanCandidate = next.join(' ').replace(/\s+([?.!])/g, '$1');
      if (cleanCandidate.toLowerCase() === expected?.toLowerCase().replace(/\s+([?.!])/g, '$1')) {
        celebrate();
      }
    }
  };

  // Reset current exercise
  const handleResetCurrent = () => {
    if (activeExercise === 1) setEx1Answers({});
    if (activeExercise === 2) setEx2Answers({});
    if (activeExercise === 3) setEx3Answers({});
    if (activeExercise === 4) setEx4Answers({});
    if (activeExercise === 5) setEx5Answers({});
    if (activeExercise === 6) setEx6Answers({});
    if (activeExercise === 7) setEx7WordPiles({});
    if (activeExercise === 8) setEx8Answers({});
  };

  // Score calculations
  const calculateScore = () => {
    let score = 0;
    // Ex 1
    GRAMMAR_EXERCISES.ex1.forEach((q) => {
      if (ex1Answers[q.id] === q.correct) score++;
    });
    // Ex 2
    GRAMMAR_EXERCISES.ex2.forEach((q) => {
      if ((ex2Answers[q.id] || '').trim().toLowerCase() === q.expected.toLowerCase()) score++;
    });
    // Ex 3
    GRAMMAR_EXERCISES.ex3.forEach((q) => {
      if ((ex3Answers[q.id] || '').trim().toLowerCase() === q.expected.toLowerCase()) score++;
    });
    // Ex 4
    GRAMMAR_EXERCISES.ex4.forEach((q) => {
      if ((ex4Answers[q.id] || '').trim().toLowerCase() === q.expected.toLowerCase()) score++;
    });
    // Ex 5
    GRAMMAR_EXERCISES.ex5.forEach((q) => {
      if ((ex5Answers[q.id] || '').trim().toLowerCase() === q.expected.toLowerCase()) score++;
    });
    // Ex 7
    GRAMMAR_EXERCISES.ex7.forEach((q) => {
      const words = ex7WordPiles[q.id] || [];
      const userStr = words.join(' ').replace(/\s+([?.!])/g, '$1').toLowerCase();
      const expStr = q.correctOrder.replace(/\s+([?.!])/g, '$1').toLowerCase();
      if (userStr === expStr) score++;
    });
    // Ex 8
    GRAMMAR_EXERCISES.ex8.forEach((q) => {
      if ((ex8Answers[q.id] || '').trim().toLowerCase() === q.expected.toLowerCase()) score++;
    });
    return score;
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Exercise Navigation Tabs */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block">
            Partie 4 – Atelier d'exercices
          </span>
          <h2 className="text-xl font-bold text-slate-900">
            Grammaire : Être, Avoir et les verbes en -er
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowGlobalAnswers(!showGlobalAnswers)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              showGlobalAnswers
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {showGlobalAnswers ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showGlobalAnswers ? 'Masquer le corrigé officiel' : 'Consulter le corrigé (Page 8)'}
          </button>

          <button
            onClick={handleResetCurrent}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all text-xs flex items-center gap-1"
            title="Réinitialiser cet exercice"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Effacer</span>
          </button>
        </div>
      </div>

      {/* Exercise Pill Selector */}
      <div className="flex flex-wrap gap-2">
        {[
          { num: 1, title: 'Ex. 1 : QCM (10)', color: 'blue' },
          { num: 2, title: 'Ex. 2 : Verbe ÊTRE (8)', color: 'indigo' },
          { num: 3, title: 'Ex. 3 : Verbe AVOIR (8)', color: 'purple' },
          { num: 4, title: 'Ex. 4 : Verbes en -er (10)', color: 'emerald' },
          { num: 5, title: 'Ex. 5 : Être ou Avoir (8)', color: 'amber' },
          { num: 6, title: 'Ex. 6 : Corrige l\'erreur (8)', color: 'rose' },
          { num: 7, title: 'Ex. 7 : Mots en ordre (5)', color: 'cyan' },
          { num: 8, title: 'Ex. 8 : Texte de Léa (10)', color: 'teal' }
        ].map((tab) => (
          <button
            key={tab.num}
            onClick={() => setActiveExercise(tab.num)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
              activeExercise === tab.num
                ? 'bg-indigo-600 text-white ring-2 ring-indigo-300'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Global Answer Sheet Alert if toggled */}
      {showGlobalAnswers && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 space-y-4 animate-fadeIn">
          <div className="flex items-center gap-2 text-amber-900 font-bold">
            <BookOpen className="w-5 h-5 text-amber-600" />
            Corrigé officiel de l'atelier (Page 8 du PDF)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-amber-950 font-mono">
            <div className="p-3 bg-white/80 rounded-xl border border-amber-200">
              <strong className="block text-amber-900 font-sans mb-1 font-bold">Ex. 1 (QCM)</strong>
              1-B ; 2-A ; 3-B ; 4-A ; 5-B ; 6-B ; 7-C ; 8-A ; 9-A ; 10-B
            </div>
            <div className="p-3 bg-white/80 rounded-xl border border-amber-200">
              <strong className="block text-amber-900 font-sans mb-1 font-bold">Ex. 2 (Être)</strong>
              1. suis ; 2. es ; 3. est ; 4. sommes ; 5. êtes ; 6. sont ; 7. sont ; 8. est
            </div>
            <div className="p-3 bg-white/80 rounded-xl border border-amber-200">
              <strong className="block text-amber-900 font-sans mb-1 font-bold">Ex. 3 (Avoir)</strong>
              1. ai ; 2. as ; 3. a ; 4. avons ; 5. avez ; 6. ont ; 7. a ; 8. ont
            </div>
            <div className="p-3 bg-white/80 rounded-xl border border-amber-200">
              <strong className="block text-amber-900 font-sans mb-1 font-bold">Ex. 4 (-er)</strong>
              1. parle ; 2. chantes ; 3. habite ; 4. aimons ; 5. regardez ; 6. étudient ; 7. adore ; 8. joue ; 9. écoutent ; 10. travailles
            </div>
            <div className="p-3 bg-white/80 rounded-xl border border-amber-200">
              <strong className="block text-amber-900 font-sans mb-1 font-bold">Ex. 5 (Être/Avoir)</strong>
              1. a ; 2. sommes ; 3. ont ; 4. êtes ; 5. as ; 6. suis ; 7. a ; 8. sont
            </div>
            <div className="p-3 bg-white/80 rounded-xl border border-amber-200">
              <strong className="block text-amber-900 font-sans mb-1 font-bold">Ex. 6 (Erreurs)</strong>
              1. parlons ; 2. es ; 3. ont ; 4. chante ; 5. avez ; 6. sont ; 7. J'ai 13 ans ; 8. parles
            </div>
            <div className="p-3 bg-white/80 rounded-xl border border-amber-200">
              <strong className="block text-amber-900 font-sans mb-1 font-bold">Ex. 7 (Ordre)</strong>
              1. Elle a des super-pouvoirs. 2. Nous habitons à Medellín. 3. Les héros sont courageux. 4. Il porte un costume bleu. 5. Tu aimes le football ?
            </div>
            <div className="p-3 bg-white/80 rounded-xl border border-amber-200">
              <strong className="block text-amber-900 font-sans mb-1 font-bold">Ex. 8 (Léa)</strong>
              1. suis ; 2. ai ; 3. suis ; 4. habitons ; 5. a ; 6. adore ; 7. sont ; 8. travaillent ; 9. as ; 10. êtes
            </div>
          </div>
        </div>
      )}

      {/* EXERCISE 1: QCM */}
      {activeExercise === 1 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-lg font-bold text-slate-900">
              Exercice 1 – Choisis la bonne réponse (A, B ou C) et entoure-la.
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Clique sur l'option correcte pour chaque phrase. Écoute la phrase avec le bouton audio pour entraîner ton oreille !
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {GRAMMAR_EXERCISES.ex1.map((item) => {
              const selected = ex1Answers[item.id];
              const isCorrect = selected === item.correct;
              const hasAnswered = !!selected;

              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-xl border transition-all ${
                    hasAnswered
                      ? isCorrect
                        ? 'border-emerald-300 bg-emerald-50/40'
                        : 'border-rose-300 bg-rose-50/40'
                      : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="font-semibold text-sm text-slate-900">
                      {item.id}. {item.question}
                    </span>
                    <AudioButton text={item.question.replace('___', item.options.find(o => o.label === item.correct)?.text || '')} size="sm" />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {item.options.map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => {
                          setEx1Answers({ ...ex1Answers, [item.id]: opt.label });
                          if (opt.label === item.correct) celebrate();
                        }}
                        className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                          selected === opt.label
                            ? opt.label === item.correct
                              ? 'bg-emerald-600 text-white ring-2 ring-emerald-300 shadow-sm'
                              : 'bg-rose-600 text-white ring-2 ring-rose-300 shadow-sm'
                            : 'bg-white text-slate-700 border border-slate-200 hover:border-indigo-300'
                        }`}
                      >
                        <span className="opacity-75 font-mono">{opt.label}.</span>
                        <span>{opt.text}</span>
                      </button>
                    ))}
                  </div>

                  {hasAnswered && (
                    <div className="mt-3 pt-2 border-t border-slate-200/60 text-xs flex items-center justify-between">
                      <span className={isCorrect ? 'text-emerald-700 font-medium' : 'text-rose-700'}>
                        {isCorrect ? '✓ Bravo, bonne réponse !' : `✗ Oups ! La bonne réponse était ${item.correct}.`}
                      </span>
                      <span className="text-slate-500 text-[11px]">{item.explanation}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* EXERCISE 2: ÊTRE */}
      {activeExercise === 2 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-lg font-bold text-slate-900">
              Exercice 2 – Complète avec le verbe ÊTRE au présent.
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Rappel : <span className="font-mono text-indigo-700 font-semibold">suis, es, est, sommes, êtes, sont</span>. Tape la forme exacte.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {GRAMMAR_EXERCISES.ex2.map((item) => {
              const val = ex2Answers[item.id] || '';
              const isCorrect = val.trim().toLowerCase() === item.expected.toLowerCase();
              const hasInput = val.trim().length > 0;

              return (
                <div key={item.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-sm flex-1">
                    <span className="font-bold text-slate-700">{item.id}. {item.prefix}</span>
                    <input
                      type="text"
                      value={val}
                      onChange={(e) => setEx2Answers({ ...ex2Answers, [item.id]: e.target.value })}
                      placeholder="..."
                      className={`w-24 px-2.5 py-1 text-sm font-semibold rounded-lg border text-center transition-all ${
                        hasInput
                          ? isCorrect
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                            : 'bg-rose-50 border-rose-400 text-rose-900'
                          : 'bg-white border-slate-300 focus:border-indigo-500'
                      }`}
                    />
                    <span className="text-slate-700">{item.suffix}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {hasInput && (
                      isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <span className="text-[11px] font-bold text-rose-600 font-mono">({item.expected})</span>
                      )
                    )}
                    <AudioButton text={`${item.prefix} ${item.expected} ${item.suffix}`} size="sm" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* EXERCISE 3: AVOIR */}
      {activeExercise === 3 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-lg font-bold text-slate-900">
              Exercice 3 – Complète avec le verbe AVOIR au présent.
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Rappel : <span className="font-mono text-purple-700 font-semibold">ai, as, a, avons, avez, ont</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {GRAMMAR_EXERCISES.ex3.map((item) => {
              const val = ex3Answers[item.id] || '';
              const isCorrect = val.trim().toLowerCase() === item.expected.toLowerCase();
              const hasInput = val.trim().length > 0;

              return (
                <div key={item.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-sm flex-1">
                    <span className="font-bold text-slate-700">{item.id}. {item.prefix}</span>
                    <input
                      type="text"
                      value={val}
                      onChange={(e) => setEx3Answers({ ...ex3Answers, [item.id]: e.target.value })}
                      placeholder="..."
                      className={`w-24 px-2.5 py-1 text-sm font-semibold rounded-lg border text-center transition-all ${
                        hasInput
                          ? isCorrect
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                            : 'bg-rose-50 border-rose-400 text-rose-900'
                          : 'bg-white border-slate-300 focus:border-indigo-500'
                      }`}
                    />
                    <span className="text-slate-700">{item.suffix}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {hasInput && (
                      isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <span className="text-[11px] font-bold text-rose-600 font-mono">({item.expected})</span>
                      )
                    )}
                    <AudioButton text={`${item.prefix}${item.prefix.endsWith("'") ? '' : ' '}${item.expected} ${item.suffix}`} size="sm" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* EXERCISE 4: VERBES EN -ER */}
      {activeExercise === 4 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-lg font-bold text-slate-900">
              Exercice 4 – Conjugue le verbe entre parenthèses au présent.
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Rappel des terminaisons du 1er groupe : <span className="font-mono text-emerald-700 font-semibold">-e, -es, -e, -ons, -ez, -ent</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {GRAMMAR_EXERCISES.ex4.map((item) => {
              const val = ex4Answers[item.id] || '';
              const isCorrect = val.trim().toLowerCase() === item.expected.toLowerCase();
              const hasInput = val.trim().length > 0;

              return (
                <div key={item.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-sm flex-1">
                    <span className="font-bold text-slate-700">{item.id}. {item.prefix}</span>
                    <input
                      type="text"
                      value={val}
                      onChange={(e) => setEx4Answers({ ...ex4Answers, [item.id]: e.target.value })}
                      placeholder="..."
                      className={`w-28 px-2.5 py-1 text-sm font-semibold rounded-lg border text-center transition-all ${
                        hasInput
                          ? isCorrect
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                            : 'bg-rose-50 border-rose-400 text-rose-900'
                          : 'bg-white border-slate-300 focus:border-indigo-500'
                      }`}
                    />
                    <span className="text-slate-700">{item.suffix}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {hasInput && (
                      isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <span className="text-[11px] font-bold text-rose-600 font-mono">({item.expected})</span>
                      )
                    )}
                    <AudioButton text={`${item.prefix.replace(/\(.*?\)/g, '')} ${item.expected} ${item.suffix}`} size="sm" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* EXERCISE 5: ÊTRE OU AVOIR */}
      {activeExercise === 5 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-lg font-bold text-slate-900">
              Exercice 5 – Être ou Avoir ? Complète avec la forme correcte.
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Pense au sens : identité / nationalité / lieu = <strong className="text-indigo-600">ÊTRE</strong> | âge / possession = <strong className="text-purple-600">AVOIR</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {GRAMMAR_EXERCISES.ex5.map((item) => {
              const val = ex5Answers[item.id] || '';
              const isCorrect = val.trim().toLowerCase() === item.expected.toLowerCase();
              const hasInput = val.trim().length > 0;

              return (
                <div key={item.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-sm flex-1">
                    <span className="font-bold text-slate-700">{item.id}. {item.prefix}</span>
                    <input
                      type="text"
                      value={val}
                      onChange={(e) => setEx5Answers({ ...ex5Answers, [item.id]: e.target.value })}
                      placeholder="être ou avoir ?"
                      className={`w-28 px-2.5 py-1 text-sm font-semibold rounded-lg border text-center transition-all ${
                        hasInput
                          ? isCorrect
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                            : 'bg-rose-50 border-rose-400 text-rose-900'
                          : 'bg-white border-slate-300 focus:border-indigo-500'
                      }`}
                    />
                    <span className="text-slate-700">{item.suffix}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {hasInput && (
                      isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <span className="text-[11px] font-bold text-rose-600 font-mono">({item.expected})</span>
                      )
                    )}
                    <AudioButton text={`${item.prefix} ${item.expected} ${item.suffix}`} size="sm" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* EXERCISE 6: CORRIGE L'ERREUR */}
      {activeExercise === 6 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-lg font-bold text-slate-900">
              Exercice 6 – Détective d'erreurs : Corrige l'erreur dans chaque phrase.
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Repère la faute de conjugaison ou d'accord et réécris la phrase correcte.
            </p>
          </div>

          <div className="space-y-4">
            {GRAMMAR_EXERCISES.ex6.map((item) => {
              const val = ex6Answers[item.id] || '';
              const cleanVal = val.trim().toLowerCase().replace(/[.!?]/g, '');
              const cleanExp = item.correct.toLowerCase().replace(/[.!?]/g, '');
              const isCorrect = cleanVal === cleanExp;
              const hasInput = val.trim().length > 0;

              return (
                <div key={item.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-rose-700">
                      {item.id}. Phrase avec erreur : « <span className="line-through">{item.incorrect}</span> »
                    </span>
                    <button
                      onClick={() => setEx6Answers({ ...ex6Answers, [item.id]: item.correct })}
                      className="text-xs text-indigo-600 hover:underline"
                    >
                      Voir correction
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <input
                      type="text"
                      value={val}
                      onChange={(e) => setEx6Answers({ ...ex6Answers, [item.id]: e.target.value })}
                      placeholder={`Écris la phrase correcte... Ex: ${item.correct.split(' ')[0]} ...`}
                      className={`flex-1 px-3 py-2 text-sm rounded-lg border font-medium ${
                        hasInput
                          ? isCorrect
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                            : 'bg-white border-amber-400 text-slate-900'
                          : 'bg-white border-slate-300'
                      }`}
                    />
                    <AudioButton text={item.correct} size="md" />
                  </div>

                  {hasInput && (
                    <div className="text-xs text-slate-600 pt-1">
                      {isCorrect ? (
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <Check className="w-4 h-4" /> Parfait ! {item.explanation}
                        </span>
                      ) : (
                        <span>💡 Indice : {item.explanation}</span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* EXERCISE 7: MOTS EN ORDRE (PUZZLE) */}
      {activeExercise === 7 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-lg font-bold text-slate-900">
              Exercice 7 – Remets les mots dans l'ordre pour faire une phrase.
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Clique sur les étiquettes dans le bon ordre pour reconstruire chaque phrase.
            </p>
          </div>

          <div className="space-y-6">
            {GRAMMAR_EXERCISES.ex7.map((item) => {
              const selected = ex7WordPiles[item.id] || [];
              const userSentence = selected.join(' ').replace(/\s+([?.!])/g, '$1');
              const isMatched = userSentence.toLowerCase() === item.correctOrder.toLowerCase();

              return (
                <div key={item.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase">
                      Phrase {item.id} • 🇪🇸 {item.translation_es}
                    </span>
                    <button
                      onClick={() => setEx7WordPiles({ ...ex7WordPiles, [item.id]: [] })}
                      className="text-xs text-slate-400 hover:text-slate-700"
                    >
                      Réinitialiser
                    </button>
                  </div>

                  {/* Word bank to click */}
                  <div className="flex flex-wrap gap-2">
                    {item.words.map((w, idx) => {
                      const isUsed = selected.includes(w);
                      return (
                        <button
                          key={`${w}-${idx}`}
                          onClick={() => handleWordClick(item.id, w, item.words)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            isUsed
                              ? 'bg-slate-200 text-slate-400 cursor-default scale-95'
                              : 'bg-white text-indigo-900 border border-indigo-200 shadow-xs hover:border-indigo-400 hover:scale-105 active:scale-95'
                          }`}
                        >
                          {w}
                        </button>
                      );
                    })}
                  </div>

                  {/* Built sentence slot */}
                  <div className={`p-3 rounded-xl border min-h-[46px] flex items-center justify-between gap-2 ${
                    isMatched ? 'bg-emerald-50 border-emerald-400' : 'bg-white border-slate-200'
                  }`}>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {selected.length === 0 ? (
                        <span className="text-xs text-slate-400 italic">Clique sur les mots ci-dessus...</span>
                      ) : (
                        selected.map((w, sIdx) => (
                          <span
                            key={sIdx}
                            onClick={() => handleWordClick(item.id, w, item.words)}
                            className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-900 text-xs font-semibold cursor-pointer hover:bg-rose-50 hover:text-rose-700"
                            title="Cliquer pour retirer ce mot"
                          >
                            {w}
                          </span>
                        ))
                      )}
                    </div>

                    {isMatched && (
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-emerald-700">✓ Bravo !</span>
                        <AudioButton text={item.correctOrder} size="sm" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* EXERCISE 8: TEXTE DE LÉA */}
      {activeExercise === 8 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-lg font-bold text-slate-900">
              Exercice 8 – Complète le texte avec le verbe entre parenthèses au présent.
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Texte de présentation de Léa (Medellín &amp; Bogotá). Conjugue chacun des 10 verbes.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-indigo-50/50 border border-indigo-100 text-slate-800 text-sm leading-loose">
            Je (1. être){' '}
            <input
              type="text"
              value={ex8Answers[1] || ''}
              onChange={(e) => setEx8Answers({ ...ex8Answers, 1: e.target.value })}
              className="w-20 px-2 py-0.5 mx-1 border rounded bg-white text-center font-bold text-indigo-900"
              placeholder="..."
            />
            Léa. J'(2. avoir){' '}
            <input
              type="text"
              value={ex8Answers[2] || ''}
              onChange={(e) => setEx8Answers({ ...ex8Answers, 2: e.target.value })}
              className="w-16 px-2 py-0.5 mx-1 border rounded bg-white text-center font-bold text-indigo-900"
              placeholder="..."
            />
            treize ans et je (3. être){' '}
            <input
              type="text"
              value={ex8Answers[3] || ''}
              onChange={(e) => setEx8Answers({ ...ex8Answers, 3: e.target.value })}
              className="w-20 px-2 py-0.5 mx-1 border rounded bg-white text-center font-bold text-indigo-900"
              placeholder="..."
            />
            colombienne. Mon frère et moi, nous (4. habiter){' '}
            <input
              type="text"
              value={ex8Answers[4] || ''}
              onChange={(e) => setEx8Answers({ ...ex8Answers, 4: e.target.value })}
              className="w-24 px-2 py-0.5 mx-1 border rounded bg-white text-center font-bold text-indigo-900"
              placeholder="..."
            />
            à Bogotá. Mon frère (5. avoir){' '}
            <input
              type="text"
              value={ex8Answers[5] || ''}
              onChange={(e) => setEx8Answers({ ...ex8Answers, 5: e.target.value })}
              className="w-16 px-2 py-0.5 mx-1 border rounded bg-white text-center font-bold text-indigo-900"
              placeholder="..."
            />
            un chien et il (6. adorer){' '}
            <input
              type="text"
              value={ex8Answers[6] || ''}
              onChange={(e) => setEx8Answers({ ...ex8Answers, 6: e.target.value })}
              className="w-20 px-2 py-0.5 mx-1 border rounded bg-white text-center font-bold text-indigo-900"
              placeholder="..."
            />
            ce chien. Mes parents (7. être){' '}
            <input
              type="text"
              value={ex8Answers[7] || ''}
              onChange={(e) => setEx8Answers({ ...ex8Answers, 7: e.target.value })}
              className="w-20 px-2 py-0.5 mx-1 border rounded bg-white text-center font-bold text-indigo-900"
              placeholder="..."
            />
            professeurs : ils (8. travailler){' '}
            <input
              type="text"
              value={ex8Answers[8] || ''}
              onChange={(e) => setEx8Answers({ ...ex8Answers, 8: e.target.value })}
              className="w-28 px-2 py-0.5 mx-1 border rounded bg-white text-center font-bold text-indigo-900"
              placeholder="..."
            />
            à l'université. Et toi, tu (9. avoir){' '}
            <input
              type="text"
              value={ex8Answers[9] || ''}
              onChange={(e) => setEx8Answers({ ...ex8Answers, 9: e.target.value })}
              className="w-16 px-2 py-0.5 mx-1 border rounded bg-white text-center font-bold text-indigo-900"
              placeholder="..."
            />
            une grande famille ? Vous (10. être){' '}
            <input
              type="text"
              value={ex8Answers[10] || ''}
              onChange={(e) => setEx8Answers({ ...ex8Answers, 10: e.target.value })}
              className="w-20 px-2 py-0.5 mx-1 border rounded bg-white text-center font-bold text-indigo-900"
              placeholder="..."
            />
            nombreux ?
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <button
              onClick={() => {
                const answers: Record<number, string> = {
                  1: 'suis', 2: 'ai', 3: 'suis', 4: 'habitons', 5: 'a',
                  6: 'adore', 7: 'sont', 8: 'travaillent', 9: 'as', 10: 'êtes'
                };
                setEx8Answers(answers);
                celebrate();
              }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all"
            >
              Vérifier avec les bonnes réponses
            </button>

            <AudioButton
              text="Je suis Léa. J'ai treize ans et je suis colombienne. Mon frère et moi, nous habitons à Bogotá. Mon frère a un chien et il adore ce chien. Mes parents sont professeurs : ils travaillent à l'université. Et toi, tu as une grande famille ? Vous êtes nombreux ?"
              label="Écouter le texte complet de Léa"
              size="md"
            />
          </div>
        </div>
      )}
    </div>
  );
};
