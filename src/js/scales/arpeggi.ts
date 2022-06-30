import {
    IMAGE_DIR,
    NOTE,
    STANDARD_STARTING_NOTES,
    STYLE
} from "./consts";

export enum ARPEGGIO_MODE {
    MAJOR = "major",
    MINOR = "minor",
    DOMINANT_SEVENTH = "dominant seventh",
    DIMINISHED_SEVENTH = "diminished seventh"
}
const ARPEGGIO_MINIM_TEMPO = 66
const ARPEGGIO_OCTAVES = 4

export class Arpeggio {
    hands: string
    imagePath?: string
    interval: string
    inversion?: string
    key?: NOTE
    mode: ARPEGGIO_MODE
    octaves: number
    rootNote?: NOTE
    style: STYLE
    tempo: number
    type: string
    constructor(inversion: string, mode: ARPEGGIO_MODE, type: string, key?: NOTE, rootNote?: NOTE, imagePath?: string) {
        this.hands = "Hands together"
        this.imagePath = imagePath
        this.interval = "Octaves"
        this.inversion = inversion
        this.key = key
        this.mode = mode
        this.octaves = ARPEGGIO_OCTAVES
        this.rootNote = rootNote
        this.style = STYLE.LEGATO
        this.tempo = ARPEGGIO_MINIM_TEMPO
        this.type = type
    }
}

const arpeggi: Arpeggio[] = STANDARD_STARTING_NOTES.map((rootNote: NOTE) =>
    [ARPEGGIO_MODE.MAJOR, ARPEGGIO_MODE.MINOR].map((mode: ARPEGGIO_MODE) =>
        new Arpeggio("Second inversion", mode, "Arpeggio", rootNote)
    )
).flat()

const dominantSevenths = STANDARD_STARTING_NOTES.map((key: NOTE) => {
    let imagePath
    if (key === NOTE.F_SHARP) imagePath = `${IMAGE_DIR}/arpeggio-dom-7-key-f-sharp.png`
    return new Arpeggio("Root", ARPEGGIO_MODE.DOMINANT_SEVENTH, "Dominant seventh", key, undefined, imagePath)
})

const diminishedSevenths = [NOTE.C, NOTE.E_FLAT].map((rootNote: NOTE) => {
    const imagePath = `${IMAGE_DIR}/arpeggio-dim-7-starting-${rootNote === NOTE.C ? "c" : "e-flat"}.png`
    return new Arpeggio("Root", ARPEGGIO_MODE.DIMINISHED_SEVENTH, "Diminished seventh", undefined, rootNote, imagePath)
})

export const allArpeggi: Arpeggio[] = [arpeggi, dominantSevenths, diminishedSevenths].flat()
