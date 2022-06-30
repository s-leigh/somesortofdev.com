import {BOTH_STYLES, DIATONIC_MODE, IMAGE_DIR, NON_DIATONIC_MODE, NOTE, STANDARD_STARTING_NOTES, STYLE} from "./consts";

// Octaves
export const CHROMATIC_SCALE_MAJOR_SIXTH_APART_OCTAVES = 4
export const CONTRARY_MOTION_OCTAVES = 2
export const DIATONIC_OCTAVES = 4
export const LEGATO_SCALES_OCTAVES = 2
export const STACCATO_SCALES_SIXTHS_OCTAVES = 2
export const WHOLE_TONE_SCALE_OCTAVES = 4

// Tempi
export const OCTAVES_SCALE_MINIM_TEMPO = 88
export const SIXTHS_APART_SCALE_MINIM_TEMPO = 60
export const LEGATO_SCALES_THIRDS_MINIM_TEMPO = 52
export const STACCATO_SCALES_SIXTHS_MINIM_TEMPO = 54


export class Scale {
    hands: string
    interval: string
    mode: DIATONIC_MODE | NON_DIATONIC_MODE
    octaves: number
    startingNote: NOTE | NOTE[]
    style: STYLE
    tempo: number
    type: string
    imagePath?: string

    constructor(hands: string, interval: string, mode: DIATONIC_MODE | NON_DIATONIC_MODE, octaves: number, startingNote: NOTE | NOTE[], style: STYLE, tempo: number, type: string, imagePath?: string) {
        this.hands = hands
        this.interval = interval
        this.mode = mode
        this.octaves = octaves
        this.startingNote = startingNote
        this.style = style
        this.tempo = tempo
        this.type = type
        this.imagePath = imagePath
    }
}

const scalesOctaveApart: Scale[] = STANDARD_STARTING_NOTES.map((startingNote: NOTE) =>
    [DIATONIC_MODE.MAJOR, DIATONIC_MODE.MINOR_HARMONIC, DIATONIC_MODE.MINOR_MELODIC].map((mode: DIATONIC_MODE) => {
        let imagePath: string
        if (startingNote === NOTE.F_SHARP && mode == DIATONIC_MODE.MINOR_MELODIC) imagePath = `${IMAGE_DIR}/scale-f-sharp-minor-melodic.png`
        if (startingNote === NOTE.E_FLAT && mode === DIATONIC_MODE.MINOR_HARMONIC) imagePath = `${IMAGE_DIR}/scale-e-flat-minor-harmonic.png`
        return BOTH_STYLES.map((style: STYLE) =>
            new Scale("Hands together", "Octaves", mode, DIATONIC_OCTAVES, startingNote, style, OCTAVES_SCALE_MINIM_TEMPO, "Scale in octaves", imagePath)
        )
    })
).flat(2)

const scalesSixthApart: Scale[] = STANDARD_STARTING_NOTES.map((startingNote: NOTE) =>
    [DIATONIC_MODE.MAJOR, DIATONIC_MODE.MINOR_HARMONIC].map((mode: DIATONIC_MODE) => {
        let imagePath: string
        if (startingNote === NOTE.E_FLAT && mode === DIATONIC_MODE.MINOR_HARMONIC) imagePath = `${IMAGE_DIR}/scale-e-flat-minor-harmonic.png`
        return BOTH_STYLES.map((style: STYLE) =>
            new Scale("Hands together", "Sixth apart", mode, DIATONIC_OCTAVES, startingNote, style, SIXTHS_APART_SCALE_MINIM_TEMPO, "Scale a sixth apart", imagePath)
        )
    })
).flat(2)

const scalesContraryMotion: Scale[] = STANDARD_STARTING_NOTES.map((startingNote: NOTE) =>
    [DIATONIC_MODE.MAJOR, DIATONIC_MODE.MINOR_HARMONIC].map((mode: DIATONIC_MODE) => {
        let imagePath: string
        if (startingNote === NOTE.E_FLAT && mode === DIATONIC_MODE.MINOR_HARMONIC) imagePath = `${IMAGE_DIR}/scale-e-flat-minor-harmonic.png`
        return BOTH_STYLES.map((style: STYLE) =>
            new Scale("Hands together", "Contrary motion", mode, CONTRARY_MOTION_OCTAVES, startingNote, style, OCTAVES_SCALE_MINIM_TEMPO, "Scale in contrary motion", imagePath)
        )
    })
).flat(2)

const legatoScaleInThirds = [new Scale("Hands separately", "Thirds", DIATONIC_MODE.MAJOR, LEGATO_SCALES_OCTAVES, NOTE.E_FLAT, STYLE.LEGATO, LEGATO_SCALES_THIRDS_MINIM_TEMPO, "Legato scale in thirds", `${IMAGE_DIR}/legato-scale-thirds-e-flat.png`)]

const staccatoScaleInSixths = [new Scale("Hands separately", "Sixths", DIATONIC_MODE.MAJOR, STACCATO_SCALES_SIXTHS_OCTAVES, NOTE.C, STYLE.STACCATO, STACCATO_SCALES_SIXTHS_MINIM_TEMPO, "Staccato scale in sixths")]

const chromaticScaleMajorSixthApart: Scale[] = BOTH_STYLES.map((style: STYLE) =>
    new Scale("Hands together", "Major sixth apart", NON_DIATONIC_MODE.CHROMATIC, CHROMATIC_SCALE_MAJOR_SIXTH_APART_OCTAVES, [NOTE.E_FLAT, NOTE.C], style, SIXTHS_APART_SCALE_MINIM_TEMPO, "Chromatic scale a major sixth apart")
).flat()

const wholeToneScales: Scale[] = [NOTE.C, NOTE.E_FLAT].map((note: NOTE) =>
    BOTH_STYLES.map((style: STYLE) =>
        new Scale("Hands together", "Octaves", NON_DIATONIC_MODE.WHOLE_TONE, WHOLE_TONE_SCALE_OCTAVES, note, style, OCTAVES_SCALE_MINIM_TEMPO, "Whole tone scale")
    )
).flat()

export const allScales: Scale[] = [scalesOctaveApart, scalesSixthApart, scalesContraryMotion, legatoScaleInThirds, staccatoScaleInSixths, chromaticScaleMajorSixthApart, wholeToneScales].flat()
