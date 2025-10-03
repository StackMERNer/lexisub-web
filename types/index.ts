export interface Word {
  _id: string;
  word: string;
  definitions: {
    partOfSpeech: string;
    meaning: string;
    example: string;
  }[];
  difficulty: "beginner" | "intermediate" | "advanced";
  frequency: number;
}

export interface Flashcard {
  word: Word;
  progress: {
    status: string;
    correctCount: number;
    incorrectCount: number;
  } | null;
  isReview: boolean;
}

export interface MediaSource {
  _id: string;
  title: string;
  type: "movie" | "tvshow" | "other";
  wordCount: number;
  processedAt: string;
}

export interface ProgressStats {
  totalWords: number;
  mastered: number;
  learning: number;
  reviewing: number;
}
