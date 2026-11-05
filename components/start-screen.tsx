import Image from "next/image";

const PHOTO_CREDIT =
  "https://commons.wikimedia.org/wiki/File:Mount_Everest_as_seen_from_Drukair2_PLW_edit.jpg";

type StartScreenProps = {
  inProgress: boolean;
  onStart: () => void;
  onRestart: () => void;
};

export function StartScreen({ inProgress, onStart, onRestart }: StartScreenProps) {
  return (
    <section className="relative min-h-dvh">
      <Image
        src="/everest.jpg"
        alt="Mount Everest med en snöplym från toppen, sett från luften"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_40%]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/25" />
      <div className="relative z-10 mx-auto flex min-h-dvh max-w-lg flex-col justify-end px-5 pt-16 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <p className="text-sm font-medium tracking-[0.22em] text-amber-100/80 uppercase">
          10 frågor
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white">
          Everest-quiz
        </h1>
        <p className="mt-3 max-w-md text-lg leading-relaxed text-white/90">
          Svåra frågor om berget och bestigningarna som skrev historia, från
          Hillary och Norgay 1953 och framåt.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          {inProgress ? (
            <>
              <button
                type="button"
                onClick={onStart}
                className="h-14 rounded-2xl bg-amber-300 text-lg font-semibold text-slate-950"
              >
                Fortsätt
              </button>
              <button
                type="button"
                onClick={onRestart}
                className="h-14 rounded-2xl border border-white/40 text-lg font-semibold text-white"
              >
                Börja om
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onStart}
              className="h-14 rounded-2xl bg-amber-300 text-lg font-semibold text-slate-950"
            >
              Starta quiz
            </button>
          )}
        </div>
        <p className="mt-6 text-[11px] leading-snug text-white/70">
          Foto:{" "}
          <a
            href={PHOTO_CREDIT}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-white/40"
          >
            shrimpo1967, bearbetning Papa Lima Whiskey 2
          </a>
          . CC BY-SA 2.0.
        </p>
      </div>
    </section>
  );
}
