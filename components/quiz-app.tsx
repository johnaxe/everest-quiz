"use client";

import { useSyncExternalStore } from "react";
import { questions } from "@/data/questions";
import {
  answerQuestion,
  continueQuiz,
  finishQuiz,
  getServerSnapshot,
  getSnapshot,
  nextQuestion,
  restartQuiz,
  startFresh,
  submitTiebreak,
  subscribe,
} from "@/lib/quiz-store";
import { QuestionView } from "@/components/question-view";
import { ResultScreen } from "@/components/result-screen";
import { StartScreen } from "@/components/start-screen";
import { TiebreakView } from "@/components/tiebreak-view";

export function QuizApp() {
  const view = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!view.ready) {
    return <div className="min-h-dvh bg-[#071018]" aria-hidden="true" />;
  }

  if (view.screen === "start") {
    const inProgress = view.progress.answers.length > 0 && !view.progress.completed;
    return (
      <StartScreen
        questionCount={questions.length}
        inProgress={inProgress}
        onStart={inProgress ? continueQuiz : startFresh}
        onRestart={startFresh}
      />
    );
  }

  if (view.screen === "tiebreak") {
    return (
      <TiebreakView
        given={view.progress.tiebreak}
        onAnswer={submitTiebreak}
        onResult={finishQuiz}
      />
    );
  }

  if (view.screen === "result") {
    return (
      <ResultScreen
        answers={view.progress.answers}
        tiebreak={view.progress.tiebreak}
        onRestart={restartQuiz}
      />
    );
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
      choiceIds={view.choiceIds}
      onAnswer={answerQuestion}
      onNext={nextQuestion}
    />
  );
}
