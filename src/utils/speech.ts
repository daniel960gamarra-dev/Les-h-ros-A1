/**
 * Web Speech API wrapper for natural French pronunciation
 * Safe, reliable, client-side only without external dependencies.
 */

let synth: SpeechSynthesis | null = null;
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  synth = window.speechSynthesis;
}

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

let cachedVoices: SpeechSynthesisVoice[] = [];

function loadVoices(): SpeechSynthesisVoice[] {
  if (!synth) return [];
  if (cachedVoices.length > 0) return cachedVoices;
  const voices = synth.getVoices();
  cachedVoices = voices;
  return voices;
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoices = window.speechSynthesis.getVoices();
  };
}

export function getFrenchVoice(preferCanadian: boolean = false): SpeechSynthesisVoice | null {
  const voices = loadVoices();
  if (voices.length === 0) return null;

  if (preferCanadian) {
    const caVoice = voices.find((v) => v.lang === 'fr-CA' || v.lang === 'fr_CA');
    if (caVoice) return caVoice;
  }

  // Look for French voices
  const frVoice = voices.find((v) => v.lang.startsWith('fr') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Premium')));
  if (frVoice) return frVoice;

  const anyFr = voices.find((v) => v.lang.startsWith('fr'));
  if (anyFr) return anyFr;

  return voices[0] || null;
}

export interface SpeakOptions {
  rate?: number;
  pitch?: number;
  preferCanadian?: boolean;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: () => void;
}

export function speakFrench(text: string, options: SpeakOptions = {}): void {
  if (!synth) return;

  // Stop any ongoing speech
  try {
    synth.cancel();
  } catch (e) {
    console.warn('Speech cancel error', e);
  }

  // Clean text slightly (e.g. remove parentheses or special formatting)
  const cleanText = text
    .replace(/[\[\]\(\)]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleanText) return;

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = options.preferCanadian ? 'fr-CA' : 'fr-FR';
  utterance.rate = options.rate ?? 0.85; // Slightly slower default for beginners
  utterance.pitch = options.pitch ?? 1.0;

  const voice = getFrenchVoice(options.preferCanadian);
  if (voice) {
    utterance.voice = voice;
  }

  utterance.onstart = () => {
    options.onStart?.();
  };

  utterance.onend = () => {
    options.onEnd?.();
  };

  utterance.onerror = (e) => {
    console.warn('Speech synthesis error', e);
    options.onError?.();
    options.onEnd?.();
  };

  try {
    synth.speak(utterance);
  } catch (err) {
    console.error('Failed to trigger speech synthesis:', err);
    options.onError?.();
  }
}

export function stopSpeech(): void {
  if (synth) {
    try {
      synth.cancel();
    } catch (e) {
      console.warn('Speech cancel error', e);
    }
  }
}
