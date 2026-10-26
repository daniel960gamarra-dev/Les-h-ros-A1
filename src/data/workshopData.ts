import {
  VerbConjugation,
  VocabItem,
  QuestionMCQ,
  FillInExerciseItem,
  ErrorCorrectionItem,
  WordOrderExerciseItem,
  ReadingQuestion
} from '../types';

export const VERBS_DATA: VerbConjugation[] = [
  {
    infinitive: 'ÊTRE',
    translation_es: 'ser / estar',
    meaning: 'Indiquer une identité, une nationalité, un métier, un état, un lieu',
    group: 'être',
    conjugation: {
      je: 'suis',
      tu: 'es',
      il_elle: 'est',
      nous: 'sommes',
      vous: 'êtes',
      ils_elles: 'sont'
    },
    sampleSentence: 'Je suis élève de 7e et je suis courageux.'
  },
  {
    infinitive: 'AVOIR',
    translation_es: 'tener (¡también para la edad!)',
    meaning: 'Posséder quelque chose, indiquer son âge, des caractéristiques',
    group: 'avoir',
    conjugation: {
      je: "j'ai",
      tu: 'as',
      il_elle: 'a',
      nous: 'avons',
      vous: 'avez',
      ils_elles: 'ont'
    },
    sampleSentence: "J'ai 13 ans et j'ai un super-pouvoir."
  },
  {
    infinitive: 'PARLER',
    translation_es: 'hablar',
    meaning: 'Verbe modèle régulier du 1er groupe (-er)',
    group: '1er groupe (-er)',
    conjugation: {
      je: 'parle',
      tu: 'parles',
      il_elle: 'parle',
      nous: 'parlons',
      vous: 'parlez',
      ils_elles: 'parlent'
    },
    sampleSentence: 'Nous parlons français et espagnol.'
  }
];

export const OTHER_ER_VERBS = [
  { inf: 'aimer', es: 'amar / gustar', example: "J'aime la musique", rule: "j' devant voyelle" },
  { inf: 'adorer', es: 'adorar / encantar', example: "J'adore le football", rule: "j' devant voyelle" },
  { inf: 'habiter', es: 'vivir / residir', example: "J'habite à Medellín", rule: "j' devant h muet" },
  { inf: 'étudier', es: 'estudiar', example: "J'étudie les sciences", rule: "j' devant voyelle" },
  { inf: 'travailler', es: 'trabajar', example: 'Je travaille beaucoup', rule: 'je travaille' },
  { inf: 'regarder', es: 'mirar / ver', example: 'Je regarde un film', rule: 'je regarde' },
  { inf: 'écouter', es: 'escuchar', example: "J'écoute le professeur", rule: "j' devant voyelle" },
  { inf: 'jouer', es: 'jugar / tocar', example: 'Je joue au basket', rule: 'je joue' },
  { inf: 'porter', es: 'llevar puesto / vestir', example: 'Il porte un costume bleu', rule: 'il porte' },
  { inf: 'aider', es: 'ayudar', example: "J'aide mes amis", rule: "j' devant voyelle" },
  { inf: 'rester', es: 'quedarse', example: 'Elle reste à la maison', rule: 'elle reste' },
  { inf: 'arriver', es: 'llegar', example: "J'arrive au collège à sept heures", rule: "j' devant voyelle" },
  { inf: 'chanter', es: 'cantar', example: 'Tu chantes très bien', rule: 'tu chantes' },
  { inf: 'détester', es: 'detestar / odiar', example: 'Je déteste les devoirs', rule: 'je déteste' },
  { inf: 'casser', es: 'romper / quebrar', example: 'Le super-héros ne casse rien', rule: 'je casse' }
];

