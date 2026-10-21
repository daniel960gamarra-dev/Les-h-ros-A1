import { OralResource } from '../types';

export const ORAL_RESOURCES: OralResource[] = [
  {
    id: 'valerie',
    title: "Valérie se présente (Québec / France)",
    sourceName: "Le Point du FLE",
    sourceUrl: "https://www.lepointdufle.net/ressources_fle/audio_valerie-se-presente.htm",
    level: "A1 - Débutant",
    description: "Écoute Valérie qui se présente : son prénom, sa nationalité, sa région d'origine, son âge, ses études et son séjour en France.",
    audioSpeedOptions: [0.75, 0.9, 1.0],
    culturalNotes: [
      "Le Québec est une province francophone du Canada.",
      "La Gaspésie est une magnifique péninsule dans l'est du Québec au bord de la mer.",
      "L'Université Laval est la plus ancienne université francophone d'Amérique du Nord."
    ],
    vocabularyList: [
      { word: "Je suis québécoise", meaning: "Soy quebequense (de la provincia de Quebec)" },
      { word: "Je suis née", meaning: "Nací" },
      { word: "Un petit village", meaning: "Un pequeño pueblo" },
      { word: "J'ai 23 ans", meaning: "Tengo 23 años (¡verbo avoir para la edad!)" },
      { word: "Étudiante", meaning: "Estudiante universitaria" },
      { word: "Un semestre d'échange", meaning: "Un semestre de intercambio" },
      { word: "Voyager", meaning: "Viajar (verbo en -er)" }
    ],
    transcript: [
      "Bonjour ! Je m'appelle Valérie.",
      "Je suis québécoise. Je suis née dans un petit village qui s'appelle Maria, en Gaspésie, dans l'est du Québec.",
      "J'ai 23 ans.",
      "Je suis étudiante à l'Université Laval, dans la ville de Québec. Je suis en troisième année d'études.",
      "En ce moment, je suis en France pour un semestre d'échange universitaire.",
      "J'adore voyager, rencontrer de nouvelles personnes et étudier les langues !"
    ],
    questions: [
      {
        id: 1,
        prompt: "D'où vient Valérie ?",
        options: [
          "Elle vient du Québec (Canada).",
          "Elle vient de Colombie.",
          "Elle vient d'Espagne."
        ],
        correctIndex: 0,
        explanation: "Valérie dit : « Je suis québécoise... dans l'est du Québec »."
      },
      {
        id: 2,
        prompt: "Dans quel village est-elle née ?",
        options: [
          "À Paris.",
          "Dans un village qui s'appelle Maria, en Gaspésie.",
          "À Montréal."
        ],
        correctIndex: 1,
        explanation: "Elle précise : « Je suis née dans un petit village qui s'appelle Maria, en Gaspésie »."
      },
      {
        id: 3,
        prompt: "Quel âge a Valérie ?",
        options: [
          "Elle a 13 ans.",
          "Elle a 23 ans.",
          "Elle a 33 ans."
        ],
        correctIndex: 1,
        explanation: "Elle utilise le verbe avoir : « J'ai 23 ans »."
      },
      {
        id: 4,
        prompt: "Quelle est son occupation ?",
        options: [
          "Elle est professeure de dessin.",
          "Elle est étudiante à l'Université Laval.",
          "Elle est footballeuse professionnelle."
        ],
        correctIndex: 1,
        explanation: "Elle dit : « Je suis étudiante à l'Université Laval, dans la ville de Québec »."
      },
      {
        id: 5,
        prompt: "Pourquoi est-elle en France en ce moment ?",
        options: [
          "Pour des vacances à la plage.",
          "Pour un semestre d'échange universitaire.",
          "Pour acheter une maison."
        ],
        correctIndex: 1,
        explanation: "Elle explique : « En ce moment, je suis en France pour un semestre d'échange universitaire »."
      },
      {
        id: 6,
        prompt: "Qu'est-ce que Valérie adore faire ? (verbe en -er)",
        options: [
          "Elle adore voyager et étudier les langues.",
          "Elle adore dormir toute la journée.",
          "Elle déteste les gens."
        ],
        correctIndex: 0,
        explanation: "Elle conclut : « J'adore voyager, rencontrer de nouvelles personnes et étudier les langues ! »"
      }
    ]
  },
  {
    id: 'victor_hugo',
    title: "Victor Hugo – Biographie & Poème « Demain, dès l'aube »",
    sourceName: "Podcast Français Facile",
    sourceUrl: "https://www.podcastfrancaisfacile.com/texte/victor_hugo-1.html",
    level: "A1/A2 - Découverte culturelle",
    description: "Découvre un grand personnage historique et littéraire français : Victor Hugo, ainsi que son poème le plus émouvant récité à voix haute.",
    audioSpeedOptions: [0.75, 0.85, 1.0],
    culturalNotes: [
      "Victor Hugo (1802-1885) est l'un des écrivains les plus célèbres de toute l'histoire de France.",
      "Il a écrit 'Les Misérables' (avec Jean Valjean et Cosette) et 'Notre-Dame de Paris' (avec Quasimodo et Esmeralda).",
      "Le poème 'Demain, dès l'aube' est dédié à sa fille Léopoldine."
    ],
    vocabularyList: [
      { word: "Un écrivain / un poète", meaning: "Un escritor / un poeta" },
      { word: "Dès l'aube", meaning: "Desde el alba / al amanecer" },
      { word: "La campagne", meaning: "El campo" },
      { word: "Je partirai", meaning: "Partiré / me iré" },
      { word: "La forêt / la montagne", meaning: "El bosque / la montaña" },
      { word: "Demeurer", meaning: "Permanecer / quedarse" },
      { word: "Triste", meaning: "Triste" }
    ],
    transcript: [
      "Victor Hugo est un très grand écrivain et poète français du dix-neuvième siècle.",
      "Il est né en 1802 à Besançon en France. C'est un homme célèbre, courageux et engagé.",
      "Il écrit des livres très populaires dans le monde entier, comme Notre-Dame de Paris et Les Misérables.",
      "Écoutez maintenant les vers célèbres de son poème « Demain, dès l'aube » :",
      "Demain, dès l'aube, à l'heure où blanchit la campagne,",
      "Je partirai. Vois-tu, je sais que tu m'attends.",
      "J'irai par la forêt, j'irai par la montagne.",
      "Je ne puis demeurer loin de toi plus longtemps.",
      "Je marcherai les yeux fixés sur mes pensées,",
      "Sans rien voir au dehors, sans entendre aucun bruit,",
      "Seul, inconnu, le dos courbé, les mains croisées,",
      "Triste, et le jour pour moi sera comme la nuit."
    ],
    questions: [
      {
        id: 1,
        prompt: "Qui est Victor Hugo ?",
        options: [
          "Un grand écrivain et poète français.",
          "Un joueur de football brésilien.",
          "Un super-héros de bande dessinée américaine."
        ],
        correctIndex: 0,
        explanation: "Victor Hugo est l'un des plus grands écrivains et poètes de l'histoire de France."
      },
      {
        id: 2,
        prompt: "Quels sont deux livres très célèbres écrits par Victor Hugo ?",
        options: [
          "Spider-Man et Batman.",
          "Notre-Dame de Paris et Les Misérables.",
          "Le Petit Prince et Harry Potter."
        ],
        correctIndex: 1,
        explanation: "Ses chefs-d'œuvre universels sont Notre-Dame de Paris et Les Misérables."
      },
      {
        id: 3,
        prompt: "À quel moment de la journée le poète commence-t-il son voyage ?",
        options: [
          "À minuit en pleine nuit.",
          "Dès l'aube, à l'heure où se lève le soleil.",
          "À midi pendant le déjeuner."
        ],
        correctIndex: 1,
        explanation: "« Dès l'aube, à l'heure où blanchit la campagne » signifie très tôt le matin, au lever du soleil."
      },
      {
        id: 4,
        prompt: "Par où va marcher le poète pour son voyage ?",
        options: [
          "Par l'aéroport et la gare.",
          "Par la forêt et par la montagne.",
          "Sous l'eau dans l'océan."
        ],
        correctIndex: 1,
        explanation: "Le poème dit : « J'irai par la forêt, j'irai par la montagne »."
      },
      {
        id: 5,
        prompt: "Quelle est l'émotion dominante du poète dans ces vers ?",
        options: [
          "Il est très joyeux et rigole.",
          "Il est triste et marche seul et silencieux.",
          "Il est en colère contre ses voisins."
        ],
        correctIndex: 1,
        explanation: "Il dit : « Seul, inconnu... Triste, et le jour pour moi sera comme la nuit »."
      }
    ]
  }
];
