import {
    BOTH_STYLES,
    CHROMATIC_SCALE_MAJOR_SIXTH_APART_OCTAVES,
    CONTRARY_MOTION_OCTAVES,
    DIATONIC_MODE,
    DIATONIC_MODES,
    DIATONIC_OCTAVES,
    LEGATO_SCALES_OCTAVES,
    LEGATO_SCALES_THIRDS_TEMPO,
    NON_DIATONIC_MODE,
    NOTE,
    OCTAVES_SCALE_TEMPO,
    SIXTHS_APART_SCALE_TEMPO,
    STACCATO_SCALES_SIXTHS_OCTAVES,
    STACCATO_SCALES_SIXTHS_TEMPO,
    STANDARD_STARTING_NOTES,
    STYLE, WHOLE_TONE_SCALE_OCTAVES
} from "./consts";

class Scale {
    hands: string
    interval: string
    mode: DIATONIC_MODE | NON_DIATONIC_MODE
    octaves: number
    startingNote: NOTE | NOTE[]
    style: STYLE
    tempo: number
    type: string
    constructor(hands: string, interval: string, mode: DIATONIC_MODE | NON_DIATONIC_MODE, octaves: number, startingNote: NOTE |  NOTE[], style: STYLE, tempo: number, type: string) {
        this.hands = hands
        this.interval = interval
        this.mode = mode
        this.octaves = octaves
        this.startingNote = startingNote
        this.style = style
        this.tempo = tempo
        this.type = type
    }
}

const scalesOctaveApart = STANDARD_STARTING_NOTES.map((startingNote: NOTE) => {
    DIATONIC_MODES.map((mode: DIATONIC_MODE) => {
        BOTH_STYLES.map((style: STYLE) => {
            new Scale("Hands together", "Octaves", mode, DIATONIC_OCTAVES, startingNote, style, OCTAVES_SCALE_TEMPO, "Scale in octaves")
        })
    })
})

const scalesSixthApart = STANDARD_STARTING_NOTES.map((startingNote: NOTE) => {
    [DIATONIC_MODE.MAJOR, DIATONIC_MODE.MINOR_HARMONIC].map((mode: DIATONIC_MODE) => {
        BOTH_STYLES.map((style: STYLE) => {
            new Scale("Hands together", "Sixth apart", mode, DIATONIC_OCTAVES, startingNote, style, SIXTHS_APART_SCALE_TEMPO, "Scale a sixth apart")
        })
    })
})

const scalesContraryMotion = STANDARD_STARTING_NOTES.map((startingNote: NOTE) => {
    [DIATONIC_MODE.MAJOR, DIATONIC_MODE.MINOR_HARMONIC].map((mode: DIATONIC_MODE) => {
        BOTH_STYLES.map((style: STYLE) => {
            new Scale("Hands together", "Contrary motion", mode, CONTRARY_MOTION_OCTAVES, startingNote, style, OCTAVES_SCALE_TEMPO, "Scale in contrary motion")
        })
    })
})

const legatoScaleInThirds = [new Scale("Hands separately", "Thirds", DIATONIC_MODE.MAJOR, LEGATO_SCALES_OCTAVES, NOTE.E_FLAT, STYLE.LEGATO, LEGATO_SCALES_THIRDS_TEMPO, "Legato scale in thirds")]

const staccatoScaleInSixths = [new Scale("Hands separately", "Sixths", DIATONIC_MODE.MAJOR, STACCATO_SCALES_SIXTHS_OCTAVES, NOTE.C, STYLE.STACCATO, STACCATO_SCALES_SIXTHS_TEMPO, "Staccato scale in sixths")]

const chromaticScaleMajorSixthApart = BOTH_STYLES.map((style: STYLE) => {
    new Scale("Hands together", "Major sixth apart", NON_DIATONIC_MODE.CHROMATIC, CHROMATIC_SCALE_MAJOR_SIXTH_APART_OCTAVES, [NOTE.E_FLAT, NOTE.C], style, SIXTHS_APART_SCALE_TEMPO, "Chromatic scale a major sixth apart")
})

const wholeToneScales = [NOTE.C, NOTE.E_FLAT].map((note: NOTE) => {
    BOTH_STYLES.map((style: STYLE) => {
        new Scale("Hands together", "Octaves", NON_DIATONIC_MODE.WHOLE_TONE, WHOLE_TONE_SCALE_OCTAVES, note, style, OCTAVES_SCALE_TEMPO, "Whole tone scale")
    })
})

export const allScales = [scalesOctaveApart, scalesSixthApart, scalesContraryMotion, legatoScaleInThirds, staccatoScaleInSixths, chromaticScaleMajorSixthApart, wholeToneScales]