export const VOCABULARY_DATA: VocabItem[] = [
  // Les héros
  { id: 'h1', french: 'un héros', feminine: 'une héroïne', spanish: 'un héroe / una heroína', category: 'héros', example: 'Mulan est une héroïne courageuse.' },
  { id: 'h2', french: 'un super-pouvoir', spanish: 'un superpoder', category: 'héros', example: 'Spider-Man a un super-pouvoir incroyable.' },
  { id: 'h3', french: 'un costume', spanish: 'un traje / vestuario', category: 'héros', example: 'Son costume est rouge et bleu.' },
  { id: 'h4', french: 'un masque', spanish: 'una máscara / antifaz', category: 'héros', example: 'Il porte un masque pour cacher son identité.' },
  { id: 'h5', french: 'une mission', spanish: 'una misión', category: 'héros', example: 'Sa mission est de protéger la planète.' },
  { id: 'h6', french: 'une légende', spanish: 'una leyenda', category: 'héros', example: 'Mulan est une héroïne de légende chinoise.' },
  { id: 'h7', french: 'un personnage', spanish: 'un personaje', category: 'héros', example: 'C’est un personnage de fiction.' },
  { id: 'h8', french: 'un prix', spanish: 'un premio', category: 'héros', example: 'L’artiste reçoit un grand prix.' },

  // Actions & Vocabulaire utile
  { id: 'a1', french: 'défendre', spanish: 'defender / proteger', category: 'actions', example: 'Le super-héros défend les citoyens et la ville.' },
  { id: 'a2', french: 'apparaître', spanish: 'aparecer / manifestarse', category: 'actions', example: 'L’héroïne apparaît rapidement en cas de danger.' },
  { id: 'a3', french: 'punir', spanish: 'castigar / sancionar', category: 'actions', example: 'La justice et la police punissent les méchants.' },
  { id: 'a4', french: 'casser', spanish: 'romper / quebrar', category: 'actions', example: 'Attention à ne pas casser le masque du héros !' },
  { id: 'a5', french: 'le droit', feminine: 'les droits', spanish: 'el derecho / las lois / la justicia', category: 'actions', example: 'Chaque personne a le droit d’être respectée et protégée.' },

  // Les qualités
  { id: 'q1', french: 'courageux', feminine: 'courageuse', spanish: 'valiente / animoso(a)', category: 'qualités', example: 'Elle est courageuse face au danger.' },
  { id: 'q2', french: 'généreux', feminine: 'généreuse', spanish: 'generoso(a)', category: 'qualités', example: 'Il est très généreux avec sa fondation.' },
  { id: 'q3', french: 'intelligent', feminine: 'intelligente', spanish: 'inteligente', category: 'qualités', example: 'Mulan est une héroïne très intelligente.' },
  { id: 'q4', french: 'gentil', feminine: 'gentille', spanish: 'amable / simpático(a)', category: 'qualités', example: 'Vous êtes très gentils.' },
  { id: 'q5', french: 'fort', feminine: 'forte', spanish: 'fuerte', category: 'qualités', example: 'Je suis grand et fort.' },
  { id: 'q6', french: 'travailleur', feminine: 'travailleuse', spanish: 'trabajador(a)', category: 'qualités', example: 'Elle est travailleuse et peint des tableaux.' },
  { id: 'q7', french: 'célèbre', feminine: 'célèbre', spanish: 'famoso(a) / célebre', category: 'qualités', example: 'Frida Kahlo crée des tableaux célèbres.' },
  { id: 'q8', french: 'populaire', feminine: 'populaire', spanish: 'popular', category: 'qualités', example: 'Spider-Man est très populaire dans sa ville.' },

  // Les défauts
  { id: 'd1', french: 'timide', feminine: 'timide', spanish: 'tímido(a)', category: 'défauts', example: 'Je suis un peu timide en public.' },
  { id: 'd2', french: 'impatient', feminine: 'impatiente', spanish: 'impaciente', category: 'défauts', example: 'Il est très impatient d’ouvrir ses cadeaux.' },
  { id: 'd3', french: 'paresseux', feminine: 'paresseuse', spanish: 'perezoso(a)', category: 'défauts', example: 'Il n’est pas travailleur, il est paresseux.' },
  { id: 'd4', french: 'têtu', feminine: 'têtue', spanish: 'terco(a) / obstinado(a)', category: 'défauts', example: 'Elle est têtue mais déterminée.' },
  { id: 'd5', french: 'bavard', feminine: 'bavarde', spanish: 'hablador(a) / parlanchín', category: 'défauts', example: 'Les élèves sont parfois bavards en classe.' },
  { id: 'd6', french: 'distrait', feminine: 'distraite', spanish: 'distraído(a)', category: 'défauts', example: 'Il oublie souvent ses clés car il est distrait.' },

  // Les connecteurs
  { id: 'c1', french: 'et', spanish: 'y', category: 'connecteurs', example: 'Je suis grand et fort.' },
  { id: 'c2', french: 'mais', spanish: 'pero', category: 'connecteurs', example: 'J’adore le cinéma, mais je déteste les devoirs !' },
  { id: 'c3', french: 'aussi', spanish: 'también', category: 'connecteurs', example: 'Dans la vraie vie aussi, il existe des héros.' },
  { id: 'c4', french: 'parce que', spanish: 'porque', category: 'connecteurs', example: 'Il est populaire parce qu’il aide les habitants.' },
  { id: 'c5', french: 'au contraire', spanish: 'al contrario / por el contrario', category: 'connecteurs', example: 'Spider-Man, au contraire, est un héros moderne.' },
  { id: 'c6', french: 'd’abord', spanish: 'primero / en primer lugar', category: 'connecteurs', example: 'D’abord, je révise les verbes.' },
  { id: 'c7', french: 'ensuite', spanish: 'luego / después', category: 'connecteurs', example: 'Ensuite, je fais les exercices.' },
  { id: 'c8', french: 'puis', spanish: 'luego / entonces', category: 'connecteurs', example: 'Puis, je vérifie avec le corrigé.' },
  { id: 'c9', french: 'enfin', spanish: 'finalmente / por fin', category: 'connecteurs', example: 'Enfin, je réussis mon examen !' }
];

