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

export const hideCorrectAnswer = true;

export const questions: Question[] = [
    {
        id: "because-its-there",
        type: "text",
        match: "fuzzy",
        prompt:
            "Vad svarade George Mallory 1923 när en reporter frågade varför han ville bestiga Everest?",
        answers: [
            "Because it's there",
            "Because it is there",
            "Därför att det finns där",
            "För att det finns där",
            "Därför att det är där",
        ],
        placeholder: "På engelska eller svenska",
        displayAnswer: "Because it's there",
        explanation:
            "Svaret föll i en intervju i New York 1923, året före expeditionen då han och Andrew Irvine försvann.",
    },
    {
        id: "recon-1921",
        type: "choice",
        prompt: "Vad var britternas expedition 1921 i första hand?",
        choices: [
            {
                id: "recon",
                label:
                    "En rekognosering från Tibet, ledd av Charles Howard-Bury",
            },
            { id: "hunt", label: "Ett toppförsök lett av John Hunt" },
            {
                id: "swiss",
                label:
                    "Schweizarnas första försök från Nepal, med Tenzing Norgay",
            },
            { id: "wilson", label: "Maurice Wilsons ensamförsök" },
        ],
        correctChoiceId: "recon",
        displayAnswer:
            "En rekognosering från Tibet, ledd av Charles Howard-Bury",
        explanation:
            "1921 års expedition skulle hitta en väg, inte slå höjdrekord. Mallory var med och gav dalen ovanför isfallet namnet Western Cwm.",
    },
    {
        id: "avalanche-1922",
        type: "choice",
        prompt: "Vad hände den 7 juni 1922, under britternas andra expedition?",
        choices: [
            {
                id: "avalanche",
                label: "En lavin under North Col dödade sju sherpas",
            },
            {
                id: "odell",
                label: "Noel Odell såg Mallory och Irvine för sista gången",
            },
            {
                id: "norton",
                label: "Edward Norton ensam satte höjdrekord i Great Couloir",
            },
            {
                id: "axe",
                label: "Percy Wyn-Harris hittade Andrew Irvines isyxa",
            },
        ],
        correctChoiceId: "avalanche",
        displayAnswer: "En lavin under North Col dödade sju sherpas",
        explanation:
            "Mallory ledde ett lag ner från North Col när en lavin drog med sig gruppen. Sju sherpas dog. Det var de första klättringsdödsfallen på Everest.",
    },
    {
        id: "mallory-irvine-date",
        type: "text",
        match: "date",
        prompt:
            "Vilket datum sågs George Mallory och Andrew Irvine för sista gången 1924?",
        answers: ["8 juni 1924"],
        date: { year: 1924, month: 6, day: 8 },
        placeholder: "t.ex. 14 juli 1789",
        displayAnswer: "8 juni 1924",
        explanation:
            "De lämnade lägret högt på nordsidan den morgonen. Om de nådde toppen är fortfarande obesvarat.",
    },
    {
        id: "odell",
        type: "text",
        match: "fuzzy",
        prompt: "Vem var den siste som såg Mallory och Irvine i livet?",
        answers: ["Noel Odell", "Odell"],
        placeholder: "För- och efternamn",
        displayAnswer: "Noel Odell",
        explanation:
            "Klockan 12.50 den 8 juni 1924 såg geologen Noel Odell två gestalter på ryggen, nära foten av topppyramiden. Sedan drog molnen ihop sig.",
    },
    {
        id: "irvine-axe",
        type: "choice",
        prompt:
            "Vad hittade Percy Wyn-Harris högt på nordsidan under britternas expedition 1933?",
        choices: [
            { id: "axe", label: "Andrew Irvines isyxa" },
            { id: "body", label: "George Mallorys kropp" },
            { id: "camera", label: "Kameran som Mallory haft med sig" },
            { id: "summit", label: "Spår av att de hade nått toppen" },
        ],
        correctChoiceId: "axe",
        displayAnswer: "Andrew Irvines isyxa",
        explanation:
            "Isyxan låg på omkring 8 460 meters höjd. Mallorys kropp hittades först 1999, av Conrad Anker. Kameran är fortfarande borta.",
    },
    {
        id: "maurice-wilson",
        type: "text",
        match: "fuzzy",
        prompt:
            "Vad hette britten som 1934 dog på berget efter att ha försökt ta sig upp nästan på egen hand?",
        answers: ["Maurice Wilson"],
        placeholder: "För- och efternamn",
        displayAnswer: "Maurice Wilson",
        explanation:
            "Maurice Wilson lärde sig flyga, tog sig till Indien och gick in mot Rongbuk. Han dog 1934. Året därpå fann Eric Shiptons expedition kvarlevorna nära North Col.",
    },
    {
        id: "tenzing-1935",
        type: "text",
        match: "exact",
        prompt:
            "Vilket år var Tenzing Norgay med på en Everest-expedition för första gången?",
        answers: ["1935"],
        placeholder: "ett årtal",
        displayAnswer: "1935",
        explanation:
            "Han togs med i sista stund på Eric Shiptons rekognosering 1935, sedan två andra bärare underkänts i läkarundersökningen. 1953 var hans sjunde färd till berget.",
    },
    {
        id: "lambert-1952",
        type: "choice",
        prompt:
            "Med vem nådde Tenzing Norgay en ny höjdrekord på sydöstkammen under schweizarnas vårexpedition 1952?",
        choices: [
            { id: "lambert", label: "Raymond Lambert" },
            { id: "hillary", label: "Edmund Hillary" },
            { id: "hunt", label: "John Hunt" },
            { id: "shipton", label: "Eric Shipton" },
        ],
        correctChoiceId: "lambert",
        displayAnswer: "Raymond Lambert",
        explanation:
            "Lambert och Tenzing kom upp kring 8 600 meter den 28 maj 1952, högre än någon bekräftat hade varit. Syret tog slut och de vände.",
    },
    {
        id: "hunt-1953",
        type: "choice",
        prompt: "Vem ledde den brittiska expeditionen 1953?",
        choices: [
            { id: "shipton", label: "Eric Shipton" },
            { id: "hunt", label: "John Hunt" },
            { id: "wyss", label: "Edouard Wyss-Dunant" },
            { id: "howard-bury", label: "Charles Howard-Bury" },
        ],
        correctChoiceId: "hunt",
        displayAnswer: "John Hunt",
        explanation:
            "Överste John Hunt fick ledarskapet. Eric Shipton hade lett rekognoseringen från Nepal 1951, men valdes bort inför toppförsöket.",
    },
    {
        id: "summit-1953",
        type: "text",
        match: "date",
        prompt: "Vilket datum nådde Edmund Hillary och Tenzing Norgay toppen?",
        answers: ["29 maj 1953"],
        date: { year: 1953, month: 5, day: 29 },
        placeholder: "t.ex. 14 juli 1789",
        displayAnswer: "29 maj 1953",
        explanation:
            "De stod på toppen den 29 maj 1953, omkring klockan 11.30. De stannade ungefär en kvart.",
    },
    {
        id: "summit-photo",
        type: "choice",
        prompt:
            "Vem syns på det enda fotografiet av en person på toppen från den 29 maj 1953?",
        choices: [
            { id: "tenzing", label: "Tenzing Norgay, fotograferad av Hillary" },
            { id: "hillary", label: "Edmund Hillary, fotograferad av Tenzing" },
            { id: "both", label: "Båda två, med självutlösare" },
            { id: "hunt", label: "John Hunt, som kom upp senare samma dag" },
        ],
        correctChoiceId: "tenzing",
        displayAnswer: "Tenzing Norgay, fotograferad av Hillary",
        explanation:
            "Hillary tog bilden av Tenzing med isyxan och flaggorna. Någon motsvarande bild på Hillary från toppen finns inte. Tenzing skrev senare att Hillary avböjde att bli fotograferad.",
    },
    {
        id: "george-lowe",
        type: "text",
        match: "fuzzy",
        prompt:
            "Vem mötte de först på nervägen, och fick höra Hillary säga att de hade knäckt besten?",
        answers: ["George Lowe", "Lowe"],
        placeholder: "För- och efternamn",
        displayAnswer: "George Lowe",
        explanation:
            'Nyzeeländaren George Lowe kom upp med varm soppa. Hillarys hälsning blev: "Well, George, we knocked the bastard off."',
    },
    {
        id: "george-medal",
        type: "choice",
        prompt:
            "Vilken brittisk utmärkelse fick Tenzing Norgay efter bestigningen 1953?",
        choices: [
            { id: "george", label: "George Medal" },
            { id: "knight", label: "Han adlades till sir, precis som Hillary" },
            { id: "vc", label: "Victoria Cross" },
            { id: "george-cross", label: "George Cross" },
        ],
        correctChoiceId: "george",
        displayAnswer: "George Medal",
        explanation:
            "Hillary och Hunt adlades. Tenzing fick George Medal av drottningen, inte det högre George Cross, och därtill utmärkelser från både Nepal och Indien. Något sir-namn blev det inte.",
    },
    {
        id: "north-side-1960",
        type: "choice",
        prompt:
            "Vilken expedition tillskrivs den första bestigningen från Tibets nordsida?",
        choices: [
            { id: "chinese", label: "Den kinesiska expeditionen 1960" },
            {
                id: "british-1924",
                label: "Britterna 1924, med Mallory och Irvine",
            },
            { id: "swiss", label: "Schweizarna 1952" },
            { id: "american", label: "Amerikanerna 1963" },
        ],
        correctChoiceId: "chinese",
        displayAnswer: "Den kinesiska expeditionen 1960",
        explanation:
            "Wang Fuzhou, Gonpo och Qu Yinhua nådde toppen den 25 maj 1960 via nordryggen. Britternas försök 1921–1938 hade alla gjorts från samma sida, utan bekräftad topp.",
    },
    {
        id: "traverse-1963",
        type: "choice",
        prompt: "Vad gjorde Willi Unsoeld och Tom Hornbein den 22 maj 1963?",
        choices: [
            {
                id: "traverse",
                label:
                    "De gick upp västkammen och ner sydöstkammen, den första traversen",
            },
            {
                id: "oxygen",
                label: "De gjorde den första bestigningen utan extra syrgas",
            },
            {
                id: "american",
                label: "De blev de första amerikanerna på toppen",
            },
            {
                id: "storm",
                label: "De ledde de expeditioner som fastnade i stormen 1996",
            },
        ],
        correctChoiceId: "traverse",
        displayAnswer:
            "De gick upp västkammen och ner sydöstkammen, den första traversen",
        explanation:
            "Unsoeld och Hornbein kom över toppen från västkammen och gick ner den vanliga sydleden. Jim Whittaker hade redan blivit förste amerikan på toppen den 1 maj samma år.",
    },
    {
        id: "junko-tabei",
        type: "text",
        match: "fuzzy",
        prompt: "Vem blev först av alla kvinnor att nå toppen?",
        answers: ["Junko Tabei", "Tabei"],
        placeholder: "För- och efternamn",
        displayAnswer: "Junko Tabei",
        explanation:
            "Junko Tabei från Japan nådde toppen den 16 maj 1975. En lavin hade träffat lägret högre upp på berget några dagar tidigare, och hon gick vidare ändå.",
    },
    {
        id: "no-oxygen",
        type: "choice",
        prompt:
            "Vilka gjorde den första bestigningen av Everest utan extra syrgas?",
        choices: [
            {
                id: "karl-oelz",
                label: "Reinhard Karl och Oswald Oelz, 1978",
            },
            {
                id: "engl-mack",
                label: "Hans Engl och Sepp Mack, 1978",
            },
            {
                id: "messner-habeler",
                label: "Reinhold Messner och Peter Habeler, 1978",
            },
            { id: "messner-solo", label: "Reinhold Messner, solo 1980" },
        ],
        correctChoiceId: "messner-habeler",
        displayAnswer: "Reinhold Messner och Peter Habeler, 1978",
        explanation:
            "Messner och Habeler nådde toppen utan tuber den 8 maj 1978. Reinhard Karl och Oswald Oelz stod där samma vår, men med syrgas. Messners solotur i augusti 1980 var den första ensambestigningen, också utan syrgas.",
    },
    {
        id: "first-winter",
        type: "choice",
        prompt:
            "Vilka två klättrare gjorde den första vinterbestigningen, den 17 februari 1980?",
        choices: [
            {
                id: "kukuczka-czok",
                label: "Jerzy Kukuczka och Andrzej Czok",
            },
            { id: "messner", label: "Reinhold Messner och Peter Habeler" },
            { id: "polish", label: "Leszek Cichy och Krzysztof Wielicki" },
            {
                id: "lookalike",
                label: "Leszek Cichocki och Krzysztof Wieliczka",
            },
        ],
        correctChoiceId: "polish",
        displayAnswer: "Leszek Cichy och Krzysztof Wielicki",
        explanation:
            "Cichy och Wielicki nådde toppen under den polska vinterexpeditionen. Det var första gången något av de fjorton berg över 8 000 meter bestigits på vintern. Kukuczka och Czok stod på toppen den 19 maj samma år, via sydpelaren.",
    },
    {
        id: "disaster-1996",
        type: "text",
        match: "exact",
        prompt:
            "Vilket år dog guiderna Rob Hall och Scott Fischer i den storm på Everest som senare skildrades i Into Thin Air?",
        answers: ["1996"],
        placeholder: "ett årtal",
        displayAnswer: "1996",
        explanation:
            "Stormen slog till den 10–11 maj 1996. Flera klättrare från Halls och Fischers expeditioner kom aldrig ner. Jon Krakauer skrev om dygnet i Into Thin Air.",
    },
];

export const tiebreaker = {
    id: "deaths-since-1921",
    prompt: "Hur många har mist livet i sitt försök att bestiga Everest (officiell siffra)?",
    rule: "Närmast vinner",
    answer: 344,
    placeholder: "Ett antal",
    explanation:
        "Himalayan Database räknar 344 dödsfall från 1921 års expedition till och med våren 2026. Där ingår båda sidor av berget, klättrare och anställda, även dödsfall i baslägret.",
};

export function tiebreakSummary(given: string): string {
    const distance = Math.abs(Number(given) - tiebreaker.answer);
    if (distance === 0) return "Mitt i prick.";
    return `Du var ${distance} ifrån.`;
}

export function formatGiven(question: Question, given: string): string {
    if (question.type === "choice") {
        return (
            question.choices.find((choice) => choice.id === given)?.label ??
            given
        );
    }
    return given;
}
