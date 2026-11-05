import { questions } from "@/data/questions";
import { isCorrectAnswer } from "@/lib/match-answer";
import {
  clearProgress,
  emptyProgress,
  loadProgress,
  saveProgress,
  type QuizProgress,
} from "@/lib/storage";

export type QuizScreen = "start" | "play" | "result";

export type QuizView = {
  ready: boolean;
  progress: QuizProgress;
  screen: QuizScreen;
};

const serverView: QuizView = {
  ready: false,
  progress: emptyProgress(),
  screen: "start",
};

let progress = emptyProgress();
let screen: QuizScreen = "start";
let hydrated = false;
let clientView: QuizView = serverView;
const listeners = new Set<() => void>();

function publish() {
  clientView = { ready: true, progress, screen };
  for (const listener of listeners) listener();
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot(): QuizView {
  if (!hydrated) {
    const stored = loadProgress();
    if (stored) {
      progress = stored;
      screen = stored.completed ? "result" : "start";
    }
    hydrated = true;
    clientView = { ready: true, progress, screen };
  }
  return clientView;
}

export function getServerSnapshot(): QuizView {
  return serverView;
}

export function startFresh() {
  progress = emptyProgress();
  screen = "play";
  saveProgress(progress);
  publish();
}

export function continueQuiz() {
  screen = "play";
  publish();
}

export function answerQuestion(given: string) {
  const question = questions[progress.currentIndex];
  if (!question || progress.answers.length !== progress.currentIndex) return;

  progress = {
    ...progress,
    answers: [
      ...progress.answers,
      {
        questionId: question.id,
        given,
        correct: isCorrectAnswer(question, given),
      },
    ],
  };
  saveProgress(progress);
  publish();
}

export function nextQuestion() {
  const nextIndex = progress.currentIndex + 1;
  if (nextIndex >= questions.length) {
    progress = { ...progress, currentIndex: questions.length, completed: true };
    screen = "result";
    saveProgress(progress);
    publish();
    return;
  }

  progress = { ...progress, currentIndex: nextIndex, completed: false };
  saveProgress(progress);
  publish();
}

export function restartQuiz() {
  clearProgress();
  progress = emptyProgress();
  screen = "start";
  publish();
}
