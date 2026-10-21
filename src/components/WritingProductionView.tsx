import React, { useState, useMemo } from 'react';
import { WRITING_MODEL } from '../data/workshopData';
import { AudioButton } from './AudioButton';
import {
  PenTool,
  CheckSquare,
  Sparkles,
  BookOpen,
  Copy,
  Printer,
  Volume2,
  AlertTriangle,
  Lightbulb,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const WritingProductionView: React.FC = () => {
  const [studentText, setStudentText] = useState('');
  const [copied, setCopied] = useState(false);
  const [showModelAnalysis, setShowModelAnalysis] = useState(true);

  // Manual checkboxes state
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    firstPerson: false,
    etreAvoir: false,
    erVerbs: false,
    connectors: false,
    allDetails: false,
    wordCountTarget: false
  });

  // Calculate live statistics
  const wordCount = useMemo(() => {
    const trimmed = studentText.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).filter(Boolean).length;
  }, [studentText]);

  // Live detector for French beginner grammar features
  const stats = useMemo(() => {
    const lower = studentText.toLowerCase();

    // 1st person
    const hasFirstPerson = /\b(je|j'|moi|mon|ma|mes)\b/i.test(lower);

    // être / avoir
    const hasEtre = /\b(suis|sommes|es|est|êtes|sont)\b/i.test(lower);
    const hasAvoir = /\b(ai|as|a|avons|avez|ont)\b/i.test(lower);

    // Connectors
    const connectorsFound = ['et', 'mais', 'aussi', 'parce que', "d'abord", 'ensuite', 'puis', 'enfin', 'au contraire'].filter(
      (c) => lower.includes(c)
    );

    // Common -er verbs
    const erVerbsFound = [
      'habite', 'travaille', 'joue', 'étudie', 'écoute', 'regarde',
      'aime', 'adore', 'déteste', 'chante', 'aide', 'porte', 'arrive', 'reste'
    ].filter((v) => lower.includes(v));

    return {
      hasFirstPerson,
      hasEtre,
      hasAvoir,
      connectorsFound,
      erVerbsFound
    };
  }, [studentText]);

  // Auto-sync checklist
  const is100Words = wordCount >= 100;

  const handleCopy = () => {
    navigator.clipboard.writeText(studentText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const insertIdea = (phrase: string) => {
    setStudentText((prev) => (prev ? `${prev} ${phrase}` : phrase));
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-800 text-white rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold uppercase tracking-wider mb-3">
              <PenTool className="w-3.5 h-3.5" />
              Partie 3 – Production Écrite (Note sur 8 points)
            </div>
            <h2 className="text-2xl sm:text-3xl font-black">
              Je présente mon Super-Personnage
            </h2>
            <p className="text-emerald-100 text-sm mt-2 max-w-2xl">
              Consigne : Imagine un personnage célèbre (artiste, sportif ou scientifique). Il/Elle se présente à la 1re personne (« je ») et utilise le présent de l'indicatif.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center border border-white/20 min-w-[140px]">
            <span className="text-xs uppercase font-bold text-emerald-200">Compteur de mots</span>
            <div className="text-3xl font-black mt-1">
              {wordCount} <span className="text-sm font-normal text-emerald-200">/ 100 min</span>
            </div>
            <div className="w-full bg-black/20 h-2 rounded-full mt-2 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  wordCount >= 100 ? 'bg-emerald-400' : 'bg-amber-400'
                }`}
                style={{ width: `${Math.min(100, (wordCount / 100) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Model text Lucas Ferreira */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 block">
              Modèle d'inspiration (Page 5 de l'Atelier)
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              {WRITING_MODEL.title}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <AudioButton text={WRITING_MODEL.text} label="Écouter le modèle complet" size="md" />
            <button
              onClick={() => setShowModelAnalysis(!showModelAnalysis)}
              className="text-xs font-semibold text-teal-700 bg-teal-50 px-3 py-2 rounded-xl hover:bg-teal-100"
            >
              {showModelAnalysis ? 'Masquer la structure' : 'Voir la structure guidée'}
            </button>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm leading-relaxed italic">
          « {WRITING_MODEL.text} »
        </div>

        {showModelAnalysis && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
            {WRITING_MODEL.breakdown.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200 text-xs shadow-xs">
                <span className="font-bold text-teal-800 block mb-1">✓ {item.label}</span>
                <span className="text-slate-600">{item.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Writing Editor & Live Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Editor */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <PenTool className="w-4 h-4 text-teal-600" />
              Ton texte de rédaction (100 mots minimum) :
            </h3>
            <div className="flex items-center gap-2">
              {studentText && <AudioButton text={studentText} label="Écouter mon texte" size="sm" />}
              <button
                onClick={handleCopy}
                disabled={!studentText}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1 disabled:opacity-50"
              >
                <Copy className="w-3.5 h-3.5" />
                {copied ? 'Copié !' : 'Copier'}
              </button>
            </div>
          </div>

          <textarea
            value={studentText}
            onChange={(e) => setStudentText(e.target.value)}
            placeholder="Bonjour ! Je m'appelle... Je suis... et j'ai 13 ans. J'habite à... Je suis grand et... Chaque jour, je... J'adore... mais je déteste... Je suis très courageux..."
            rows={12}
            className="w-full p-4 text-sm sm:text-base rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 leading-relaxed font-sans"
          />

          {/* Quick Idea Generator Pills */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              Besoin d'aide ? Clique pour insérer une phrase type :
            </span>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {[
                "Bonjour ! Je m'appelle et je suis...",
                "J'ai 13 ans et je suis colombien(ne).",
                "J'habite à Medellín avec ma famille.",
                "Je suis grand(e), fort(e) et courageux(se).",
                "Chaque matin, je travaille avec mon équipe.",
                "J'adore la musique et le sport, mais je déteste les devoirs !",
                "Je suis très généreux(se) et j'aide les autres.",
                "Enfin, j'ai un super-pouvoir incroyable !"
              ].map((phrase, i) => (
                <button
                  key={i}
                  onClick={() => insertIdea(phrase)}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-teal-50 hover:text-teal-900 rounded-lg text-[11px] text-slate-600 border border-slate-200 transition-colors"
                >
                  + {phrase}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Criteria & Checklist */}
        <div className="space-y-6">
          {/* Real-time Detections */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-600" />
              Vérificateur en direct
            </h4>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                <span className="text-slate-600">1re personne (je / j') :</span>
                <span className={`font-bold ${stats.hasFirstPerson ? 'text-emerald-600' : 'text-slate-400'}`}>
                  {stats.hasFirstPerson ? '✓ Détecté' : '✗ Manquant'}
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                <span className="text-slate-600">Verbes ÊTRE &amp; AVOIR :</span>
                <span className={`font-bold ${stats.hasEtre && stats.hasAvoir ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {stats.hasEtre ? 'Être ✓' : 'Être ✗'} | {stats.hasAvoir ? 'Avoir ✓' : 'Avoir ✗'}
                </span>
              </div>

              <div className="p-2 rounded-lg bg-slate-50 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Connecteurs logiques :</span>
                  <span className="font-bold text-indigo-600">{stats.connectorsFound.length} trouvés</span>
                </div>
                {stats.connectorsFound.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {stats.connectorsFound.map((c) => (
                      <span key={c} className="px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800 text-[10px] font-bold">
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-2 rounded-lg bg-slate-50 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Verbes en -er :</span>
                  <span className="font-bold text-teal-600">{stats.erVerbsFound.length} identifiés</span>
                </div>
                {stats.erVerbsFound.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {stats.erVerbsFound.map((v) => (
                      <span key={v} className="px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 text-[10px] font-bold">
                        {v}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Official Checklist (Page 4) */}
          <div className="bg-teal-50/70 rounded-2xl border border-teal-200 p-5 space-y-3">
            <h4 className="text-xs font-bold text-teal-950 uppercase tracking-wider flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4 text-teal-700" />
              Liste de contrôle avant de rendre mon texte (Page 4)
            </h4>

            <div className="space-y-2 text-xs text-teal-900">
              {[
                { key: 'firstPerson', label: "J'écris à la 1re personne (je / j').", auto: stats.hasFirstPerson },
                { key: 'etreAvoir', label: "J'utilise être et avoir correctement.", auto: stats.hasEtre && stats.hasAvoir },
                { key: 'erVerbs', label: "Mes verbes en -er ont la bonne terminaison.", auto: stats.erVerbsFound.length >= 2 },
                { key: 'connectors', label: "J'utilise et, mais, aussi, parce que.", auto: stats.connectorsFound.length >= 2 },
                { key: 'allDetails', label: "J'ai donné nom, âge, nationalité, apparence, habitudes, qualités et défauts.", auto: false },
                { key: 'wordCountTarget', label: "J'ai écrit 100 mots ou plus.", auto: is100Words }
              ].map((item) => (
                <label
                  key={item.key}
                  className="flex items-start gap-2 p-1.5 rounded-lg hover:bg-teal-100/60 cursor-pointer select-none transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={checkedItems[item.key] || item.auto}
                    onChange={(e) => setCheckedItems({ ...checkedItems, [item.key]: e.target.checked })}
                    className="mt-0.5 text-teal-600 rounded focus:ring-teal-500"
                  />
                  <span className={item.auto ? 'font-semibold text-teal-950' : 'text-teal-800'}>
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
