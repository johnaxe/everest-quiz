import { questions, type Choice } from "@/data/questions";
import { isCorrectAnswer } from "@/lib/match-answer";
import {
  clearProgress,
  emptyProgress,
  loadProgress,
  saveProgress,
  type QuizProgress,
} from "@/lib/storage";

export type QuizScreen = "start" | "play" | "tiebreak" | "result";

export type QuizView = {
  ready: boolean;
  progress: QuizProgress;
  screen: QuizScreen;
  choiceIds: string[];
};

const serverView: QuizView = {
  ready: false,
  progress: emptyProgress(),
  screen: "start",
  choiceIds: [],
};

let progress = emptyProgress();
let screen: QuizScreen = "start";
let choiceIds: string[] = [];
let hydrated = false;
let clientView: QuizView = serverView;
const listeners = new Set<() => void>();

function shuffleIds(choices: Choice[]): string[] {
  const ids = choices.map((choice) => choice.id);
  for (let index = ids.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    const current = ids[index];
    ids[index] = ids[swapIndex];
    ids[swapIndex] = current;
  }
  return ids;
}

function shuffleCurrentQuestion() {
  const question = questions[progress.currentIndex];
  if (screen !== "play" || question?.type !== "choice") {
    choiceIds = [];
    return;
  }
  choiceIds = shuffleIds(question.choices);
}

function publish() {
  clientView = { ready: true, progress, screen, choiceIds };
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
    clientView = { ready: true, progress, screen, choiceIds };
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
  shuffleCurrentQuestion();
  publish();
}

export function continueQuiz() {
  if (!progress.completed && progress.currentIndex >= questions.length) {
    screen = "tiebreak";
    choiceIds = [];
    publish();
    return;
  }
  screen = "play";
  shuffleCurrentQuestion();
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

export function submitTiebreak(given: string) {
  if (screen !== "tiebreak" || progress.tiebreak) return;
  const normalized = given.replace(/\s/g, "");
  if (!/^\d+$/.test(normalized)) return;
  progress = { ...progress, tiebreak: normalized };
  saveProgress(progress);
  publish();
}

export function finishQuiz() {
  if (!progress.tiebreak) return;
  progress = { ...progress, currentIndex: questions.length, completed: true };
  screen = "result";
  saveProgress(progress);
  publish();
}

export function nextQuestion() {
  const nextIndex = progress.currentIndex + 1;
  if (nextIndex >= questions.length) {
    progress = {
      ...progress,
      currentIndex: questions.length,
      completed: false,
      tiebreak: null,
    };
    screen = "tiebreak";
    choiceIds = [];
    saveProgress(progress);
    publish();
    return;
  }

  progress = { ...progress, currentIndex: nextIndex, completed: false };
  saveProgress(progress);
  shuffleCurrentQuestion();
  publish();
}

export function restartQuiz() {
  clearProgress();
  progress = emptyProgress();
  screen = "start";
  choiceIds = [];
  publish();
}
