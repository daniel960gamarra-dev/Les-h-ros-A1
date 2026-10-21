import React, { useState } from 'react';
import { ORAL_RESOURCES } from '../data/oralData';
import { AudioButton } from './AudioButton';
import { speakFrench, stopSpeech } from '../utils/speech';
import confetti from 'canvas-confetti';
import {
  Headphones,
  Play,
  Pause,
  RotateCcw,
  ExternalLink,
  Eye,
  EyeOff,
  CheckCircle,
  Sparkles,
  BookOpen,
  Volume2,
  Gauge
} from 'lucide-react';

export const OralComprehensionView: React.FC = () => {
  const [activeResourceId, setActiveResourceId] = useState<'valerie' | 'victor_hugo'>('valerie');
  const [showTranscript, setShowTranscript] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(0.85);
  const [isPlayingFull, setIsPlayingFull] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, Record<number, number>>>({
    valerie: {},
    victor_hugo: {}
  });

  const currentResource = ORAL_RESOURCES.find((r) => r.id === activeResourceId)!;
  const currentAnswers = userAnswers[activeResourceId] || {};

  const handlePlayFull = () => {
    if (isPlayingFull) {
      stopSpeech();
      setIsPlayingFull(false);
      return;
    }

    setIsPlayingFull(true);
    const fullText = currentResource.transcript.join(' ');
    speakFrench(fullText, {
      rate: playbackSpeed,
      preferCanadian: activeResourceId === 'valerie',
      onStart: () => setIsPlayingFull(true),
      onEnd: () => setIsPlayingFull(false),
      onError: () => setIsPlayingFull(false)
    });
  };

  const handleSelectAnswer = (qId: number, optIndex: number) => {
    const next = {
      ...userAnswers,
      [activeResourceId]: {
        ...currentAnswers,
        [qId]: optIndex
      }
    };
    setUserAnswers(next);

    const question = currentResource.questions.find((q) => q.id === qId);
    if (question && optIndex === question.correctIndex) {
      try {
        confetti({ particleCount: 30, spread: 50 });
      } catch {}
    }
  };

  const getScore = () => {
    let score = 0;
    currentResource.questions.forEach((q) => {
      if (currentAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Banner */}
      <div className="bg-gradient-to-r from-violet-700 via-indigo-700 to-blue-800 text-white rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold uppercase tracking-wider mb-3">
              <Headphones className="w-3.5 h-3.5" />
              Compréhension Orale – FLE Débutants
            </div>
            <h2 className="text-2xl sm:text-3xl font-black">
              Laboratoire d'Écoute &amp; Prononciation
            </h2>
            <p className="text-violet-100 text-sm mt-2 max-w-2xl leading-relaxed">
              Entraîne ta compréhension auditive avec deux supports authentiques du FLE : <strong>Valérie du Québec</strong> (se présenter, âge, études) et le grand poète <strong>Victor Hugo</strong> (biographie et poème <em>Demain, dès l'aube</em>).
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center border border-white/20 min-w-[140px]">
            <span className="text-xs uppercase font-bold text-violet-200">Score d'écoute</span>
            <div className="text-3xl font-black mt-1">
              {getScore()} <span className="text-sm font-normal text-violet-200">/ {currentResource.questions.length}</span>
            </div>
            <span className="text-[11px] text-violet-200 block mt-1">Bonnes réponses</span>
          </div>
        </div>
      </div>

      {/* Resource selector tabs */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => {
            stopSpeech();
            setIsPlayingFull(false);
            setActiveResourceId('valerie');
          }}
          className={`flex-1 min-w-[240px] p-4 rounded-2xl border text-left transition-all shadow-xs ${
            activeResourceId === 'valerie'
              ? 'bg-white border-indigo-600 ring-2 ring-indigo-200'
              : 'bg-white/60 border-slate-200 hover:bg-white text-slate-600'
          }`}
        >
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-1">
            Support 1 • Le Point du FLE
          </span>
          <h4 className="font-bold text-slate-900 text-base">
            Valérie se présente (Québec / France)
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            Se présenter, l'âge, l'origine, les études et les goûts.
          </p>
        </button>

        <button
          onClick={() => {
            stopSpeech();
            setIsPlayingFull(false);
            setActiveResourceId('victor_hugo');
          }}
          className={`flex-1 min-w-[240px] p-4 rounded-2xl border text-left transition-all shadow-xs ${
            activeResourceId === 'victor_hugo'
              ? 'bg-white border-indigo-600 ring-2 ring-indigo-200'
              : 'bg-white/60 border-slate-200 hover:bg-white text-slate-600'
          }`}
        >
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-1">
            Support 2 • Podcast Français Facile
          </span>
          <h4 className="font-bold text-slate-900 text-base">
            Victor Hugo – Portrait &amp; « Demain, dès l'aube »
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            Biographie simplifiée FLE et poème célèbre déclamé à voix haute.
          </p>
        </button>
      </div>

      {/* Main Player Box */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">
                {currentResource.level}
              </span>
              <span className="text-xs text-slate-400">• Source :</span>
              <a
                href={currentResource.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-1"
              >
                {currentResource.sourceName} <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <h3 className="text-xl font-black text-slate-900 mt-1">
              {currentResource.title}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {currentResource.description}
            </p>
          </div>

          {/* Speed Selector */}
          <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-50 p-1.5 rounded-xl border border-slate-200 text-xs">
            <Gauge className="w-3.5 h-3.5 text-slate-500 ml-1" />
            <span className="text-slate-500 font-medium">Vitesse :</span>
            {[
              { val: 0.75, label: 'Lente (0.75x)' },
              { val: 0.85, label: 'Idéale (0.85x)' },
              { val: 1.0, label: 'Normale (1x)' }
            ].map((s) => (
              <button
                key={s.val}
                onClick={() => {
                  setPlaybackSpeed(s.val);
                  if (isPlayingFull) {
                    stopSpeech();
                    setIsPlayingFull(false);
                  }
                }}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  playbackSpeed === s.val
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Audio Playback Controls */}
        <div className="bg-gradient-to-br from-indigo-50/80 to-slate-50 p-6 rounded-2xl border border-indigo-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handlePlayFull}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-md transition-all active:scale-95 ${
                isPlayingFull ? 'bg-amber-500 animate-pulse' : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
              title={isPlayingFull ? 'Arrêter la lecture' : 'Écouter tout l\'audio'}
            >
              {isPlayingFull ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
            </button>

            <div>
              <span className="font-bold text-slate-900 text-sm block">
                {isPlayingFull ? 'Lecture audio en cours...' : 'Écouter la piste audio complète'}
              </span>
              <span className="text-xs text-slate-500">
                {isPlayingFull
                  ? 'Clique sur le bouton pour mettre en pause'
                  : 'Ferme les yeux et écoute attentivement avant de lire la transcription !'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                showTranscript
                  ? 'bg-white text-indigo-700 border border-indigo-200 shadow-xs'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs'
              }`}
            >
              {showTranscript ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showTranscript ? 'Masquer la transcription' : 'Afficher la transcription écrite'}
            </button>
          </div>
        </div>

        {/* Transcript Area (Sentence by sentence with audio button) */}
        {showTranscript ? (
          <div className="space-y-2 bg-slate-50 p-6 rounded-2xl border border-slate-200 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                Transcription intégrale (clique sur un haut-parleur pour écouter une phrase seule)
              </span>
            </div>
            <div className="space-y-2 text-sm text-slate-700">
              {currentResource.transcript.map((line, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-white rounded-xl border border-slate-200/60 hover:border-indigo-300 flex items-center justify-between gap-3 transition-colors"
                >
                  <p className="leading-relaxed">{line}</p>
                  <AudioButton
                    text={line}
                    rate={playbackSpeed}
                    preferCanadian={activeResourceId === 'valerie'}
                    size="sm"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-6 bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-center text-xs text-slate-500">
            🤫 <strong>Mode écoute active :</strong> La transcription écrite est masquée pour tester ta compréhension à l'oreille ! Écoute l'audio 1 à 2 fois, réponds aux questions ci-dessous, puis clique sur « Afficher la transcription » si tu veux vérifier.
          </div>
        )}

        {/* Vocabulary & Cultural Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
              Vocabulaire clé de l'enregistrement
            </h4>
            <div className="space-y-1.5 text-xs">
              {currentResource.vocabularyList.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-100">
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-800">{item.word}</strong>
                    <span className="text-slate-400">→</span>
                    <span className="text-slate-600 italic">🇪🇸 {item.meaning}</span>
                  </div>
                  <AudioButton text={item.word} size="sm" />
                </div>
              ))}
            </div>
          </div>

          {currentResource.culturalNotes && (
            <div className="bg-indigo-50/50 p-5 rounded-2xl border border-indigo-100 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                Repères culturels francophones
              </h4>
              <ul className="space-y-2 text-xs text-indigo-950">
                {currentResource.culturalNotes.map((note, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-white/70 p-2.5 rounded-xl border border-indigo-100">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Comprehension Quiz */}
        <div className="space-y-6 pt-4 border-t border-slate-100">
          <div>
            <h4 className="text-lg font-bold text-slate-900">
              Questions de compréhension orale ({currentResource.questions.length} questions)
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Choisis la bonne réponse d'après ce que tu as entendu.
            </p>
          </div>

          <div className="space-y-4">
            {currentResource.questions.map((q) => {
              const selectedIdx = currentAnswers[q.id];
              const isAnswered = selectedIdx !== undefined;
              const isCorrect = selectedIdx === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    isAnswered
                      ? isCorrect
                        ? 'border-emerald-300 bg-emerald-50/30'
                        : 'border-rose-300 bg-rose-50/30'
                      : 'border-slate-200 bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="font-bold text-sm text-slate-900">
                      {q.id}. {q.prompt}
                    </span>
                    <AudioButton text={q.prompt} size="sm" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {q.options.map((opt, oIdx) => {
                      const isOptionSelected = selectedIdx === oIdx;
                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleSelectAnswer(q.id, oIdx)}
                          className={`p-3 rounded-xl text-xs font-semibold text-left transition-all border ${
                            isOptionSelected
                              ? oIdx === q.correctIndex
                                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                                : 'bg-rose-600 text-white border-rose-600 shadow-sm'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {isAnswered && (
                    <div className="mt-3 pt-2 border-t border-slate-200/60 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className={isCorrect ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>
                        {isCorrect ? '✓ Exact !' : `✗ Erreur. La bonne réponse était l'option ${q.correctIndex + 1}.`}
                      </span>
                      <span className="text-slate-600 italic">{q.explanation}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
