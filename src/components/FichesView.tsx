import React, { useState } from 'react';
import { VERBS_DATA, OTHER_ER_VERBS, VOCABULARY_DATA } from '../data/workshopData';
import { AudioButton } from './AudioButton';
import { BookOpen, Sparkles, CheckCircle2, AlertCircle, Info, ChevronRight, Layers, Volume2 } from 'lucide-react';

export const FichesView: React.FC = () => {
  const [selectedVerbIndex, setSelectedVerbIndex] = useState(0);
  const [customVerb, setCustomVerb] = useState(OTHER_ER_VERBS[0]);
  const [activeVocabTab, setActiveVocabTab] = useState<'tous' | 'héros' | 'actions' | 'qualités' | 'défauts' | 'connecteurs'>('tous');
  const [selectedSubject, setSelectedSubject] = useState<'je' | 'tu' | 'il' | 'nous' | 'vous' | 'ils'>('je');

  // Conjugate custom -er verb
  const getCustomConjugation = (verbRoot: string, ending: string, subject: string) => {
    // Check if starts with vowel or h
    const startsVowel = /^[aeiouyhâêîôûéèëï]/i.test(customVerb.inf);
    if (subject === 'je') {
      return startsVowel ? `j'${verbRoot}${ending}` : `je ${verbRoot}${ending}`;
    }
    return `${subject} ${verbRoot}${ending}`;
  };

  const verbStem = customVerb.inf.slice(0, -2);

  const filteredVocab = VOCABULARY_DATA.filter((item) =>
    activeVocabTab === 'tous' ? true : item.category === activeVocabTab
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            Partie 1 – Fiches Récapitulatives Interactives
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Le Présent de l'Indicatif &amp; la Boîte à Mots
          </h2>
          <p className="text-blue-100 mt-2 text-sm sm:text-base leading-relaxed">
            Révise les bases essentielles pour l'examen de 7e : les trois piliers indispensables (<strong>ÊTRE</strong>, <strong>AVOIR</strong>, et les <strong>verbes en -er</strong>), les 3 règles d'or, ainsi que tout le vocabulaire des super-héros.
          </p>
        </div>
        <div className="absolute right-4 -bottom-6 text-white/10 hidden md:block">
          <Layers className="w-48 h-48" />
        </div>
      </div>

      {/* 3 Main Verbs Grid */}
      <div>
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-sm font-black">1</span>
          Les 3 Verbes Piliers de l'Atelier
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VERBS_DATA.map((verb, idx) => (
            <div
              key={verb.infinitive}
              className={`rounded-2xl border transition-all duration-200 bg-white shadow-sm hover:shadow-md overflow-hidden ${
                selectedVerbIndex === idx ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-slate-200'
              }`}
            >
              <div className="bg-gradient-to-br from-slate-50 to-indigo-50/50 p-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-black text-indigo-900 tracking-wide">{verb.infinitive}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-medium">
                      {verb.translation_es}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{verb.meaning}</p>
                </div>
                <AudioButton text={`${verb.infinitive}. ${verb.sampleSentence}`} size="md" />
              </div>

              <div className="p-4 space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between">
                    <span className="text-slate-500 font-medium">je / j'</span>
                    <div className="flex items-center gap-1">
                      <strong className="text-slate-900 font-semibold">{verb.conjugation.je}</strong>
                      <AudioButton text={verb.conjugation.je} size="sm" />
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between">
                    <span className="text-slate-500 font-medium">nous</span>
                    <div className="flex items-center gap-1">
                      <strong className="text-slate-900 font-semibold">{verb.conjugation.nous}</strong>
                      <AudioButton text={`nous ${verb.conjugation.nous}`} size="sm" />
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between">
                    <span className="text-slate-500 font-medium">tu</span>
                    <div className="flex items-center gap-1">
                      <strong className="text-slate-900 font-semibold">{verb.conjugation.tu}</strong>
                      <AudioButton text={`tu ${verb.conjugation.tu}`} size="sm" />
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between">
                    <span className="text-slate-500 font-medium">vous</span>
                    <div className="flex items-center gap-1">
                      <strong className="text-slate-900 font-semibold">{verb.conjugation.vous}</strong>
                      <AudioButton text={`vous ${verb.conjugation.vous}`} size="sm" />
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between">
                    <span className="text-slate-500 font-medium">il / elle</span>
                    <div className="flex items-center gap-1">
                      <strong className="text-slate-900 font-semibold">{verb.conjugation.il_elle}</strong>
                      <AudioButton text={`il ${verb.conjugation.il_elle}`} size="sm" />
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between">
                    <span className="text-slate-500 font-medium">ils / elles</span>
                    <div className="flex items-center gap-1">
                      <strong className="text-slate-900 font-semibold">{verb.conjugation.ils_elles}</strong>
                      <AudioButton text={`ils ${verb.conjugation.ils_elles}`} size="sm" />
                    </div>
                  </div>
                </div>

                <div className="mt-3 p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 text-xs text-indigo-900">
                  <span className="font-semibold block mb-0.5">Exemple de l'atelier :</span>
                  <span>« {verb.sampleSentence} »</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Les 3 Règles d'Attention de l'Atelier */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6">
        <h4 className="text-base font-bold text-amber-950 flex items-center gap-2 mb-3">
          <AlertCircle className="w-5 h-5 text-amber-600" />
          Attention ! Les 3 règles d'or de l'atelier (Page 1)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-xs">
            <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center mb-2">1</div>
            <strong className="text-slate-900 block mb-1">Devant voyelle ou « h » muet :</strong>
            <p className="text-slate-600 text-xs leading-relaxed">
              Le pronom <strong>je</strong> devient <strong>j'</strong> :<br />
              <span className="text-amber-700 font-medium">j'aime</span>, <span className="text-amber-700 font-medium">j'habite</span>, <span className="text-amber-700 font-medium">j'adore</span>.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-xs">
            <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center mb-2">2</div>
            <strong className="text-slate-900 block mb-1">Même son, mais pas la même écriture :</strong>
            <p className="text-slate-600 text-xs leading-relaxed">
              <strong>Il parle</strong> et <strong>ils parlent</strong> se prononcent exactement de la même manière (<span className="italic">/parl/</span>), mais s'écrivent différemment ! (Ne pas prononcer le <span className="underline">-ent</span>).
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-xs">
            <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center mb-2">3</div>
            <strong className="text-slate-900 block mb-1">Pour l'âge, on utilise AVOIR :</strong>
            <p className="text-slate-600 text-xs leading-relaxed">
              En français, on dit : <span className="text-emerald-700 font-bold">« J'ai 13 ans »</span> et JAMAIS <span className="text-rose-600 line-through">« Je suis 13 ans »</span> !
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Verbs Explorer (14 verbes en -er) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-sm font-black">2</span>
              Laboratoire des Verbes du 1er groupe (-er)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Choisis l'un des 14 verbes de la liste pour voir sa conjugaison instantanée et écouter sa prononciation.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <AudioButton text={`${customVerb.inf}. ${customVerb.example}`} label="Écouter le verbe" size="md" />
          </div>
        </div>

        {/* Verb selector pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {OTHER_ER_VERBS.map((v) => (
            <button
              key={v.inf}
              onClick={() => setCustomVerb(v)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                customVerb.inf === v.inf
                  ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-300'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {v.inf} <span className="opacity-75 font-normal">({v.es})</span>
            </button>
          ))}
        </div>

        {/* Selected Verb Conjugation Matrix */}
        <div className="bg-emerald-50/40 rounded-2xl border border-emerald-200 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-emerald-200 pb-4 mb-4 gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Verbe sélectionné</span>
              <div className="flex items-baseline gap-2">
                <h4 className="text-2xl font-black text-emerald-950 capitalize">{customVerb.inf}</h4>
                <span className="text-sm text-emerald-700">({customVerb.es})</span>
              </div>
            </div>
            <div className="px-3 py-1 bg-white rounded-lg border border-emerald-200 text-xs text-emerald-800 font-medium">
              💡 Règle : {customVerb.rule}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
            <div className="bg-white p-3 rounded-xl border border-emerald-100 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500">je / j'</span>
                <p className="font-semibold text-slate-800">
                  {getCustomConjugation(verbStem, '<span class="text-emerald-600 font-black">-e</span>', 'je')}
                </p>
              </div>
              <AudioButton text={customVerb.inf === 'aimer' ? "j'aime" : customVerb.inf === 'habiter' ? "j'habite" : customVerb.inf === 'adorer' ? "j'adore" : `je ${verbStem}e`} size="sm" />
            </div>

            <div className="bg-white p-3 rounded-xl border border-emerald-100 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500">tu</span>
                <p className="font-semibold text-slate-800">
                  tu {verbStem}<span className="text-emerald-600 font-black">-es</span>
                </p>
              </div>
              <AudioButton text={`tu ${verbStem}es`} size="sm" />
            </div>

            <div className="bg-white p-3 rounded-xl border border-emerald-100 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500">il / elle</span>
                <p className="font-semibold text-slate-800">
                  il/elle {verbStem}<span className="text-emerald-600 font-black">-e</span>
                </p>
              </div>
              <AudioButton text={`il ${verbStem}e`} size="sm" />
            </div>

            <div className="bg-white p-3 rounded-xl border border-emerald-100 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500">nous</span>
                <p className="font-semibold text-slate-800">
                  nous {verbStem}<span className="text-emerald-600 font-black">-ons</span>
                </p>
              </div>
              <AudioButton text={`nous ${verbStem}ons`} size="sm" />
            </div>

            <div className="bg-white p-3 rounded-xl border border-emerald-100 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500">vous</span>
                <p className="font-semibold text-slate-800">
                  vous {verbStem}<span className="text-emerald-600 font-black">-ez</span>
                </p>
              </div>
              <AudioButton text={`vous ${verbStem}ez`} size="sm" />
            </div>

            <div className="bg-white p-3 rounded-xl border border-emerald-100 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500">ils / elles</span>
                <p className="font-semibold text-slate-800">
                  ils/elles {verbStem}<span className="text-emerald-600 font-black">-ent</span>
                </p>
              </div>
              <AudioButton text={`ils ${verbStem}ent`} size="sm" />
            </div>
          </div>

          <div className="mt-4 bg-white/80 p-3 rounded-xl border border-emerald-200 flex items-center justify-between">
            <span className="text-xs text-slate-600">
              <strong>Exemple en contexte :</strong> « {customVerb.example} »
            </span>
            <AudioButton text={customVerb.example} size="sm" />
          </div>
        </div>
      </div>

      {/* Vocabulaire Thématique */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center text-sm font-black">3</span>
              Vocabulaire Utile de l'Atelier
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Les héros, actions, qualités, défauts et connecteurs indispensables pour la compréhension et la rédaction.
            </p>
          </div>

          {/* Categories Tab Bar */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-xl">
            {(['tous', 'héros', 'actions', 'qualités', 'défauts', 'connecteurs'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveVocabTab(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                  activeVocabTab === cat
                    ? 'bg-white text-purple-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVocab.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-slate-200 hover:border-purple-300 hover:shadow-sm transition-all bg-white flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 block mb-1">
                      {item.category}
                    </span>
                    <h5 className="text-base font-bold text-slate-900">
                      {item.french}
                      {item.feminine && (
                        <span className="text-slate-500 font-normal text-sm"> / {item.feminine}</span>
                      )}
                    </h5>
                  </div>
                  <AudioButton text={`${item.french}${item.feminine ? ' ' + item.feminine : ''}`} size="sm" />
                </div>
                <p className="text-xs text-slate-500 mt-1 italic">🇪🇸 {item.spanish}</p>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 bg-slate-50 -mx-4 -mb-4 p-3 rounded-b-xl">
                <span className="truncate pr-2">« {item.example} »</span>
                <AudioButton text={item.example} size="sm" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
