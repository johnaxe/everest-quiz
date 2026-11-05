import type { Question } from "@/data/questions";

const MONTHS: Record<string, number> = {
  januari: 1,
  jan: 1,
  februari: 2,
  feb: 2,
  mars: 3,
  mar: 3,
  april: 4,
  apr: 4,
  maj: 5,
  may: 5,
  juni: 6,
  jun: 6,
  june: 6,
  juli: 7,
  jul: 7,
  july: 7,
  augusti: 8,
  aug: 8,
  august: 8,
  september: 9,
  sep: 9,
  sept: 9,
  oktober: 10,
  okt: 10,
  october: 10,
  november: 11,
  nov: 11,
  december: 12,
  dec: 12,
};

export function normalize(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^\p{L}\p{N}\s]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function normalizeExact(input: string): string {
  let value = input.toLowerCase().trim().replace(/meter|metres|meters/g, "");
  value = value.replace(/\s/g, "").replace(/m$/, "");
  if (/^\d{1,2}\.\d{3},\d+$/.test(value)) {
    value = value.replace(".", "").replace(",", ".");
  } else {
    value = value.replace(",", ".");
  }
  return value;
}

function levenshtein(left: string, right: string): number {
  if (left === right) return 0;
  if (left.length === 0) return right.length;
  if (right.length === 0) return left.length;

  let previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let i = 1; i <= left.length; i++) {
    const current = [i];
    for (let j = 1; j <= right.length; j++) {
      const cost = left[i - 1] === right[j - 1] ? 0 : 1;
      current[j] = Math.min(
        current[j - 1] + 1,
        previous[j] + 1,
        previous[j - 1] + cost,
      );
    }
    previous = current;
  }
  return previous[right.length];
}

function tokenKey(value: string): string {
  return value.split(" ").filter(Boolean).sort().join(" ");
}

function fuzzyEquals(input: string, accepted: string): boolean {
  const normalizedInput = normalize(input);
  const normalizedAccepted = normalize(accepted);
  if (!normalizedInput || !normalizedAccepted) return false;

  const threshold = normalizedAccepted.replace(/ /g, "").length > 6 ? 2 : 1;
  const distances = [
    levenshtein(normalizedInput, normalizedAccepted),
    levenshtein(
      normalizedInput.replace(/ /g, ""),
      normalizedAccepted.replace(/ /g, ""),
    ),
    levenshtein(tokenKey(normalizedInput), tokenKey(normalizedAccepted)),
  ];
  return Math.min(...distances) <= threshold;
}

function parseDate(input: string): { year: number; month: number; day: number } | null {
  const value = normalize(input);
  const iso = value.match(/^(\d{4})\s(\d{1,2})\s(\d{1,2})$/);
  if (iso) {
    return { year: Number(iso[1]), month: Number(iso[2]), day: Number(iso[3]) };
  }

  const numeric = value.match(/^(\d{1,2})\s(\d{1,2})\s(\d{4})$/);
  if (numeric) {
    return {
      year: Number(numeric[3]),
      month: Number(numeric[2]),
      day: Number(numeric[1]),
    };
  }

  const dayMonth = value.match(/^(\d{1,2})(?:\se)?\s([a-z]+)\s(\d{4})$/);
  if (dayMonth && MONTHS[dayMonth[2]]) {
    return {
      year: Number(dayMonth[3]),
      month: MONTHS[dayMonth[2]],
      day: Number(dayMonth[1]),
    };
  }

  const monthDay = value.match(/^([a-z]+)\s(\d{1,2})\s(\d{4})$/);
  if (monthDay && MONTHS[monthDay[1]]) {
    return {
      year: Number(monthDay[3]),
      month: MONTHS[monthDay[1]],
      day: Number(monthDay[2]),
    };
  }

  return null;
}

export function isCorrectAnswer(question: Question, given: string): boolean {
  if (question.type === "choice") {
    return given === question.correctChoiceId;
  }

  if (question.match === "date" && question.date) {
    const parsed = parseDate(given);
    return (
      parsed?.year === question.date.year &&
      parsed.month === question.date.month &&
      parsed.day === question.date.day
    );
  }

  if (question.match === "exact") {
    const normalized = normalizeExact(given);
    return question.answers.some((answer) => normalizeExact(answer) === normalized);
  }

  return question.answers.some((answer) => fuzzyEquals(given, answer));
}
