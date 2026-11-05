import { useState, type FormEvent } from "react";
import type { Question } from "@/data/questions";
import type { StoredAnswer } from "@/lib/storage";

type QuestionViewProps = {
  question: Question;
  index: number;
  total: number;
  feedback: StoredAnswer | null;
  onAnswer: (given: string) => void;
  onNext: () => void;
};

export function QuestionView({
  question,
  index,
  total,
  feedback,
  onAnswer,
  onNext,
}: QuestionViewProps) {
  const [draft, setDraft] = useState("");
  const answered = feedback !== null;
  const progress = ((index + (answered ? 1 : 0)) / total) * 100;
  const canSubmit = draft.trim().length > 0;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (answered || !canSubmit) return;
    onAnswer(question.type === "text" ? draft.trim() : draft);
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-lg flex-col px-5 pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(1.25rem,env(safe-area-inset-bottom))]">
      <p className="text-sm font-medium text-slate-600">
        Fråga {index + 1} av {total}
      </p>
      <div
        className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={index + 1}
        aria-label="Frågeförlopp"
      >
        <div className="h-full rounded-full bg-slate-900" style={{ width: `${progress}%` }} />
      </div>

      <form onSubmit={submit} className="mt-8 flex flex-1 flex-col">
        <h1 className="text-2xl leading-snug font-semibold tracking-tight text-slate-950">
          {question.prompt}
        </h1>

        {question.type === "choice" ? (
          <div className="mt-6 flex flex-col gap-3" role="radiogroup" aria-label="Svarsalternativ">
            {question.choices.map((choice) => {
              const selected = (feedback?.given ?? draft) === choice.id;
              const isCorrectChoice = choice.id === question.correctChoiceId;
              let tone = "border-slate-200 bg-white text-slate-950";
              if (!answered && selected) tone = "border-slate-950 bg-slate-950 text-white";
              if (answered && isCorrectChoice) tone = "border-emerald-700 bg-emerald-50 text-emerald-950";
              if (answered && selected && !isCorrectChoice) {
                tone = "border-rose-700 bg-rose-50 text-rose-950";
              }
              return (
                <button
                  key={choice.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  disabled={answered}
                  onClick={() => setDraft(choice.id)}
                  className={`min-h-14 rounded-2xl border px-4 py-3 text-left text-base leading-snug font-medium ${tone}`}
                >
                  {choice.label}
                </button>
              );
            })}
          </div>
        ) : (
          <label className="mt-6 block">
            <span className="sr-only">Ditt svar</span>
            <input
              value={feedback ? feedback.given : draft}
              onChange={(event) => setDraft(event.target.value)}
              disabled={answered}
              placeholder={question.placeholder}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              enterKeyHint="done"
              className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-lg text-slate-950 outline-none focus:border-slate-950 disabled:bg-slate-50"
            />
          </label>
        )}

        <div className="mt-auto pt-8">
          {feedback ? (
            <div aria-live="polite" className="flex flex-col gap-4">
              <div
                className={`rounded-2xl px-4 py-4 ${
                  feedback.correct ? "bg-emerald-50 text-emerald-950" : "bg-rose-50 text-rose-950"
                }`}
              >
                <p className="text-lg font-semibold">{feedback.correct ? "Rätt" : "Fel"}</p>
                <p className="mt-1 text-base">Rätt svar: {question.displayAnswer}</p>
                <p className="mt-2 text-base leading-relaxed">{question.explanation}</p>
              </div>
              <button
                type="button"
                onClick={onNext}
                className="h-14 rounded-2xl bg-slate-950 text-lg font-semibold text-white"
              >
                {index === total - 1 ? "Se resultat" : "Nästa"}
              </button>
            </div>
          ) : (
            <button
              type="submit"
              disabled={!canSubmit}
              className="h-14 w-full rounded-2xl bg-slate-950 text-lg font-semibold text-white disabled:bg-slate-300"
            >
              Svara
            </button>
          )}
        </div>
      </form>
    </main>
  );
}
