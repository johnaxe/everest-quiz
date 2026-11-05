"use client";

import { useSyncExternalStore } from "react";
import { questions } from "@/data/questions";
import {
  answerQuestion,
  continueQuiz,
  getServerSnapshot,
  getSnapshot,
  nextQuestion,
  restartQuiz,
  startFresh,
  subscribe,
} from "@/lib/quiz-store";
import { QuestionView } from "@/components/question-view";
import { ResultScreen } from "@/components/result-screen";
import { StartScreen } from "@/components/start-screen";

export function QuizApp() {
  const view = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!view.ready) {
    return <div className="min-h-dvh bg-[#071018]" aria-hidden="true" />;
  }

  if (view.screen === "start") {
    const inProgress = view.progress.answers.length > 0 && !view.progress.completed;
    return (
      <StartScreen
        inProgress={inProgress}
        onStart={inProgress ? continueQuiz : startFresh}
        onRestart={startFresh}
      />
    );
  }

  if (view.screen === "result") {
    return <ResultScreen answers={view.progress.answers} onRestart={restartQuiz} />;
  }

  const question = questions[view.progress.currentIndex];
  if (!question) return null;

  return (
    <QuestionView
      key={question.id}
      question={question}
      index={view.progress.currentIndex}
      total={questions.length}
      feedback={view.progress.answers[view.progress.currentIndex] ?? null}
      onAnswer={answerQuestion}
      onNext={nextQuestion}
    />
  );
}
