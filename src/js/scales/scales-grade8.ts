// This is all in one file because I couldn't work out how to link it up with the HTML in separate files.

const DIATONIC_OCTAVES = 4
const DIATONIC_OCTAVES_SCALE_TEMPO = 88
const DIATONIC_SIXTH_THIRDS_SCALE_TEMPO = 63
const LEGATO_SCALES_THIRDS_TEMPO = 52
const LEGATO_SCALES_OCTAVES = 2
const CHROMATIC_THIRD_APART_OCTAVES = 4
const CHROMATIC_THIRD_APART_TEMPO = 76
const CHROMATIC_MINOR_THIRDS_OCTAVES = 2
const CHROMATIC_MINOR_THIRDS_TEMPO = 52
const WHOLE_TONE_SCALE_OCTAVES = 2
const WHOLE_TONE_SCALE_TEMPO = 88

const ARPEGGIO_OCTAVES = 4
const ARPEGGIO_TEMPO = 66

enum NOTE {
    C = 'C',
    D_FLAT = 'C♯/D♭',
    D = 'D',
    E_FLAT = 'E♭',
    E = 'E',
    F = 'F',
    G_FLAT = 'F♯/G♭',
    G = 'G',
    A_FLAT = 'G♯/A♭',
    A = 'A',
    B_FLAT = 'B♭',
    B = 'B'
}
const ALL_NOTES = (Object.keys(NOTE) as (keyof typeof NOTE)[]).map(x => x as NOTE)
const STANDARD_STARTING_NOTES = [NOTE.C, NOTE.D, NOTE.B, NOTE.G_FLAT, NOTE.F, NOTE.E_FLAT, NOTE.A_FLAT, NOTE.D_FLAT]

enum STYLE {
    LEGATO = "Legato",
    STACCATO = "Staccato"
}

const BOTH_STYLES = (Object.keys(STYLE) as (keyof typeof STYLE)[]).map(x => x as STYLE)

enum ARPEGGIO_MODE {
    MAJOR= "major",
    MINOR = "minor",
    DIMINISHED_SEVENTH = "diminished seventh"
}

enum DIATONIC_SCALE_MODE {
    MAJOR = "major",
    MINOR_HARMONIC = "minor harmonic",
    MINOR_MELODIC = "minor melodic"
}

enum NON_DIATONIC_SCALE_MODE {
    CHROMATIC = "chromatic",
    WHOLE_TONE = "whole tone"
}

class FingerExercise {
    interval: string
    hands: string
    octaves: number
    style: STYLE
    tempo: number
    type: string
    constructor(interval: string, hands: string, octaves: number, style: STYLE, tempo: number, type: string) {
        this.interval = interval
        this.hands = hands
        this.octaves = octaves
        this.style = style
        this.tempo = tempo
        this.type = type
    }
}

class Arpeggio extends FingerExercise {
    inversion: string
    mode: ARPEGGIO_MODE
    startingNote?: NOTE
    constructor(inversion: string, mode: ARPEGGIO_MODE, type: string, startingNote?: NOTE) {
        super('Octave apart', 'Hands together', ARPEGGIO_OCTAVES, STYLE.LEGATO, ARPEGGIO_TEMPO, type)
        this.mode = mode
        this.inversion = inversion
        this.startingNote = startingNote
    }
}

class DominantSeventh extends Arpeggio {
    key: string
    mode: ARPEGGIO_MODE
    constructor(key: string) {
        super('Root', ARPEGGIO_MODE.MAJOR, 'Dominant seventh', undefined)
        this.key = key
        this.mode = ARPEGGIO_MODE.MAJOR
    }
}

class Scale extends FingerExercise {
    mode: DIATONIC_SCALE_MODE | NON_DIATONIC_SCALE_MODE
    startingNote: NOTE | NOTE[]
    type: string
    hands: string
    constructor(interval: string, hands: string, startingNote: NOTE |  NOTE[], style: STYLE, mode: DIATONIC_SCALE_MODE | NON_DIATONIC_SCALE_MODE, octaves: number, tempo: number, type: string) {
        super(interval, 'Hands together', DIATONIC_OCTAVES, style, tempo, type)
        this.mode = mode
        this.startingNote = startingNote
        this.type = type
        this.hands = hands
    }
}

class DiatonicScaleOctaves extends Scale {
    constructor(interval: string, startingNote: NOTE, style: STYLE, mode: DIATONIC_SCALE_MODE, tempo: number) {
        super(interval, 'Hands together', startingNote, style, mode, DIATONIC_OCTAVES, tempo, 'Scale in octaves')
        this.mode = mode
    }
}

class DiatonicScaleThirds extends Scale {
    mode: DIATONIC_SCALE_MODE
    startingNotes: NOTE[]
    constructor(startingNotes: NOTE[]) {
        super('Third apart', 'Hands separately', startingNotes, STYLE.LEGATO, DIATONIC_SCALE_MODE.MAJOR, LEGATO_SCALES_OCTAVES, LEGATO_SCALES_THIRDS_TEMPO, 'Scale a third apart')
        this.mode = DIATONIC_SCALE_MODE.MAJOR
        this.startingNotes = startingNotes
    }
}

