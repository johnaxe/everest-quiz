import { questions } from "@/data/questions";

export const STORAGE_KEY = "everest-quiz-v1";

export type StoredAnswer = {
  questionId: string;
  given: string;
  correct: boolean;
};

export type QuizProgress = {
  currentIndex: number;
  answers: StoredAnswer[];
  completed: boolean;
  tiebreak: string | null;
};

export function emptyProgress(): QuizProgress {
  return { currentIndex: 0, answers: [], completed: false, tiebreak: null };
}

function isProgress(value: unknown): value is QuizProgress {
  if (!value || typeof value !== "object") return false;
  const progress = value as QuizProgress;
  if (!Array.isArray(progress.answers)) return false;
  if (typeof progress.currentIndex !== "number") return false;
  if (typeof progress.completed !== "boolean") return false;
  if (progress.answers.length > questions.length) return false;
  if (
    progress.tiebreak != null &&
    (typeof progress.tiebreak !== "string" || !/^\d+$/.test(progress.tiebreak))
  ) {
    return false;
  }

  for (let index = 0; index < progress.answers.length; index++) {
    const answer = progress.answers[index];
    if (!answer || answer.questionId !== questions[index]?.id) return false;
    if (typeof answer.given !== "string" || typeof answer.correct !== "boolean") {
      return false;
    }
  }

  if (progress.completed) {
    return (
      progress.answers.length === questions.length &&
      progress.currentIndex === questions.length
    );
  }

  if (progress.currentIndex === questions.length) {
    return progress.answers.length === questions.length;
  }

  if (progress.currentIndex < 0 || progress.currentIndex >= questions.length) {
    return false;
  }

  return (
    progress.currentIndex === progress.answers.length ||
    progress.currentIndex === progress.answers.length - 1
  );
}

export function loadProgress(): QuizProgress | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!isProgress(parsed)) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return { ...parsed, tiebreak: parsed.tiebreak ?? null };
  } catch {
    return null;
  }
}

export function saveProgress(progress: QuizProgress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Private mode and full storage still leave the quiz playable in memory.
  }
}

export function clearProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage failures and reset the in-memory round.
  }
}
