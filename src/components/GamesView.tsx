import React, { useState, useEffect } from 'react';
import { VOCABULARY_DATA, OTHER_ER_VERBS } from '../data/workshopData';
import { AudioButton } from './AudioButton';
import confetti from 'canvas-confetti';
import { Gamepad2, Timer, Zap, Trophy, Shield, RefreshCw, Star, Heart, CheckCircle } from 'lucide-react';

export const GamesView: React.FC = () => {
  const [activeGame, setActiveGame] = useState<'speed' | 'memory' | 'heroMaker'>('speed');

  // --- GAME 1: SPEED CONJUGAISON ---
  const [speedScore, setSpeedScore] = useState(0);
  const [speedStreak, setSpeedStreak] = useState(0);
  const [speedTimer, setSpeedTimer] = useState(30);
  const [speedIsRunning, setSpeedIsRunning] = useState(false);
  const [speedCurrentQuestion, setSpeedCurrentQuestion] = useState<{
    subject: string;
    verb: string;
    options: string[];
    correct: string;
  } | null>(null);

  const subjects = ['Je', 'Tu', 'Il', 'Elle', 'Nous', 'Vous', 'Ils', 'Elles'];
  const testVerbs = ['aimer', 'parler', 'habiter', 'regarder', 'écouter', 'jouer', 'travailler', 'être', 'avoir'];

  const generateSpeedQuestion = () => {
    const s = subjects[Math.floor(Math.random() * subjects.length)];
    const v = testVerbs[Math.floor(Math.random() * testVerbs.length)];

    let correct = '';
    let distractors: string[] = [];

    if (v === 'être') {
      if (s === 'Je') { correct = 'suis'; distractors = ['es', 'est']; }
      else if (s === 'Tu') { correct = 'es'; distractors = ['suis', 'est']; }
      else if (s === 'Il' || s === 'Elle') { correct = 'est'; distractors = ['es', 'sont']; }
      else if (s === 'Nous') { correct = 'sommes'; distractors = ['êtes', 'sont']; }
      else if (s === 'Vous') { correct = 'êtes'; distractors = ['sommes', 'sont']; }
      else { correct = 'sont'; distractors = ['sommes', 'êtes']; }
    } else if (v === 'avoir') {
      if (s === 'Je') { correct = "ai"; distractors = ['as', 'a']; }
      else if (s === 'Tu') { correct = 'as'; distractors = ['ai', 'a']; }
      else if (s === 'Il' || s === 'Elle') { correct = 'a'; distractors = ['as', 'ont']; }
      else if (s === 'Nous') { correct = 'avons'; distractors = ['avez', 'ont']; }
      else if (s === 'Vous') { correct = 'avez'; distractors = ['avons', 'ont']; }
      else { correct = 'ont'; distractors = ['avons', 'a']; }
    } else {
      // -er verb
      const stem = v.slice(0, -2);
      if (s === 'Je') { correct = stem + 'e'; distractors = [stem + 'es', stem + 'ons']; }
      else if (s === 'Tu') { correct = stem + 'es'; distractors = [stem + 'e', stem + 'ez']; }
      else if (s === 'Il' || s === 'Elle') { correct = stem + 'e'; distractors = [stem + 'es', stem + 'ent']; }
      else if (s === 'Nous') { correct = stem + 'ons'; distractors = [stem + 'ez', stem + 'ent']; }
      else if (s === 'Vous') { correct = stem + 'ez'; distractors = [stem + 'ons', stem + 'e']; }
      else { correct = stem + 'ent'; distractors = [stem + 'ons', stem + 'e']; }
    }

    const shuffled = [correct, ...distractors].sort(() => Math.random() - 0.5);
    setSpeedCurrentQuestion({
      subject: s,
      verb: v,
      options: shuffled,
      correct
    });
  };

  const startSpeedGame = () => {
    setSpeedScore(0);
    setSpeedStreak(0);
    setSpeedTimer(30);
    setSpeedIsRunning(true);
    generateSpeedQuestion();
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (speedIsRunning && speedTimer > 0) {
      interval = setInterval(() => {
        setSpeedTimer((prev) => prev - 1);
      }, 1000);
    } else if (speedTimer === 0 && speedIsRunning) {
      setSpeedIsRunning(false);
      try {
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
      } catch {}
    }
    return () => clearInterval(interval);
  }, [speedIsRunning, speedTimer]);

  const handleSpeedAnswer = (opt: string) => {
    if (!speedCurrentQuestion || !speedIsRunning) return;
    if (opt === speedCurrentQuestion.correct) {
      setSpeedScore((s) => s + 10 + speedStreak * 2);
      setSpeedStreak((st) => st + 1);
    } else {
      setSpeedStreak(0);
    }
    generateSpeedQuestion();
  };

  // --- GAME 2: MEMORY VOCABULARY ---
  const memoryWords = [
    { id: '1', fr: 'un héros', es: 'un héroe' },
    { id: '2', fr: 'un super-pouvoir', es: 'un superpoder' },
    { id: '3', fr: 'un costume', es: 'un traje' },
    { id: '4', fr: 'courageux', es: 'valiente' },
    { id: '5', fr: 'généreux', es: 'generoso' },
    { id: '6', fr: 'parce que', es: 'porque' }
  ];

  const [memoryCards, setMemoryCards] = useState<
    { uid: string; wordId: string; text: string; lang: 'fr' | 'es'; isFlipped: boolean; isMatched: boolean }[]
  >([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [memoryMoves, setMemoryMoves] = useState(0);

  const initMemory = () => {
    const deck: { uid: string; wordId: string; text: string; lang: 'fr' | 'es'; isFlipped: boolean; isMatched: boolean }[] = [];
    memoryWords.forEach((item) => {
      deck.push({ uid: `${item.id}-fr`, wordId: item.id, text: item.fr, lang: 'fr', isFlipped: false, isMatched: false });
      deck.push({ uid: `${item.id}-es`, wordId: item.id, text: item.es, lang: 'es', isFlipped: false, isMatched: false });
    });
    setMemoryCards(deck.sort(() => Math.random() - 0.5));
    setSelectedCards([]);
    setMemoryMoves(0);
  };

  useEffect(() => {
    initMemory();
  }, []);

  const handleFlipCard = (index: number) => {
    if (selectedCards.length === 2) return;
    if (memoryCards[index].isFlipped || memoryCards[index].isMatched) return;

    const newCards = [...memoryCards];
    newCards[index].isFlipped = true;
    setMemoryCards(newCards);

    const newSelected = [...selectedCards, index];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      setMemoryMoves((m) => m + 1);
      const [idx1, idx2] = newSelected;
      if (newCards[idx1].wordId === newCards[idx2].wordId) {
        newCards[idx1].isMatched = true;
        newCards[idx2].isMatched = true;
        setSelectedCards([]);
        // Check win
        if (newCards.every((c) => c.isMatched)) {
          try {
            confetti({ particleCount: 70, spread: 80 });
          } catch {}
        }
      } else {
        setTimeout(() => {
          newCards[idx1].isFlipped = false;
          newCards[idx2].isFlipped = false;
          setMemoryCards([...newCards]);
          setSelectedCards([]);
        }, 1000);
      }
    }
  };

  // --- GAME 3: HERO MAKER ---
  const [heroName, setHeroName] = useState('Éclair Bleu');
  const [heroCity, setHeroCity] = useState('Medellín');
  const [heroPower, setHeroPower] = useState('voler et contrôler le temps');
  const [heroCostume, setHeroCostume] = useState('bleu et doré avec un masque');
  const [heroQuality, setHeroQuality] = useState('courageux et généreux');
  const [heroDefect, setHeroDefect] = useState('un peu impatient');
  const [heroHabit, setHeroHabit] = useState('aider les habitants et protéger les animaux');

  const generatedHeroBio = `Bonjour ! Je suis un super-héros et je m'appelle ${heroName}. J'habite à ${heroCity}. Mon costume est ${heroCostume}. J'ai un super-pouvoir incroyable : je peux ${heroPower}. Dans la vie, je suis très ${heroQuality}, mais je suis aussi ${heroDefect}. Chaque jour, je travaille dur pour ${heroHabit}. J'adore mon quartier et je protège les autres avec courage !`;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-pink-600 to-rose-600 text-white rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold uppercase tracking-wider mb-3">
            <Gamepad2 className="w-3.5 h-3.5" />
            Espace Jeux &amp; Défis FLE
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">
            Apprendre en s'amusant !
          </h2>
          <p className="text-purple-100 text-sm mt-2">
            Entraîne tes réflexes de conjugaison en vitesse chrono, teste ta mémoire sur le vocabulaire espagnol/français, ou invente ton propre héros légendaire.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveGame('speed')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-xs ${
            activeGame === 'speed'
              ? 'bg-purple-600 text-white ring-2 ring-purple-300'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Zap className="w-4 h-4 text-amber-400" />
          Duel Chrono (Speed Conjugaison)
        </button>

        <button
          onClick={() => setActiveGame('memory')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-xs ${
            activeGame === 'memory'
              ? 'bg-purple-600 text-white ring-2 ring-purple-300'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Trophy className="w-4 h-4 text-emerald-500" />
          Memory des Super-Héros
        </button>

        <button
          onClick={() => setActiveGame('heroMaker')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-xs ${
            activeGame === 'heroMaker'
              ? 'bg-purple-600 text-white ring-2 ring-purple-300'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Shield className="w-4 h-4 text-blue-500" />
          Générateur de Super-Héros
        </button>
      </div>

      {/* GAME 1: SPEED CONJUGAISON */}
      {activeGame === 'speed' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm max-w-2xl mx-auto text-center space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 text-slate-700 font-bold text-sm">
              <Timer className="w-4 h-4 text-rose-500" />
              Temps restant :{' '}
              <span className={`text-base font-black ${speedTimer <= 5 ? 'text-rose-600 animate-ping' : 'text-slate-900'}`}>
                {speedTimer}s
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                Score : {speedScore} pts
              </div>
              {speedStreak > 1 && (
                <span className="text-xs font-black text-purple-600 bg-purple-50 px-2 py-1 rounded-lg animate-bounce">
                  🔥 x{speedStreak} Combo !
                </span>
              )}
            </div>
          </div>

          {!speedIsRunning ? (
            <div className="py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-600 mx-auto flex items-center justify-center">
                <Zap className="w-8 h-8 fill-purple-600" />
              </div>
              <h3 className="text-xl font-black text-slate-900">
                {speedTimer === 0 ? `Partie terminée ! Score final : ${speedScore} pts 🏆` : 'Prêt pour le défi chrono ?'}
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Tu as 30 secondes pour associer le sujet avec la bonne conjugaison. Plus ta série de bonnes réponses est longue, plus tu gagnes de points !
              </p>
              <button
                onClick={startSpeedGame}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-95"
              >
                {speedTimer === 0 ? 'Rejouer une partie' : 'Démarrer le chrono (30s)'}
              </button>
            </div>
          ) : (
            <div className="py-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Verbe à conjuguer : {speedCurrentQuestion?.verb}
                </span>
                <div className="text-3xl font-black text-slate-900">
                  {speedCurrentQuestion?.subject} +{' '}
                  <span className="text-purple-600 underline decoration-purple-300">
                    ... ?
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {speedCurrentQuestion?.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSpeedAnswer(opt)}
                    className="py-4 px-4 rounded-xl text-base font-bold bg-slate-50 hover:bg-purple-50 hover:text-purple-900 hover:border-purple-300 border border-slate-200 transition-all active:scale-95 text-slate-800"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* GAME 2: MEMORY */}
      {activeGame === 'memory' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Memory : Associe le mot en français avec son équivalent
              </h3>
              <p className="text-xs text-slate-500">
                Retrouve les 6 paires de vocabulaire des super-héros.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-slate-500">
                Coups joués : <strong>{memoryMoves}</strong>
              </span>
              <button
                onClick={initMemory}
                className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Recommencer
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {memoryCards.map((card, idx) => (
              <button
                key={card.uid}
                onClick={() => handleFlipCard(idx)}
                className={`h-24 rounded-xl border p-2 flex flex-col items-center justify-center text-center font-bold text-sm transition-all duration-300 transform ${
                  card.isMatched
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800 opacity-80 cursor-default scale-95'
                    : card.isFlipped
                    ? 'bg-indigo-600 border-indigo-700 text-white shadow-md'
                    : 'bg-slate-100 border-slate-200 text-slate-400 hover:bg-slate-200 hover:border-slate-300'
                }`}
              >
                {card.isFlipped || card.isMatched ? (
                  <>
                    <span className="text-[10px] uppercase tracking-wider opacity-75 font-normal">
                      {card.lang === 'fr' ? '🇫🇷 Français' : '🇪🇸 Espagnol'}
                    </span>
                    <span className="text-sm mt-1">{card.text}</span>
                  </>
                ) : (
                  <span className="text-xl opacity-40">❓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* GAME 3: SUPER-HÉROS MAKER */}
      {activeGame === 'heroMaker' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-lg font-bold text-slate-900">
              Générateur interactif de Super-Héros (Idéal pour la Production Écrite !)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Personnalise ton super-héros. Le site génère automatiquement un paragraphe rédigé au présent de l'indicatif avec le bon vocabulaire.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Nom du Héros :</label>
              <input
                type="text"
                value={heroName}
                onChange={(e) => setHeroName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Ville d'origine :</label>
              <input
                type="text"
                value={heroCity}
                onChange={(e) => setHeroCity(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Super-pouvoir :</label>
              <input
                type="text"
                value={heroPower}
                onChange={(e) => setHeroPower(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Costume &amp; masque :</label>
              <input
                type="text"
                value={heroCostume}
                onChange={(e) => setHeroCostume(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Qualités (adjectifs) :</label>
              <input
                type="text"
                value={heroQuality}
                onChange={(e) => setHeroQuality(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Défauts :</label>
              <input
                type="text"
                value={heroDefect}
                onChange={(e) => setHeroDefect(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300"
              />
            </div>
          </div>

          {/* Result card */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-2xl border border-indigo-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-800 uppercase tracking-wider flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-indigo-600" />
                Carte d'identité du héros généré
              </span>
              <AudioButton text={generatedHeroBio} label="Écouter la présentation" size="md" />
            </div>

            <p className="text-sm text-slate-800 leading-relaxed font-medium bg-white p-4 rounded-xl border border-indigo-100">
              « {generatedHeroBio} »
            </p>

            <div className="flex items-center justify-between text-xs text-indigo-700">
              <span>💡 Ce texte utilise le présent de l'indicatif (être, avoir, verbes en -er).</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedHeroBio);
                  alert('Texte copié ! Tu peux le coller dans l\'onglet Production Écrite.');
                }}
                className="text-xs font-bold text-indigo-600 hover:underline"
              >
                Copier ce modèle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
