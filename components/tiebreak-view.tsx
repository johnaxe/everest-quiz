import { useState, type FormEvent } from "react";
import { hideCorrectAnswer, tiebreakSummary, tiebreaker } from "@/data/questions";

type TiebreakViewProps = {
  given: string | null;
  onAnswer: (given: string) => void;
  onResult: () => void;
};

export function TiebreakView({ given, onAnswer, onResult }: TiebreakViewProps) {
  const [draft, setDraft] = useState("");
  const canSubmit = /^\d+$/.test(draft.replace(/\s/g, ""));

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (given !== null || !canSubmit) return;
    onAnswer(draft.trim());
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-lg flex-col px-5 pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(1.25rem,env(safe-area-inset-bottom))]">
      <p className="text-sm font-medium tracking-[0.18em] text-slate-600 uppercase">
        Utslagsfråga
      </p>
      <p className="mt-2 text-sm font-medium text-slate-600">{tiebreaker.rule}</p>

      <form onSubmit={submit} className="mt-8 flex flex-1 flex-col">
        <h1 className="text-2xl leading-snug font-semibold tracking-tight text-slate-950">
          {tiebreaker.prompt}
        </h1>
        <label className="mt-6 block">
          <span className="sr-only">Ditt svar</span>
          <input
            value={given ?? draft}
            onChange={(event) => setDraft(event.target.value)}
            disabled={given !== null}
            inputMode="numeric"
            placeholder={tiebreaker.placeholder}
            autoComplete="off"
            autoCorrect="off"
            enterKeyHint="done"
            className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-lg text-slate-950 outline-none focus:border-slate-950 disabled:bg-slate-50"
          />
        </label>

        <div className="mt-auto pt-8">
          {given !== null ? (
            <div aria-live="polite" className="flex flex-col gap-4">
              {hideCorrectAnswer ? (
                <p className="text-base text-slate-700">Facit visas i resultatet.</p>
              ) : (
                <div className="rounded-2xl bg-white px-4 py-4 text-slate-950">
                  <p className="text-lg font-semibold">{tiebreakSummary(given)}</p>
                  <p className="mt-1 text-base">Facit: {tiebreaker.answer}</p>
                  <p className="mt-2 text-base leading-relaxed">{tiebreaker.explanation}</p>
                </div>
              )}
              <button
                type="button"
                onClick={onResult}
                className="h-14 rounded-2xl bg-slate-950 text-lg font-semibold text-white"
              >
                Se resultat
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
