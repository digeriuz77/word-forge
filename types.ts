export interface Word {
  term: string;
  definition: string;
  l1_translation: string;
  contexts?: {
    subject: string;
    sentence: string;
  }[];
}

// --- Activity-specific data structures ---

export interface MorphologyBuilderData {
  type: 'MorphologyBuilder';
  root: {
    text: string;
    meaning: string;
  };
  prefixes: { text: string; meaning: string }[];
  suffixes: { text: string; partOfSpeech: string }[];
  examples: {
    word: string;
    parts: string[];
    definition: string;
  }[];
}

export interface WordConstructionData {
  type: 'WordConstruction';
  targets: {
    definition: string;
    parts: string[];
  }[];
  allParts: string[];
}

export interface OddOneOutData {
  type: 'OddOneOut';
  sets: {
    words: string[];
    oddOneOut: string;
    reason: string;
  }[];
}


export interface WordSortData {
    type: 'WordSort';
    categories: string[];
    words: { text: string; category: string }[];
}

export interface AnalogyData {
    type: 'Analogy';
    sentence: [string, string]; // e.g., ["An instruction is to a student as a recipe is to a", "."]
    correctAnswer: string;
    distractors: string[];
}


// A discriminated union for all possible activities
export type ActivityData = MorphologyBuilderData | WordSortData | AnalogyData | WordConstructionData | OddOneOutData;

export interface WeekData {
  week: number;
  title: string;
  morphology: MorphologyBuilderData;
  vocabulary: Word[];
  contextualActivities: (WordSortData | AnalogyData | WordConstructionData | OddOneOutData)[];
}

export interface ReviewItem {
  term: string;
  rule: boolean;
  relate: boolean;
  test: boolean;
}

export interface ActivityState {
  completed?: boolean;
  [key: string]: any;
}