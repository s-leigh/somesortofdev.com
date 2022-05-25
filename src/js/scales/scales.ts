import {ALL_NOTES, FingerExercise, NOTE, STANDARD_SCALE_STARTING_NOTES, STYLE} from "./scales-grade8";

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

enum DIATONIC_SCALE_MODE {
    MAJOR,
    MINOR_HARMONIC,
    MINOR_MELODIC
}

enum NON_DIATONIC_SCALE_MODE {
    CHROMATIC,
    WHOLE_TONE
}

type SCALE_MODE = DIATONIC_SCALE_MODE | NON_DIATONIC_SCALE_MODE

const BOTH_STYLES = (Object.keys(STYLE) as (keyof typeof STYLE)[]).map(x => x as STYLE)

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

const diatonicScaleIntervals = ['Octave apart', 'Third apart', 'Sixth apart'];

const diatonicScales = STANDARD_SCALE_STARTING_NOTES.map(startingNote =>
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
    const notePairs = ALL_NOTES.map((n1, i1) => {
        return [n1, ALL_NOTES[i1 % n1.length]]
    })
    return notePairs.map(notes =>
        new ChromaticScaleMinorThirdApart(notes, style)
    )
})


const wholeToneScale = new WholeToneScale()

export const allScales = [diatonicScales, legatoScalesInThirds, chromaticScaleMinorThirdApart, chromaticScaleInMinorThirds, wholeToneScale]
