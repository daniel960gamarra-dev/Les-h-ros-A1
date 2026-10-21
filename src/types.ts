export type TabType = 
  | 'fiches' 
  | 'grammaire' 
  | 'jeux' 
  | 'comprehension_ecrite' 
  | 'production_ecrite' 
  | 'comprehension_orale' 
  | 'examen_blanc';

export interface VerbConjugation {
  infinitive: string;
  translation_es: string;
  meaning: string;
  group: 'être' | 'avoir' | '1er groupe (-er)';
  conjugation: {
    je: string;
    tu: string;
    il_elle: string;
    nous: string;
    vous: string;
    ils_elles: string;
  };
  sampleSentence: string;
}

export interface VocabItem {
  id: string;
  french: string;
  feminine?: string;
  spanish: string;
  category: 'héros' | 'qualités' | 'défauts' | 'connecteurs';
  example: string;
  audioText?: string;
}

export interface QuestionMCQ {
  id: number;
  question: string;
  options: { label: string; text: string }[];
  correct: string;
  explanation: string;
}

export interface FillInExerciseItem {
  id: number;
  prefix: string;
  expected: string;
  suffix: string;
  verbHint?: string;
  explanation?: string;
}

export interface ErrorCorrectionItem {
  id: number;
  incorrect: string;
  correct: string;
  explanation: string;
}

export interface WordOrderExerciseItem {
  id: number;
  words: string[];
  correctOrder: string;
  translation_es: string;
}

export interface ReadingQuestion {
  id: number;
  type: 'true_false' | 'open' | 'mcq';
  points: number;
  prompt: string;
  mcqOptions?: { label: string; text: string }[];
  correctAnswer: string;
  modelAnswer: string;
  explanation: string;
}

export interface OralResource {
  id: 'valerie' | 'victor_hugo';
  title: string;
  sourceUrl: string;
  sourceName: string;
  level: string;
  description: string;
  audioSpeedOptions: number[];
  transcript: string[];
  culturalNotes?: string[];
  vocabularyList: { word: string; meaning: string }[];
  questions: {
    id: number;
    prompt: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}
