// TS Ignore to ignore a prompt that this should include an 'import'/'export' to look like a module
// @ts-ignore
import {
    ARPEGGIO_OCTAVES,
    CHROMATIC_MINOR_THIRDS_OCTAVES,
    CHROMATIC_THIRD_APART_OCTAVES,
    DIATONIC_OCTAVES,
    LEGATO_SCALES_OCTAVES, WHOLE_TONE_SCALE_OCTAVES
} from "./consts";

const OUTPUT_HTML_ELEMENT_ID = "scalesOutput"
const OUTPUT_DETAILS_SPAN_STYLE = "font-size: 65%;"

// Tempi
const ARPEGGIO_TEMPO = 66
const CHROMATIC_MINOR_THIRDS_TEMPO = 54
const OCTAVES_SCALE_TEMPO = 88
const SIXTHS_APART_SCALE_TEMPO = 60
const LEGATO_SCALES_THIRDS_TEMPO = 52

enum NOTE {
    C = 'C',
    D_FLAT = 'C♯/D♭',
    D = 'D',
    E_FLAT = 'E♭',
    E = 'E',
    F = 'F',
    F_SHARP = 'F♯',
    G = 'G',
    A_FLAT = 'G♯/A♭',
    A = 'A',
    B_FLAT = 'B♭',
    B = 'B'
}
const ALL_NOTES = (Object.keys(NOTE) as (keyof typeof NOTE)[]).map(x => x as NOTE)
const STANDARD_STARTING_NOTES = [NOTE.C, NOTE.E_FLAT, NOTE.F_SHARP, NOTE.A]

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
        super('Third apart', "Hands together", startingNotes, style, NON_DIATONIC_SCALE_MODE.CHROMATIC, CHROMATIC_THIRD_APART_OCTAVES, SIXTHS_APART_SCALE_TEMPO, 'Chromatic scale a third apart')
        this.startingNotes = startingNotes
    }
}

const diatonicScaleIntervals = ['Octave apart', 'Third apart', 'Sixth apart']; // TODO enum

const diatonicScalesOctaveApart = STANDARD_STARTING_NOTES.map(startingNote =>
    (Object.keys(DIATONIC_SCALE_MODE) as (keyof typeof DIATONIC_SCALE_MODE)[]).map(mode =>
        BOTH_STYLES.map(style =>
            new DiatonicScaleOctaves(
                    'Octave apart', startingNote, style, DIATONIC_SCALE_MODE[mode], OCTAVES_SCALE_TEMPO)
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

const wholeToneScale = new Scale('Octave apart', "Hands together", NOTE.E,  STYLE.LEGATO, NON_DIATONIC_SCALE_MODE.WHOLE_TONE, OCTAVES_SCALE_TEMPO, WHOLE_TONE_SCALE_OCTAVES,'Whole-tone scale')

const allScales = [diatonicScalesOctaveApart, legatoScalesInThirds, chromaticScaleMinorThirdApart, chromaticScaleInMinorThirds, wholeToneScale]

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
        `Style: ${exercise.style.toLowerCase()}`
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
    ].map(x => `<span style="${OUTPUT_DETAILS_SPAN_STYLE}">${x}</span>`)

    const formattedElement = mainInfo.concat(arpeggioInfo).concat(extraInfo).join('<br/>')

    // @ts-ignore
    document.getElementById(OUTPUT_HTML_ELEMENT_ID).innerHTML = formattedElement;
}

const showRandomScale = () => showRandomExercise(randomFingerExercise(allScales))
const showRandomArpeggio = () => showRandomExercise(randomFingerExercise(allArpeggi))
// exported so they aren't automatically deleted by the transpiler
module.exports = {showRandomScale, showRandomArpeggio}