export const READING_TEXT = {
  title: "Des modèles pour tous : de l'imaginaire à la réalité",
  paragraphs: [
    "Les super-héros plaisent aux jeunes et aux adultes de tous les pays. Mais qui sont-ils vraiment ? Nous découvrons des personnages de fiction et des personnes de la vie réelle.",
    "Mulan est une héroïne de légende chinoise. Elle est jeune, courageuse et très intelligente. Elle porte l'uniforme d'un soldat pour protéger son père. Spider-Man, au contraire, est un héros moderne : il s'appelle Peter Parker et il habite à New York. Il est très populaire parce qu'il aide les habitants de la ville. Son costume est rouge et bleu et il porte un masque.",
    "Dans la vraie vie aussi, il existe des héros, mais ils n'ont ni costume ni masque. Frida Kahlo est une artiste mexicaine. Elle a un accident grave à 18 ans, mais elle continue à peindre. Elle travaille beaucoup et elle crée des tableaux célèbres dans le monde entier.",
    "Lionel Messi est un footballeur argentin. Il a un problème de santé quand il est enfant, mais il travaille beaucoup et il continue à jouer. Aujourd'hui, il joue dans un grand club et il aide les enfants malades avec sa fondation.",
    "Enfin, les personnages imaginaires nous amusent, mais les personnes réelles nous inspirent. Un héros n'a pas besoin de super-pouvoirs : il est travailleur, il est généreux et il protège les autres."
  ]
};

