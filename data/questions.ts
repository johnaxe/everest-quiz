export type Choice = {
  id: string;
  label: string;
};

type QuestionBase = {
  id: string;
  prompt: string;
  explanation: string;
  displayAnswer: string;
};

export type ChoiceQuestion = QuestionBase & {
  type: "choice";
  choices: Choice[];
  correctChoiceId: string;
};

export type TextQuestion = QuestionBase & {
  type: "text";
  match: "date" | "exact" | "fuzzy";
  answers: string[];
  date?: { year: number; month: number; day: number };
  placeholder: string;
};

export type Question = ChoiceQuestion | TextQuestion;

export const questions: Question[] = [
  {
    id: "summit-date",
    type: "text",
    match: "date",
    prompt:
      "Vilket datum nådde Edmund Hillary och Tenzing Norgay toppen för första gången?",
    answers: ["29 maj 1953"],
    date: { year: 1953, month: 5, day: 29 },
    placeholder: "t.ex. 29 maj 1953",
    displayAnswer: "29 maj 1953",
    explanation:
      "De stod på toppen den 29 maj 1953, omkring klockan 11.30 lokal tid, via sydöstkammen från Nepal.",
  },
  {
    id: "expedition-leader",
    type: "choice",
    prompt: "Vem ledde den brittiska expeditionen 1953?",
    choices: [
      { id: "shipton", label: "Eric Shipton" },
      { id: "hunt", label: "John Hunt" },
      { id: "mallory", label: "George Mallory" },
      { id: "bonington", label: "Chris Bonington" },
    ],
    correctChoiceId: "hunt",
    displayAnswer: "John Hunt",
    explanation:
      "Överste John Hunt ledde expeditionen. Eric Shipton hade lett tidigare rekognoseringar men fick inte ledarskapet 1953.",
  },
  {
    id: "times-correspondent",
    type: "text",
    match: "fuzzy",
    prompt:
      "Vad hette The Times-korrespondenten som följde med expeditionen 1953? Både dåvarande och senare namn godkänns.",
    answers: ["James Morris", "Jan Morris"],
    placeholder: "För- och efternamn",
    displayAnswer: "James Morris (senare Jan Morris)",
    explanation:
      "James Morris, senare Jan Morris, var ensam journalist på berget. En kodad depesch nådde London lagom till kröningen den 2 juni.",
  },
  {
    id: "official-height",
    type: "text",
    match: "exact",
    prompt:
      "Vilken officiell höjd i meter fick Mount Everest efter Nepal och Kinas gemensamma mätning 2020?",
    answers: ["8848.86"],
    placeholder: "8848,86",
    displayAnswer: "8 848,86 m",
    explanation:
      "Den 8 december 2020 meddelade Nepal och Kina höjden 8 848,86 meter. Den äldre rundningen 8 848 meter räcker inte här.",
  },
  {
    id: "khumbu",
    type: "choice",
    prompt:
      "Vilken passage måste sydvägen från Nepal korsa mellan baslägret och Camp I?",
    choices: [
      { id: "khumbu", label: "Khumbu-isfallet" },
      { id: "rongbuk", label: "Rongbuk-glaciären" },
      { id: "south-col", label: "South Col" },
      { id: "cwm", label: "Western Cwm" },
    ],
    correctChoiceId: "khumbu",
    displayAnswer: "Khumbu-isfallet",
    explanation:
      "Khumbu-isfallet är den sprickiga glaciären strax ovanför baslägret. Western Cwm kommer först därefter, och South Col är sadeln vid Camp IV.",
  },
  {
    id: "nepali-name",
    type: "text",
    match: "fuzzy",
    prompt: "Vad heter Mount Everest på nepalesiska?",
    answers: ["Sagarmatha"],
    placeholder: "Namnet",
    displayAnswer: "Sagarmatha",
    explanation:
      "Sagarmatha är det nepalesiska namnet och brukar översättas som himlens panna.",
  },
  {
    id: "tibetan-name",
    type: "text",
    match: "fuzzy",
    prompt: "Vad heter Mount Everest på tibetanska?",
    answers: [
      "Chomolungma",
      "Qomolangma",
      "Chomolangma",
      "Jomolungma",
      "Chomo Lungma",
      "Qomo Langma",
    ],
    placeholder: "Namnet",
    displayAnswer: "Chomolungma (Qomolangma)",
    explanation:
      "Chomolungma, även stavat Qomolangma, betyder ungefär världens gudomliga moder.",
  },
  {
    id: "no-oxygen",
    type: "choice",
    prompt: "Vilka gjorde den första bestigningen av Everest utan extra syrgas?",
    choices: [
      { id: "hillary", label: "Edmund Hillary och Tenzing Norgay, 1953" },
      { id: "winter", label: "Leszek Cichy och Krzysztof Wielicki, 1980" },
      { id: "messner-habeler", label: "Reinhold Messner och Peter Habeler, 1978" },
      { id: "messner-solo", label: "Reinhold Messner, solo 1980" },
    ],
    correctChoiceId: "messner-habeler",
    displayAnswer: "Reinhold Messner och Peter Habeler, 1978",
    explanation:
      "Messner och Habeler nådde toppen utan tuber den 8 maj 1978. Messners solotur 1980 var den första solobestigningen, också utan syrgas.",
  },
  {
    id: "first-woman",
    type: "text",
    match: "fuzzy",
    prompt: "Vem blev först av alla kvinnor att nå toppen?",
    answers: ["Junko Tabei"],
    placeholder: "För- och efternamn",
    displayAnswer: "Junko Tabei",
    explanation: "Junko Tabei från Japan nådde toppen den 16 maj 1975.",
  },
  {
    id: "first-winter",
    type: "choice",
    prompt: "Vilka gjorde den första vinterbestigningen av Everest?",
    choices: [
      { id: "tabei", label: "Junko Tabei och Ang Tsering, 16 maj 1975" },
      { id: "polish", label: "Leszek Cichy och Krzysztof Wielicki, 17 februari 1980" },
      { id: "messner", label: "Reinhold Messner och Peter Habeler, 8 maj 1978" },
      { id: "chinese", label: "Wang Fuzhou, Gonpo och Qu Yinhua, 1960" },
    ],
    correctChoiceId: "polish",
    displayAnswer: "Leszek Cichy och Krzysztof Wielicki, 17 februari 1980",
    explanation:
      "Den polska vinterexpeditionen lyckades den 17 februari 1980, med Cichy och Wielicki på toppen.",
  },
];

export function formatGiven(question: Question, given: string): string {
  if (question.type === "choice") {
    return question.choices.find((choice) => choice.id === given)?.label ?? given;
  }
  return given;
}