class ChromaticScaleThirds extends Scale {
    startingNotes: NOTE[]
    constructor(startingNotes: NOTE[], hands: string) {
        super('Third apart', hands, startingNotes, STYLE.LEGATO, NON_DIATONIC_SCALE_MODE.CHROMATIC, CHROMATIC_MINOR_THIRDS_OCTAVES,  CHROMATIC_MINOR_THIRDS_TEMPO, 'Chromatic scale in minor thirds')
        this.startingNotes = startingNotes
        this.mode = NON_DIATONIC_SCALE_MODE.CHROMATIC
    }
}

class ChromaticScaleMinorThirdApart extends Scale {
    mode = NON_DIATONIC_SCALE_MODE.CHROMATIC
    startingNotes: NOTE[]
    constructor(startingNotes: NOTE[], style: STYLE) {
        super('Third apart', "hands together", startingNotes, style, NON_DIATONIC_SCALE_MODE.CHROMATIC, CHROMATIC_THIRD_APART_OCTAVES, CHROMATIC_THIRD_APART_TEMPO, 'Chromatic scale a third apart')
        this.startingNotes = startingNotes
    }
}

class WholeToneScale extends Scale {
    constructor() {
        super('Octave apart', "hands together", NOTE.E,  STYLE.LEGATO, NON_DIATONIC_SCALE_MODE.WHOLE_TONE, WHOLE_TONE_SCALE_TEMPO, WHOLE_TONE_SCALE_OCTAVES,'Whole-tone scale')
    }
}

const diatonicScaleIntervals = ['Octave apart', 'Third apart', 'Sixth apart']; // TODO enum

const diatonicScales = STANDARD_STARTING_NOTES.map(startingNote =>
    (Object.keys(DIATONIC_SCALE_MODE) as (keyof typeof DIATONIC_SCALE_MODE)[]).map(mode =>
        BOTH_STYLES.map(style =>
            diatonicScaleIntervals.map(interval =>
                new DiatonicScaleOctaves(
                    interval, startingNote, style, DIATONIC_SCALE_MODE[mode], interval === 'octave apart' ? DIATONIC_OCTAVES_SCALE_TEMPO : DIATONIC_SIXTH_THIRDS_SCALE_TEMPO)
            )
        )
    )
)

const legatoScalesInThirds = [[NOTE.C, NOTE.E], [NOTE.B_FLAT, NOTE.D]].map(startingNote => new DiatonicScaleThirds(startingNote))

const chromaticScaleInMinorThirds = ['left hand', 'right hand'].map(hand =>
    new ChromaticScaleThirds([NOTE.B_FLAT, NOTE.D_FLAT], hand)
)

const chromaticScaleMinorThirdApart = BOTH_STYLES.map(style => {
    const notePairs = ALL_NOTES.map((n, i, arr) => {
        // a minor third is 3 semitones up
        return [n, ALL_NOTES[(i + 3) % ALL_NOTES.length]]
    })
    return notePairs.map(notes =>
        new ChromaticScaleMinorThirdApart(notes, style)
    )
})

const wholeToneScale = new WholeToneScale()

const allScales = [diatonicScales, legatoScalesInThirds, chromaticScaleMinorThirdApart, chromaticScaleInMinorThirds, wholeToneScale]

const inversions = ['Root', 'First inversion', 'Second inversion'] // TODO enum
const arpeggi = STANDARD_STARTING_NOTES.map(startingNote =>
    (Object.keys(ARPEGGIO_MODE) as Array<keyof typeof ARPEGGIO_MODE>).map(mode =>
        inversions.map(inversion =>
            new Arpeggio(inversion, ARPEGGIO_MODE[mode], 'Arpeggio', startingNote)
        )
    )
)

const dominantSevenths = STANDARD_STARTING_NOTES.map(key => new DominantSeventh(key))

const diminishedSevenths = ALL_NOTES.map(note => new Arpeggio('Root', ARPEGGIO_MODE.DIMINISHED_SEVENTH, 'Diminished seventh', note))

const allArpeggi = [dominantSevenths, diminishedSevenths, arpeggi]

const randomElement = (array: any[]) => array[Math.floor(Math.random() * array.length)];

// Deliberately configured so you're more likely to get an exercise with a shallow tree (e.g. whole-tone) than one of the many normal scales
const randomFingerExercise = (exerciseTree: any[]): any => {
    if (!Array.isArray(exerciseTree)) return exerciseTree
    return randomFingerExercise(randomElement(exerciseTree))
}

const showRandomExercise = (exercise: any) => {
    console.log(JSON.stringify(exercise, null, 4))
    const mainInfo = [
        `Type: ${exercise.type}`,
        `${exercise.startingNote || exercise.key} ${exercise.mode}`,
        `Interval: ${exercise.interval}`,
        `Style: ${exercise.style}`
    ]
    let arpeggioInfo = []
    if (exercise.inversion !== undefined) arpeggioInfo.push(
        `Inversion: ${exercise.inversion}`,
    )
    if (exercise.key !== undefined) arpeggioInfo.push(
        `Key: ${exercise.key}`
    )
    const extraInfo = [
        `${exercise.hands}`,
        `Octaves: ${exercise.octaves}`,
        `Tempo: ${exercise.tempo}`
    ].map(x => `<span style="font-size: 85%;">${x}</span>`)

    const formattedElement = mainInfo.concat(arpeggioInfo).concat(extraInfo).join('<br/>')

    // @ts-ignore
    document.getElementById("scalesOutput").innerHTML = formattedElement;
}

const showRandomScale = () => showRandomExercise(randomFingerExercise(allScales))
const showRandomArpeggio = () => showRandomExercise(randomFingerExercise(allArpeggi))