export const READING_QUESTIONS: ReadingQuestion[] = [
  {
    id: 1,
    type: 'true_false',
    points: 1.5,
    prompt: "1. Les super-héros plaisent seulement aux adultes. Réponds VRAI ou FAUX et justifie avec une phrase du texte.",
    correctAnswer: "FAUX",
    modelAnswer: "FAUX. Justification : « Les super-héros plaisent aux jeunes et aux adultes de tous les pays. »",
    explanation: "Le texte précise qu'ils plaisent aux jeunes ET aux adultes de tous les pays."
  },
  {
    id: 2,
    type: 'open',
    points: 2.0,
    prompt: "2. Donne deux caractéristiques de Mulan. (2 points : 1 point par caractéristique)",
    correctAnswer: "Mulan est jeune, courageuse et très intelligente (ou : elle porte l'uniforme d'un soldat pour protéger son père).",
    modelAnswer: "Mulan est jeune, courageuse et très intelligente (deux au choix). Elle porte aussi l'uniforme d'un soldat pour protéger son père.",
    explanation: "Dans le texte : « Elle est jeune, courageuse et très intelligente. Elle porte l'uniforme d'un soldat pour protéger son père. »"
  },
  {
    id: 3,
    type: 'mcq',
    points: 1.0,
    prompt: "3. Spider-Man est très populaire parce qu'il…",
    mcqOptions: [
      { label: 'a', text: 'aide les habitants de la ville.' },
      { label: 'b', text: 'habite en Chine.' },
      { label: 'c', text: 'déteste les enfants.' }
    ],
    correctAnswer: 'a',
    modelAnswer: "a. aide les habitants de la ville.",
    explanation: "Dans le texte : « Il est très populaire parce qu'il aide les habitants de la ville. »"
  },
  {
    id: 4,
    type: 'open',
    points: 2.0,
    prompt: "4. Où habite Peter Parker et comment est son costume ? Donne une réponse complète.",
    correctAnswer: "Peter Parker habite à New York et son costume est rouge et bleu.",
    modelAnswer: "Peter Parker (Spider-Man) habite à New York et son costume est rouge et bleu (avec un masque).",
    explanation: "Réponse complète requise : sujet + verbe. 1 pt pour le lieu, 1 pt pour le costume."
  },
  {
    id: 5,
    type: 'true_false',
    points: 1.5,
    prompt: "5. Frida Kahlo arrête de peindre après son accident. Réponds VRAI ou FAUX et justifie avec une phrase du texte.",
    correctAnswer: "FAUX",
    modelAnswer: "FAUX. Justification : « ...mais elle continue à peindre. »",
    explanation: "Le texte indique : « Elle a un accident grave à 18 ans, mais elle continue à peindre. »"
  },
  {
    id: 6,
    type: 'open',
    points: 2.0,
    prompt: "6. Mentionne deux actions héroïques de Lionel Messi. (2 points)",
    correctAnswer: "Il continue à jouer malgré son problème de santé et il aide les enfants malades avec sa fondation.",
    modelAnswer: "Il travaille beaucoup ; il continue à jouer (malgré son problème de santé) ; il aide les enfants malades avec sa fondation (deux au choix).",
    explanation: "Deux actions parmi : surmonter son problème de santé, jouer dans un grand club, aider les enfants malades avec sa fondation."
  },
  {
    id: 7,
    type: 'mcq',
    points: 1.0,
    prompt: "7. Selon le texte, un héros…",
    mcqOptions: [
      { label: 'a', text: 'a besoin de super-pouvoirs.' },
      { label: 'b', text: 'porte toujours un masque.' },
      { label: 'c', text: 'est généreux et protège les autres.' }
    ],
    correctAnswer: 'c',
    modelAnswer: "c. est généreux et protège les autres.",
    explanation: "Dans le dernier paragraphe : « Un héros n'a pas besoin de super-pouvoirs : il est travailleur, il est généreux et il protège les autres. »"
  }
];

export const WRITING_MODEL = {
  title: "Modèle de production écrite (Lucas Ferreira)",
  author: "Lucas Ferreira (footballeur)",
  text: `Bonjour ! Je m'appelle Lucas Ferreira et je suis footballeur. Je suis brésilien et j'ai 16 ans. J'habite à São Paulo avec ma famille. J'ai une sœur et deux frères. Je suis grand et fort, j'ai les cheveux noirs et les yeux marron. Chaque matin, j'arrive au stade à sept heures et je travaille avec mon équipe. Le soir, j'étudie et j'écoute de la musique. J'adore la pizza et le cinéma, mais je déteste les devoirs ! Je suis courageux et généreux, mais je suis aussi un peu timide et très impatient. Enfin, je rêve d'un grand titre et je travaille beaucoup.`,
  wordCount: 104,
  breakdown: [
    { label: "Nom & Identité", text: "Lucas Ferreira, footballeur, brésilien, 16 ans, habite à São Paulo", color: "blue" },
    { label: "Famille", text: "une sœur et deux frères", color: "purple" },
    { label: "Apparence & Caractère", text: "grand et fort, cheveux noirs, yeux marron, courageux, généreux, timide, impatient", color: "emerald" },
    { label: "Profession & Quotidien", text: "arrive au stade à 7h, travaille avec l'équipe, étudie, écoute de la musique", color: "amber" },
    { label: "Goûts", text: "adore la pizza et le cinéma, déteste les devoirs", color: "rose" },
    { label: "Connecteurs utilisés", text: "et, avec, mais, aussi, enfin", color: "indigo" }
  ]
};

