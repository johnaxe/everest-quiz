import {
  formatGiven,
  hideCorrectAnswer,
  questions,
  tiebreakSummary,
  tiebreaker,
} from "@/data/questions";
import type { StoredAnswer } from "@/lib/storage";

type ResultScreenProps = {
  answers: StoredAnswer[];
  tiebreak: string | null;
  onRestart: () => void;
};

export function ResultScreen({ answers, tiebreak, onRestart }: ResultScreenProps) {
  const score = answers.filter((answer) => answer.correct).length;
  const review = questions.flatMap((question, index) => {
    const answer = answers[index];
    const correct = answer?.correct ?? false;
    if (hideCorrectAnswer && !correct) return [];
    return [{ question, index, answer, correct }];
  });

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-lg flex-col px-5 pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]">
      <p className="text-sm font-medium tracking-[0.18em] text-slate-600 uppercase">
        Resultat
      </p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-950">
        {score} av {questions.length}
      </h1>
      <p className="mt-2 text-lg text-slate-700">Du fick {score} rätt.</p>
      {tiebreak ? (
        <div className="mt-6 rounded-2xl bg-white px-4 py-4">
          <p className="text-sm font-semibold tracking-[0.18em] text-slate-500 uppercase">
            Utslagsfråga
          </p>
          <p className="mt-2 text-base leading-snug font-medium text-slate-950">
            {tiebreaker.prompt}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">Ditt svar: {tiebreak}</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-700">
            Facit: {tiebreaker.answer}. {tiebreakSummary(tiebreak)}
          </p>
          {hideCorrectAnswer ? (
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{tiebreaker.explanation}</p>
          ) : null}
        </div>
      ) : null}
      <button
        type="button"
        onClick={onRestart}
        className="mt-6 h-14 rounded-2xl bg-slate-950 text-lg font-semibold text-white"
      >
        Spela igen
      </button>

      <ol className="mt-8 flex flex-col gap-3">
        {review.map(({ question, index, answer, correct }) => {
          return (
            <li key={question.id} className="rounded-2xl bg-white px-4 py-4">
              <p className="text-sm font-semibold text-slate-500">
                {index + 1}. {correct ? "Rätt" : "Fel"}
              </p>
              <p className="mt-1 text-base leading-snug font-medium text-slate-950">
                {question.prompt}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                Ditt svar: {answer ? formatGiven(question, answer.given) : "—"}
              </p>
              {!correct ? (
                <p className="mt-1 text-sm leading-relaxed text-slate-700">
                  Rätt svar: {question.displayAnswer}
                </p>
              ) : null}
              {hideCorrectAnswer ? (
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{question.explanation}</p>
              ) : null}
            </li>
          );
        })}
      </ol>
    </main>
  );
}