// All 8 Grammar Exercises exactly as given in the workshop PDF
export const GRAMMAR_EXERCISES = {
  ex1: [
    { id: 1, question: "Tu ___ le français à l'école.", options: [{ label: 'A', text: 'étudie' }, { label: 'B', text: 'étudies' }, { label: 'C', text: 'étudions' }], correct: 'B', explanation: "Avec 'tu', la terminaison du verbe régulier en -er est toujours '-es' (tu étudies)." },
    { id: 2, question: "Nous ___ trois chiens.", options: [{ label: 'A', text: 'avons' }, { label: 'B', text: 'ont' }, { label: 'C', text: 'avez' }], correct: 'A', explanation: "Avec 'nous', le verbe avoir se conjugue 'avons' (nous avons)." },
    { id: 3, question: "Vous ___ très gentils.", options: [{ label: 'A', text: 'sommes' }, { label: 'B', text: 'êtes' }, { label: 'C', text: 'sont' }], correct: 'B', explanation: "Avec 'vous', le verbe être est 'vous êtes'." },
    { id: 4, question: "Elle ___ à la maison.", options: [{ label: 'A', text: 'reste' }, { label: 'B', text: 'restes' }, { label: 'C', text: 'restons' }], correct: 'A', explanation: "Avec 'elle', la terminaison est '-e' (elle reste)." },
    { id: 5, question: "J'___ douze ans.", options: [{ label: 'A', text: 'as' }, { label: 'B', text: 'ai' }, { label: 'C', text: 'a' }], correct: 'B', explanation: "Pour l'âge en français, on utilise AVOIR : J'ai 12 ans." },
    { id: 6, question: "Mes parents ___ professeurs.", options: [{ label: 'A', text: 'est' }, { label: 'B', text: 'sont' }, { label: 'C', text: 'êtes' }], correct: 'B', explanation: "'Mes parents' = 'ils', donc le verbe être est 'sont'." },
    { id: 7, question: "Les élèves ___ le cours.", options: [{ label: 'A', text: 'écoute' }, { label: 'B', text: 'écoutons' }, { label: 'C', text: 'écoutent' }], correct: 'C', explanation: "'Les élèves' = 'ils', terminaison du 1er groupe = '-ent' (ils écoutent)." },
    { id: 8, question: "Tu ___ italien ?", options: [{ label: 'A', text: 'es' }, { label: 'B', text: 'est' }, { label: 'C', text: 'êtes' }], correct: 'A', explanation: "Avec 'tu', le verbe être est 'es' (tu es)." },
    { id: 9, question: "Nous ___ la télévision le soir.", options: [{ label: 'A', text: 'regardons' }, { label: 'B', text: 'regardez' }, { label: 'C', text: 'regardent' }], correct: 'A', explanation: "Avec 'nous', la terminaison est toujours '-ons' (nous regardons)." },
    { id: 10, question: "Il ___ un super-pouvoir.", options: [{ label: 'A', text: 'as' }, { label: 'B', text: 'a' }, { label: 'C', text: 'ont' }], correct: 'B', explanation: "Avec 'il', le verbe avoir est 'a' (il a)." }
  ] as QuestionMCQ[],

  ex2: [
    { id: 1, prefix: "Je", expected: "suis", suffix: "courageux.", explanation: "je suis" },
    { id: 2, prefix: "Tu", expected: "es", suffix: "généreuse.", explanation: "tu es" },
    { id: 3, prefix: "Elle", expected: "est", suffix: "mexicaine.", explanation: "elle est" },
    { id: 4, prefix: "Nous", expected: "sommes", suffix: "à l'école.", explanation: "nous sommes" },
    { id: 5, prefix: "Vous", expected: "êtes", suffix: "en retard.", explanation: "vous êtes" },
    { id: 6, prefix: "Ils", expected: "sont", suffix: "amis.", explanation: "ils sont" },
    { id: 7, prefix: "Marie et Sophie", expected: "sont", suffix: "élèves.", explanation: "Marie et Sophie = elles sont" },
    { id: 8, prefix: "Mon père", expected: "est", suffix: "professeur.", explanation: "Mon père = il est" }
  ] as FillInExerciseItem[],

  ex3: [
    { id: 1, prefix: "J'", expected: "ai", suffix: "un chien.", explanation: "j'ai" },
    { id: 2, prefix: "Tu", expected: "as", suffix: "un costume rouge.", explanation: "tu as" },
    { id: 3, prefix: "Il", expected: "a", suffix: "quinze ans.", explanation: "il a (l'âge s'exprime avec avoir)" },
    { id: 4, prefix: "Nous", expected: "avons", suffix: "un super-pouvoir.", explanation: "nous avons" },
    { id: 5, prefix: "Vous", expected: "avez", suffix: "une sœur.", explanation: "vous avez" },
    { id: 6, prefix: "Elles", expected: "ont", suffix: "des amis.", explanation: "elles ont" },
    { id: 7, prefix: "Mon ami", expected: "a", suffix: "un masque.", explanation: "mon ami = il a" },
    { id: 8, prefix: "Les héros", expected: "ont", suffix: "du courage.", explanation: "les héros = ils ont" }
  ] as FillInExerciseItem[],

  ex4: [
    { id: 1, prefix: "Je (parler)", expected: "parle", suffix: "français.", explanation: "je parle (-e)" },
    { id: 2, prefix: "Tu (chanter)", expected: "chantes", suffix: "très bien.", explanation: "tu chantes (-es)" },
    { id: 3, prefix: "Elle (habiter)", expected: "habite", suffix: "à Medellín.", explanation: "elle habite (-e)" },
    { id: 4, prefix: "Nous (aimer)", expected: "aimons", suffix: "le football.", explanation: "nous aimons (-ons)" },
    { id: 5, prefix: "Vous (regarder)", expected: "regardez", suffix: "un film.", explanation: "vous regardez (-ez)" },
    { id: 6, prefix: "Ils (étudier)", expected: "étudient", suffix: "les sciences.", explanation: "ils étudient (-ent)" },
    { id: 7, prefix: "J'(adorer)", expected: "adore", suffix: "la musique.", explanation: "j'adore (-e)" },
    { id: 8, prefix: "Mon frère (jouer)", expected: "joue", suffix: "au basket.", explanation: "mon frère = il joue (-e)" },
    { id: 9, prefix: "Les élèves (écouter)", expected: "écoutent", suffix: "le professeur.", explanation: "les élèves = ils écoutent (-ent)" },
    { id: 10, prefix: "Tu (travailler)", expected: "travailles", suffix: "le samedi ?", explanation: "tu travailles (-es)" }
  ] as FillInExerciseItem[],

  ex5: [
    { id: 1, prefix: "Elle", expected: "a", suffix: "14 ans.", explanation: "Âge : avoir -> Elle a 14 ans." },
    { id: 2, prefix: "Nous", expected: "sommes", suffix: "colombiens.", explanation: "Nationalité : être -> Nous sommes colombiens." },
    { id: 3, prefix: "Ils", expected: "ont", suffix: "un frère.", explanation: "Famille / possession : avoir -> Ils ont un frère." },
    { id: 4, prefix: "Vous", expected: "êtes", suffix: "fatigués.", explanation: "État : être -> Vous êtes fatigués." },
    { id: 5, prefix: "Tu", expected: "as", suffix: "une idée.", explanation: "Possession abstraite : avoir -> Tu as une idée." },
    { id: 6, prefix: "Je", expected: "suis", suffix: "timide.", explanation: "Caractère : être -> Je suis timide." },
    { id: 7, prefix: "Camila", expected: "a", suffix: "les cheveux longs.", explanation: "Description physique : avoir -> Camila a les cheveux longs." },
    { id: 8, prefix: "Mes amis", expected: "sont", suffix: "à la maison.", explanation: "Lieu : être -> Mes amis sont à la maison." }
  ] as FillInExerciseItem[],

  ex6: [
    { id: 1, incorrect: "Nous parlez anglais.", correct: "Nous parlons anglais.", explanation: "La terminaison pour 'nous' est '-ons', pas '-ez' (réservé à 'vous')." },
    { id: 2, incorrect: "Tu est timide.", correct: "Tu es timide.", explanation: "Avec 'tu', être s'écrit 'es' (tu es), alors que 'est' est pour il/elle." },
    { id: 3, incorrect: "Ils a un chat.", correct: "Ils ont un chat.", explanation: "Le verbe avoir avec 'ils' est 'ont' (ils ont)." },
    { id: 4, incorrect: "Je chantes bien.", correct: "Je chante bien.", explanation: "Avec 'je', pas de 's' à la fin du 1er groupe, seulement '-e' (je chante)." },
    { id: 5, incorrect: "Vous avons une classe.", correct: "Vous avez une classe.", explanation: "Avec 'vous', le verbe avoir est 'avez' (vous avez)." },
    { id: 6, incorrect: "Elles sommes amies.", correct: "Elles sont amies.", explanation: "Avec 'elles', le verbe être est 'sont' (elles sont)." },
    { id: 7, incorrect: "Je suis 13 ans.", correct: "J'ai 13 ans.", explanation: "Attention ! En français, on utilise AVOIR pour exprimer l'âge : J'ai 13 ans !" },
    { id: 8, incorrect: "Tu parle espagnol.", correct: "Tu parles espagnol.", explanation: "Avec 'tu', les verbes en -er prennent toujours un 's' : tu parles." }
  ] as ErrorCorrectionItem[],

  ex7: [
    {
      id: 1,
      words: ["super-pouvoirs", "a", "Elle", "des"],
      correctOrder: "Elle a des super-pouvoirs.",
      translation_es: "Ella tiene superpoderes."
    },
    {
      id: 2,
      words: ["nous", "à", "habitons", "Medellín"],
      correctOrder: "Nous habitons à Medellín.",
      translation_es: "Nosotros vivimos en Medellín."
    },
    {
      id: 3,
      words: ["sont", "courageux", "héros", "Les"],
      correctOrder: "Les héros sont courageux.",
      translation_es: "Los héroes son valientes."
    },
    {
      id: 4,
      words: ["un", "porte", "costume", "bleu", "Il"],
      correctOrder: "Il porte un costume bleu.",
      translation_es: "Él viste un traje azul."
    },
    {
      id: 5,
      words: ["aimes", "tu", "le", "football", "?"],
      correctOrder: "Tu aimes le football ?",
      translation_es: "¿Te gusta el fútbol?"
    }
  ] as WordOrderExerciseItem[],

  ex8: [
    { id: 1, verbHint: "être", expected: "suis", explanation: "Je suis Léa" },
    { id: 2, verbHint: "avoir", expected: "ai", explanation: "J'ai treize ans" },
    { id: 3, verbHint: "être", expected: "suis", explanation: "je suis colombienne" },
    { id: 4, verbHint: "habiter", expected: "habitons", explanation: "nous habitons à Bogotá" },
    { id: 5, verbHint: "avoir", expected: "a", explanation: "Mon frère a un chien" },
    { id: 6, verbHint: "adorer", expected: "adore", explanation: "il adore ce chien" },
    { id: 7, verbHint: "être", expected: "sont", explanation: "Mes parents sont professeurs" },
    { id: 8, verbHint: "travailler", expected: "travaillent", explanation: "ils travaillent à l'université" },
    { id: 9, verbHint: "avoir", expected: "as", explanation: "tu as une grande famille ?" },
    { id: 10, verbHint: "être", expected: "êtes", explanation: "Vous êtes nombreux ?" }
  ]
};
